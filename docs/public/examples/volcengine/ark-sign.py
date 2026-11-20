#!/usr/bin/env python3
"""Build a curl configuration; read credentials privately and pipe stdout to curl."""

import argparse
import datetime
import getpass
import hashlib
import hmac
import json
import re
import sys
from pathlib import Path
from urllib.parse import parse_qsl, quote, unquote, urlsplit


def build_config(url, method, body, access_key="", secret_key="", bearer="",
                 region="cn-beijing", service="ark", timestamp=None, extra_headers=()):
    parsed = urlsplit(url)
    if (parsed.scheme not in ("http", "https") or not parsed.hostname
            or parsed.username or parsed.password or parsed.fragment):
        raise ValueError("Use an absolute API URL without credentials or a fragment")
    if method not in ("GET", "POST") or (method == "GET" and body):
        raise ValueError("Use GET without a body or POST with a JSON body")
    if body:
        try:
            value = json.loads(body)
        except (ValueError, UnicodeError):
            raise ValueError("The request body must be a UTF-8 JSON object") from None
        if not isinstance(value, dict):
            raise ValueError("The request body must be a JSON object")
    headers = {"Accept": "application/json"}
    if body:
        headers["Content-Type"] = "application/json"
    if bearer:
        if any(character.isspace() for character in bearer):
            raise ValueError("The Model API Key must not contain whitespace")
        headers["Authorization"] = "Bearer " + bearer
    else:
        if (not access_key or not secret_key or "/" in access_key
                or any(character.isspace() for character in access_key)):
            raise ValueError("A valid AGIOne System API AK/SK pair is required")
        if not re.fullmatch(r"[a-z0-9-]{1,64}", region) or not re.fullmatch(r"[a-z0-9-]{1,64}", service):
            raise ValueError("Invalid signing region or service")
        if len(body.encode("utf-8")) > 1024 * 1024:
            raise ValueError("The asset request body exceeds 1 MiB")
        timestamp = timestamp or datetime.datetime.now(datetime.timezone.utc).strftime("%Y%m%dT%H%M%SZ")
        datetime.datetime.strptime(timestamp, "%Y%m%dT%H%M%SZ")
        payload_hash = hashlib.sha256(body.encode("utf-8")).hexdigest()
        host = re.sub(r":(?:80|443)$", "", parsed.netloc)
        signed = {"host": host, "x-content-sha256": payload_hash, "x-date": timestamp}
        if body:
            signed["content-type"] = "application/json"
        signed_names = ";".join(sorted(signed))
        canonical_headers = "".join(name + ":" + signed[name] + "\n" for name in sorted(signed))
        parameters = parse_qsl(parsed.query, keep_blank_values=True, encoding="utf-8", errors="strict")
        if len({name for name, _ in parameters}) != len(parameters):
            raise ValueError("Each query parameter must appear once")
        parameters.sort(key=lambda parameter: parameter[0].encode("utf-8"))
        canonical_query = "&".join(quote(name, safe="-_.~") + "=" + quote(value, safe="-_.~")
                                   for name, value in parameters)
        canonical_path = quote(unquote(parsed.path or "/", encoding="utf-8", errors="strict"), safe="/-_.~")
        canonical_request = "\n".join((method, canonical_path, canonical_query,
                                       canonical_headers, signed_names, payload_hash))
        scope = "/".join((timestamp[:8], region, service, "request"))
        string_to_sign = "\n".join(("HMAC-SHA256", timestamp, scope,
                                    hashlib.sha256(canonical_request.encode("utf-8")).hexdigest()))
        signing_key = secret_key.encode("utf-8")
        for component in scope.split("/"):
            signing_key = hmac.new(signing_key, component.encode("utf-8"), hashlib.sha256).digest()
        signature = hmac.new(signing_key, string_to_sign.encode("utf-8"), hashlib.sha256).hexdigest()
        headers.update({"Host": host, "X-Date": timestamp, "X-Content-Sha256": payload_hash,
                        "Authorization": "HMAC-SHA256 Credential=" + access_key + "/" + scope
                        + ", SignedHeaders=" + signed_names + ", Signature=" + signature})
    protected = {"authorization", "host", "content-type", "x-date", "x-content-sha256",
                 "content-length", "transfer-encoding"}
    for extra in extra_headers:
        name, separator, value = extra.partition(":")
        if (not separator or not re.fullmatch(r"[A-Za-z0-9-]+", name)
                or name.lower() in protected or "\r" in value or "\n" in value):
            raise ValueError("Invalid additional header")
        headers[name] = value.strip()
    settings = [("url", url), ("request", method), ("connect-timeout", "10"), ("max-time", "90")]
    settings.extend(("header", name + ": " + value) for name, value in headers.items())
    if body:
        settings.append(("data-binary", body))
    return "path-as-is\n" + "\n".join(name + " = " + json.dumps(value, ensure_ascii=False)
                                        for name, value in settings) + "\n"


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--url", required=True)
    parser.add_argument("--method", choices=("GET", "POST"), default="POST")
    parser.add_argument("--body-file", type=Path)
    parser.add_argument("--region", default="cn-beijing")
    parser.add_argument("--service", default="ark")
    parser.add_argument("--bearer", action="store_true", help="Use a Model API Key for video endpoints")
    parser.add_argument("--header", action="append", default=[], help="Deployment-specific header, when required")
    args = parser.parse_args()
    try:
        if not sys.stdin.isatty():
            raise ValueError("Run from an interactive terminal so credentials are read without echo")
        body = args.body_file.read_text(encoding="utf-8") if args.body_file else ""
        if args.bearer:
            key = getpass.getpass("AGIOne Model API Key: ")
            if not key:
                raise ValueError("A Model API Key is required")
            config = build_config(args.url, args.method, body, bearer=key, extra_headers=args.header)
        else:
            access_key = getpass.getpass("AGIOne System API Access Key: ")
            secret_key = getpass.getpass("AGIOne System API Secret Key: ")
            config = build_config(args.url, args.method, body, access_key, secret_key,
                                  region=args.region, service=args.service, extra_headers=args.header)
        sys.stdout.write(config)
    except (OSError, ValueError, EOFError):
        sys.exit("Request configuration failed; check the URL, JSON file, credentials and interactive terminal")


if __name__ == "__main__":
    main()
