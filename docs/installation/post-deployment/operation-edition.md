# AGIOne Operations Edition Post-Deployment Configuration

> Document purpose: A reusable go-live configuration template for every new AGIOne Operations Edition deployment.  
> Audience: Delivery personnel responsible for new-deployment initialization and go-live acceptance; platform operations, finance, legal, and customer success owners provide and confirm business parameters.  
> Usage principle: Delivery personnel collect and fill all items that require confirmation first, then execute each check with the business account specified by that item. Amounts, ratios, and quotas must not be accepted from page defaults unless confirmed by the responsible business owner.  
> Updated: 2026-07-30.

## 1. Replace Platform Addresses Before Use

This document uses the following variables:

- `{{PLATFORM_BASE_URL}}`: Browser access address of the platform. Do not add a trailing `/`.
- `{{PUBLIC_API_BASE_URL}}`: Complete root address for external systems to access platform APIs. It must include the actual gateway prefix. Do not add a trailing `/`.
- `{{PLATFORM_TENANT_ID}}`: Tenant ID of the current platform, used to build the Stripe Webhook URL.

Example:

```text
{{PLATFORM_BASE_URL}} = https://console.example.com
{{PUBLIC_API_BASE_URL}} = https://api.example.com/hyperone
{{PLATFORM_TENANT_ID}} = 1000000000000000000
```

After replacement, the direct links in this document can be used for navigation. Each deployment provides three fixed business identities: `admin`, `operator`, and `provider`. The End User acceptance account may need to be registered, or it may be created after `operator` creates a Tenant. Initial platform configuration uses `admin`; Model Services baseline-data checks use `operator`; later business acceptance uses the identity specified by each checklist item. This template does not record account passwords. Login credentials must be delivered through a controlled channel.

For each deployment, verify every direct link with the account specified for that entry. If a direct link fails, enter the page through the menu path and check the License, menu data, role permissions, and deployment routing. Links that have not been verified in a real deployment must not be marked as accepted.

General settings, provider relationship, currency settings, payment channels, account and settlement, email settings, and UI settings share the same Platform Settings page. URL parameters can open a specific tab directly. Payment channels can also open Stripe or Alipay directly. Each deployment must still use the `admin` account to verify that these links match the current permissions, License, and routing.

## 2. Deployment Information

| Item | Value for This Deployment |
| --- | --- |
| Platform name | `To be filled` |
| Platform access address | `{{PLATFORM_BASE_URL}}` |
| External API root address | `{{PUBLIC_API_BASE_URL}}` |
| Platform Tenant ID | `To be filled; used for Stripe Webhook` |
| Platform administrator username | `admin` |
| Environment | `Production / Acceptance / Other: to be filled` |
| Deployment version | `To be filled` |
| Delivery purpose | `External operations; this is a delivery-purpose category and does not mean the system has automatically isolated capabilities by License` |
| Planned opening time | `To be filled` |
| Business owner | `To be filled` |
| Configuration executor | `To be filled` |
| Delivery or technical support owner | `To be filled` |
| Finance approver | `To be filled` |
| Legal approver | `To be filled` |

### 2.1 Configuration Scope Quick Check

| Configuration Item | Requirement for This Edition |
| --- | --- |
| License, delivery purpose, brand, agreements, currency, and credits exchange ratio | Required and must pass acceptance |
| Provider mode and default Provider | Must be confirmed by product, delivery, and finance owners |
| SMTP | Required when email registration, email verification-code login, or account recovery is opened |
| Stripe, Alipay | Configure only when contracted and planned for this deployment |
| Model Services baseline data | Check model authors, meta models, model sources, and model tags for every deployment; check model templates according to delivery scope |
| Login URL | Optional. When configured, it is used in top-up arrival emails and written to Stripe metadata and description. Empty value does not block payment |
| Stripe top-up arrival email | Decided by business owners. Disabled by default for new deployments. Current Alipay top-up does not trigger this email |
| Google Login, Google Analytics ID | Disabled or empty by default; enable only after approval |

## 3. Common Entry Points

| Page | Menu Path | Direct Link | Purpose |
| --- | --- | --- | --- |
| Login | No login required | [Open Login]({{PLATFORM_BASE_URL}}/user/login) | Login and login acceptance |
| Register | Enter from the login page, or open directly | [Open Register]({{PLATFORM_BASE_URL}}/user/register) | Public email registration acceptance |
| License Management | User Center > License Management | [Open License Management]({{PLATFORM_BASE_URL}}/user/usercenter/license/managed-objects) | Import, activate, and check License |
| Platform Settings | System Configuration > Platform Settings | [Open Platform Settings]({{PLATFORM_BASE_URL}}/user/system/platform-settings/config) | Brand, currency, payment, account, email, and related settings |
| Login Configuration | System Configuration > Login Configuration | [Open Login Configuration]({{PLATFORM_BASE_URL}}/user/system/login-properties) | Registration role, verification code, and login security |
| System Agreement Management | Operations Console > System Management > System Agreement Management | [Open System Agreement Management]({{PLATFORM_BASE_URL}}/deck/op/system/agreement) | Privacy policy and terms of service |
| Tenant Management | System Configuration > Tenant Management | [Open Tenant Management]({{PLATFORM_BASE_URL}}/user/tenant) | Check newly registered customers and administrators |
| Team Members | User Space > Team Members | [Open Team Members]({{PLATFORM_BASE_URL}}/user/user-space/team-members) | Check Operator team members |
| Role Management | User Space > Role Management | [Open Role Management]({{PLATFORM_BASE_URL}}/user/user-space/roles) | Check configuration executor permissions |
| Meta Models (including model authors) | Model Services > Settings > Meta Models | [Open Meta Models]({{PLATFORM_BASE_URL}}/modelone/settings/meta) | Use `operator` to check model authors and meta models |
| Model Sources | Model Services > Settings > Model Sources | [Open Model Sources]({{PLATFORM_BASE_URL}}/modelone/settings/vendor) | Use `operator` to check sources, regions, and addresses |
| Model Tags | Model Services > Settings > Tags | [Open Tags]({{PLATFORM_BASE_URL}}/modelone/settings/tags) | Use `operator` to check tags of the `Model` type |
| Model Templates | Model Services > Settings > Templates | [Open Templates]({{PLATFORM_BASE_URL}}/modelone/settings/provider-template) | Use `operator` to check according to delivery scope |

Direct links for Platform Settings tabs:

| Tab | Direct Link |
| --- | --- |
| General | [Open General]({{PLATFORM_BASE_URL}}/user/system/platform-settings/config?tab=general) |
| Provider Relationship | [Open Provider Relationship]({{PLATFORM_BASE_URL}}/user/system/platform-settings/config?tab=provider) |
| Currency Settings | [Open Currency Settings]({{PLATFORM_BASE_URL}}/user/system/platform-settings/config?tab=currency) |
| Account and Settlement | [Open Account and Settlement]({{PLATFORM_BASE_URL}}/user/system/platform-settings/config?tab=account) |
| Email Settings | [Open Email Settings]({{PLATFORM_BASE_URL}}/user/system/platform-settings/config?tab=email) |
| UI Settings | [Open UI Settings]({{PLATFORM_BASE_URL}}/user/system/platform-settings/config?tab=ui) |
| Stripe | [Open Stripe]({{PLATFORM_BASE_URL}}/user/system/platform-settings/config?tab=channels&channel=STRIPE) |
| Alipay | [Open Alipay]({{PLATFORM_BASE_URL}}/user/system/platform-settings/config?tab=channels&channel=ALIPAY) |

Use `admin` for Platform Settings entries and `operator` for Model Services baseline-data entries. If the corresponding account still sees 403, a blank page, or a missing menu when opening a direct link, recheck through the menu path and verify the current License, menu data, role permissions, and deployment routing. Do not bypass the problem by adding frontend allowlists or relaxing permissions.

## 4. Materials Required Before Go-Live

### 4.1 Brand and Contact Information

| Item | Owner-Provided Value | Acceptance Owner |
| --- | --- | --- |
| Product name | `To be filled` | `To be filled` |
| Customer support email | `To be filled` | `To be filled` |
| Logo image file | `File to be provided` | `To be filled` |
| Favicon image file | `File to be provided` | `To be filled` |
| System default language | `Follow system / Chinese / English: to be confirmed` | `To be filled` |
| User documentation URL | `To be filled; confirm hidden documentation entry if not provided` | `To be filled` |
| Operations documentation URL | `To be filled; confirm hidden documentation entry if not provided` | `To be filled` |
| Default view mode | `Table / Card: to be confirmed` | `To be filled` |
| Login timeout | `Confirmed by security owner; keep delivery value if not confirmed` | `To be filled` |
| Google Analytics ID | `Empty by default; privacy or compliance approval is required before enabling` | `To be filled` |

### 4.2 Business and Finance Parameters

The following values must be provided by business or finance owners. Existing page values do not count as confirmation.

| Item | Owner-Provided Value | Reasonableness Check |
| --- | --- | --- |
| Currency code | `To be filled, such as an ISO 4217 code` | Consistent with settlement currency of payment channels |
| Currency name | `To be filled` | Consistent with currency code |
| Currency symbol | `To be filled` | Not confused with other currencies |
| Credits exchanged for 1 currency unit | `To be filled` | Supports pricing, top-up, and bill display |
| Enable registration bonus for new customers | `Yes / No: to be filled` | Consistent with acquisition policy |
| Registration bonus credits | `To be filled` | Fill only when bonus is enabled |
| Enable Stripe | `Yes / No: to be filled` | Contracted and compliance-confirmed |
| Stripe single-payment minimum and maximum amounts | `To be filled` | Minimum is less than maximum and complies with channel limits |
| Stripe service-fee rate and minimum service fee | `To be filled` | Finance confirms the customer payment-calculation basis |
| Stripe top-up tax code | `To be filled` | Confirmed by tax owner |
| Enable Alipay | `Yes / No: to be filled` | Contracted and compliance-confirmed |
| Alipay single-payment minimum and maximum amounts | `To be filled` | Minimum is less than maximum and complies with channel limits |
| Payment timeout and delayed-success handling parameters | `Confirmed jointly by delivery and finance` | Not trial-filled by operations personnel |

### 4.3 Email and Login URL Information

This document uses SMTP only. It does not configure other email service providers.

| Item | Provided Value |
| --- | --- |
| SMTP host | `To be filled` |
| SMTP port | `Fill according to the enterprise SMTP service, commonly 465; implicit SSL/TLS must be supported` |
| SMTP username | `To be filled` |
| SMTP password or authorization code | `Provided by credential custodian; do not write it in this document` |
| Sender email | `To be filled` |
| SPF, DKIM, and DMARC status of the sender domain | `Confirmed by email administrator` |
| SMTP credential custody location | `To be filled; record custody location only, not plaintext` |
| Test recipient emails | `Prepare at least two addresses from different email services` |
| Platform login URL | `Recommended: {{PLATFORM_BASE_URL}}/user/login`; empty value does not block payment. When configured, it is used in emails and written to Stripe metadata and description |

The current version does not support `587 STARTTLS`. If the customer's email service provides only `587 STARTTLS`, it cannot be connected in this release. Stop email acceptance and report it to R&D for later support evaluation.

New deployments cannot send email by default: SMTP host, username, password, and sender email do not contain real built-in values; top-up arrival email is disabled by default; CC recipients and login URL are empty by default; if no password configuration record exists, the page shows `Not configured`. Do not rely on any historical values in the delivery package, configuration center, or page. If historical credentials are found, treat them as exposed and have the credential owner rotate or revoke them immediately.

### 4.4 Agreements and Payment Channel Materials

- Official privacy policy text, version, effective time, and legal owner.
- Official terms of service text, version, effective time, and legal owner.
- Stripe Publishable Key, Secret Key, Webhook signing secret, API Version, top-up tax code, and callback endpoint information.
- Stripe Webhook endpoint, signing secret, and platform Tenant ID for both test and production environments. The complete callback URL is:  
  `{{PUBLIC_API_BASE_URL}}/payment/callback/stripe/webhook/{{PLATFORM_TENANT_ID}}`
- Alipay APPID, application private key, Alipay public key, gateway URL, asynchronous notification URL, and synchronous redirect URL.
- All keys must be retrieved only from a controlled credential system. Do not paste them into chats, emails, or this document.

## 5. Recommended Configuration Order

1. Activate and check the License. Confirm that this delivery purpose is external operations.
2. Use the platform administrator `admin` to check configuration permissions and all direct links owned by `admin`.
3. Use the fixed `operator` account to complete the Model Services baseline-data precheck.
4. Publish the privacy policy and terms of service.
5. Configure product name, support email, Logo, Favicon, and default language.
6. Configure and verify SMTP. If top-up arrival email is enabled, or if Stripe payment information should carry a login entry, configure the correct platform login URL.
7. Configure registration entry, default role, and login security parameters. Keep Google Login explicitly disabled if not used.
8. Configure currency, credits exchange ratio, and registration bonus.
9. Have delivery personnel confirm provider relationship.
10. Configure Stripe and Alipay, run `Check Configuration` for each, then complete sandbox or test-mode regression and real small-amount top-up acceptance.
11. Complete go-live acceptance.

Currency and credits exchange relationship affect payment amount, balance display, and internal accounting. They must be finalized before payment-channel acceptance.

## 6. Step-by-Step Configuration

### 6.1 License and Delivery Purpose

Entry: [Open License Management]({{PLATFORM_BASE_URL}}/user/usercenter/license/managed-objects)

Steps:

1. Log in as platform administrator `admin`.
2. Import and activate the valid License agreed for this deployment contract.
3. Check that authorized object, validity period, status, and deployment environment are consistent.
4. Confirm the delivery purpose as `external operations`, and check payment, external account opening, settlement, and other capability boundaries item by item.
5. Keep at least two available License Management accounts to avoid dependency on a single account.

Acceptance: The License page has no expiry or unavailable warning; ordinary business accounts can log in normally; both License administrators confirm that their accounts are available.

Current-version note: The `enterprise/operator` version field and backend capability isolation are not fully implemented. `Operations Edition` is a delivery-purpose category in this template, not a License configuration item on the current page. Capabilities also cannot be judged only by whether a menu is visible. Delivery personnel must configure and accept each item in this checklist.

### 6.2 Operator Administrators and Permissions

Entry: [Open Team Members]({{PLATFORM_BASE_URL}}/user/user-space/team-members); [Open Role Management]({{PLATFORM_BASE_URL}}/user/user-space/roles)

Steps:

1. Confirm first that the platform administrator username is `admin` and can log in. Then confirm that backup administrators, finance acceptance users, and configuration executors are available.
2. Give configuration executors only the view and save permissions required for this work.
3. Assign separate custodians for payment keys, SMTP keys, and License. Do not store them under a shared personal account.
4. Do not grant ordinary operations personnel access to variable push, database, or other R&D configuration entries.
5. This template does not record `admin` or other account passwords. Initial passwords must be delivered through a controlled channel and changed according to the security policy.

Acceptance: Configuration executors can open the required pages and save changes; unrelated pages and sensitive operations remain unavailable; the backup administrator completes one login.

### 6.3 Privacy Policy and Terms of Service

Entry: [Open System Agreement Management]({{PLATFORM_BASE_URL}}/deck/op/system/agreement)

Steps:

1. Create or update the privacy policy and terms of service separately.
2. Fill the official version, effective time, and scope, then publish after legal review.
3. Confirm that old-version status matches business requirements. Do not keep conflicting current versions active at the same time.
4. Open agreement links on the registration page and check title, body, version, and navigation.

Acceptance: Unauthenticated users can read the current effective agreements from the registration page; registration can continue only after users agree; links do not return 404 or blank content.

### 6.4 Product Name, Support Email, Logo, Favicon, and Default Language

Entry: [Open General]({{PLATFORM_BASE_URL}}/user/system/platform-settings/config?tab=general); [Open UI Settings]({{PLATFORM_BASE_URL}}/user/system/platform-settings/config?tab=ui)

In `General`:

1. Fill the confirmed product name.
2. Fill the customer support email. This address appears in email content and must be continuously monitored.
3. Save and refresh the page to confirm the values remain correct.

In `UI Settings`:

1. Upload Logo and Favicon with the file upload control. Do not manually fill server file paths.
2. Select the system default language.
3. Configure user documentation, operations documentation, and best-practice entries according to confirmed materials. If no valid document exists, enable `Hide Documentation` and leave related URLs empty.
4. Select default view mode, table or card. This affects only default list display.
5. Use the login timeout approved by the security owner. If not approved, keep the delivery default.
6. Keep Google Analytics ID empty by default. Enable it only after privacy or compliance approval.
7. Configure top-up route only after payment entries are formally enabled, and verify that it does not point to the wrong environment or unauthorized page.
8. `Custom backend API address`, `Check frontend update version`, API prefix, and file prefix are delivery-level settings. Do not modify them without a delivery change request.

Acceptance: After logging out and reopening the platform, the login page, navigation bar, browser tab icon, default language, product name in emails, and support email are correct. Images are not stretched, broken, or invisible because of transparent backgrounds.

### 6.5 SMTP and Login URL

Entry: [Open Email Settings]({{PLATFORM_BASE_URL}}/user/system/platform-settings/config?tab=email), then expand `SMTP Service Configuration`. The current page exposes SMTP only.

Steps:

1. Fill the SMTP host, username, password or authorization code, and sender email owned by the customer or operator. Fill the port according to the enterprise SMTP service. `465` is common.
2. The port must support implicit SSL/TLS (TLS 1.2). `587 STARTTLS` is not supported; do not trial-fill 587 settings.
3. Save and reopen the page. Confirm that SMTP status and password both show `Configured`. If no password configuration record exists, the page must show `Not configured`.
4. Leaving the password field empty when a password has already been saved means keeping the existing password. Select `Clear saved password` only when the old credential is explicitly revoked.
5. `Login URL` is optional. The recommended value is the current platform login page: `{{PLATFORM_BASE_URL}}/user/login`. When configured, it is used in top-up arrival emails and written to Stripe PaymentIntent metadata and description. When empty, it is omitted and does not block save, Stripe enabling, or payment. If it points to a wrong environment or is not a complete HTTP/HTTPS URL, `Check Configuration` only reminds you to correct it and still continues Stripe official connectivity checks.
6. Top-up arrival email is disabled by default, and internal CC recipients are empty by default. Enable it and fill CC recipients who are authorized to receive customer top-up information only when required by the business owner.

The current page has no independent SMTP connection-test button. Verification must use real business emails:

1. Send a registration verification code from the registration page to a test mailbox and confirm receipt.
2. Complete one test registration.
3. Verify email verification-code login from the login page.
4. Verify account recovery email and recovery flow.
5. Check sender, subject, product name, verification code, support email, delivery time, and spam classification.

Acceptance gate: Public email registration can be opened only after all real receipt tests pass. Seeing `Configured` alone does not mean SMTP works.

Security gate: If the deployment package, configuration center, or historical page ever exposed SMTP credentials provided by the organization, do not continue using them. The credential owner must rotate or revoke them before acceptance.

### 6.6 Public Email Registration and Login Security

Entry: [Open Login Configuration]({{PLATFORM_BASE_URL}}/user/system/login-properties)

In `Registration Configuration`:

1. Check the default role for the `Email Registration` entry. The role must come from the DEFAULT application and match ordinary customer permissions.
2. Do not set Operator, platform administrator, finance administrator, or any other high-privilege role as the default role for email registration.
3. External system access, platform source directory, and third-party points recharge are not required for public email registration. Keep them disabled unless there is a clear integration project.

In `Google Login`:

1. Google Login is disabled by default for new deployments. If it is not used, confirm the status is `Not enabled` and Client ID is empty.
2. If it must be enabled, fill the customer's own Google OAuth configuration and complete a real Google login test.
3. A Google user creates an independent Tenant at first login and does not automatically join an existing enterprise Tenant. Delivery and business owners must confirm this organization behavior.

In `Login Security`, `Registration Verification Code`, and `Account Recovery`:

1. Set verification-code validity period, maximum error count, sending rate limit, and password-failure lockout according to values provided by the security owner.
2. Do not use `0` as a rate-limit value unless the security owner explicitly requires disabling that dimension.
3. Save each group and refresh to recheck. Avoid modifying values without saving them.

Important behavior:

- Email registration accepts any valid and unused email address. There is currently no enterprise domain allowlist.
- Each email registrant creates an independent Tenant and does not automatically join an existing Tenant.
- There is currently no verified master switch to close all public registration. To urgently stop registration, stop publishing the registration link immediately and contact delivery personnel to handle it through gateway, network access, or version capability. Do not casually delete the default role as a substitute for service stop.

Acceptance: Use a brand-new email address to complete verification-code sending, registration, first login, logout, and login again; confirm the new Tenant and its administrator in Tenant Management; repeated-email registration should be rejected.

### 6.7 Currency, Credits Exchange Ratio, and Registration Bonus

Entry: [Open Currency Settings]({{PLATFORM_BASE_URL}}/user/system/platform-settings/config?tab=currency); [Open Account and Settlement]({{PLATFORM_BASE_URL}}/user/system/platform-settings/config?tab=account)

Configure currency code, name, and symbol in `Currency Settings`; configure the default credits exchange ratio, new-customer registration bonus switch, and bonus amount in `Account and Settlement`.

Requirements:

1. Use only the values approved in section 4.2. Do not treat code values or page defaults as recommended values.
2. Currency code, name, and symbol must be mutually consistent and consistent with the actual settlement currency of Stripe and Alipay.
3. If registration bonus is enabled, the bonus amount must be confirmed jointly by business and finance. This change affects only future new customers.
4. After top-ups, bills, or consumption records have been generated, operations personnel must not modify currency or exchange ratio alone.
5. Configurations marked `Beta` on the page are not included in this go-live configuration. Do not modify them without a dedicated plan.

Acceptance: Register a new test customer and check currency display, credits balance, bonus record, and finance transaction record. When bonus is disabled, the new customer must not receive a bonus.

### 6.8 Provider Relationship

Entry: [Open Provider Relationship]({{PLATFORM_BASE_URL}}/user/system/platform-settings/config?tab=provider)

Single Provider, multiple Providers, and Operator-only binding represent different customer ownership and settlement relationships. They are not ordinary operations preferences. Product, delivery, and finance must jointly determine the mode and default Provider for this deployment.

The system marks `Single Provider` as `Recommended`. This applies to common deployments where all customers belong to one fixed Provider. `Beta` indicates feature maturity and is different from `Recommended`. If a customer scenario clearly requires multiple Providers or Operator-only binding, follow the approved delivery solution.

`Backfill Binding` processes historical customer relationships. Do not click it unless impact scope, backup, and change approval have been confirmed.

Acceptance: Use a new test customer to confirm that its Operator/Provider relationship matches the deployment solution. If Provider is not enabled in this deployment, confirm that no mistaken binding exists.

General rules for payment environments:

- The Platform Settings page has no independent `test environment / production environment` switch.
- Stripe environment is determined by Publishable Key, Secret Key, and Webhook signing secret. Alipay environment is determined by APPID, keys, and gateway URL.
- Test and production credentials, Webhooks, APPIDs, keys, and callback configurations must not be mixed.
- After switching from test configuration to production configuration, save again, run `Check Configuration`, check the production callback URL, and complete a real small-amount top-up approved by finance.

### 6.9 Stripe

Entry: [Open Stripe]({{PLATFORM_BASE_URL}}/user/system/platform-settings/config?tab=channels&channel=STRIPE)

Configure Stripe only when this deployment has contracted Stripe:

1. Decide whether to configure `Login URL` in Email Settings according to business needs. The recommended value is `{{PLATFORM_BASE_URL}}/user/login`; when configured, it enters Stripe PaymentIntent metadata and description. When empty, it is omitted and does not block payment.
2. Confirm that `{{PUBLIC_API_BASE_URL}}` includes the actual API gateway prefix and obtain the current platform Tenant ID.
3. Create a Webhook in the Stripe test environment:  
   `{{PUBLIC_API_BASE_URL}}/payment/callback/stripe/webhook/{{PLATFORM_TENANT_ID}}`
4. Confirm that the Webhook uses a publicly reachable HTTPS address. Create separate endpoints for test and production; signing secrets must not be mixed.
5. Fill Publishable Key, Secret Key, Webhook signing secret for the corresponding environment, API Version, and top-up tax code.
6. Fill the service-fee rate, minimum service fee, and single-payment minimum and maximum amounts approved by finance.
7. Save configuration and run `Check Configuration`. This button first checks required credentials, test/production environment, timeout, fee rate, amount range, and optional login URL, then calls the official Stripe read-only API. It does not save configuration, create orders, or charge payments, and it does not mean the Webhook is available. Empty or abnormal login URL only shows a reminder and does not block official connectivity checks.
8. Complete callback, tax, success, failure, and cancellation flow verification in Stripe test mode, and check callback logs.
9. After creating an independent production Webhook, complete one real small-amount top-up approved by finance. Check customer payment amount, payment status, received credits, account transaction records, and Webhook. If top-up arrival email is enabled, also check recipient, content, and sending count.
10. If Login URL is configured, check in Stripe that the PaymentIntent description and metadata contain the correct address. If it is not configured, confirm that the related metadata is omitted. Enable Stripe only after all required items pass.

If Stripe is not contracted or acceptance is incomplete, keep it disabled. Do not use production keys for repeated trial and error.

### 6.10 Alipay

Entry: [Open Alipay]({{PLATFORM_BASE_URL}}/user/system/platform-settings/config?tab=channels&channel=ALIPAY)

Configure Alipay only when this deployment has contracted Alipay:

1. Fill APPID, application private key, Alipay public key, gateway URL, asynchronous notification URL, synchronous redirect URL, and payment timeout.
2. The asynchronous notification URL must be confirmed by delivery personnel as publicly reachable. The synchronous redirect is only for page display and cannot be used as the arrival basis.
3. Fill the single-payment minimum and maximum amounts approved by finance.
4. Save and run `Check Configuration`. This button first checks required credentials, gateway environment, callback URL, payment timeout, and amount range, then initiates a no-charge query through the official Alipay OpenAPI/SDK. It does not create orders, does not charge payments, and does not replace callback acceptance.
5. Complete the full payment flow in the Alipay sandbox first, then complete one real small-amount top-up approved by finance under production configuration.
6. Check signature, asynchronous notification, payment status, received credits, and account transaction records. Current Alipay top-up does not enter the AGIOne top-up arrival email flow, so receiving a top-up arrival email must not be used as an Alipay enablement condition. Enable Alipay only after all required items pass.

If Alipay is not contracted or acceptance is incomplete, keep it disabled. This document does not configure other payment channels.

### 6.11 Model Services Baseline-Data Precheck

Check account: use the fixed `operator` account provided for each deployment. During checks, view only. Do not add, edit, enable, disable, or delete data. Click `Reset` or clear search conditions on each page first.

| Check Object | Deployment Requirement | Quick Check |
| --- | --- | --- |
| Meta Models (including model authors) | Preset data is required for every deployment | [Open Meta Models]({{PLATFORM_BASE_URL}}/modelone/settings/meta), or enter through `Model Services > Settings > Meta Models`. Confirm that both the model-author list on the left and meta models on the right have data; switch authors, run one search or filter, open one detail page, and confirm author, model type, scenario, and major capabilities display correctly. |
| Model Sources | Preset data is required for every deployment | [Open Model Sources]({{PLATFORM_BASE_URL}}/modelone/settings/vendor), or enter through `Model Services > Settings > Model Sources`. Run one search and open one detail page. Confirm that model-source identifier, region, Base URL, and documentation URL ownership are reasonable. Request-header authentication values may show only placeholders such as `<key>` or non-sensitive constants. Real API Keys, Tokens, or passwords must not be displayed. |
| Model Tags | Preset data is required for every deployment | [Open Tags]({{PLATFORM_BASE_URL}}/modelone/settings/tags), or enter through `Model Services > Settings > Tags`. Select the `Model` type and confirm tree tags have data; run one name search, status filter, and reset; confirm parent-child hierarchy is reasonable and meta-model scenario shows category names rather than internal IDs. |
| Model Templates | Check according to delivery scope | [Open Templates]({{PLATFORM_BASE_URL}}/modelone/settings/provider-template), or enter through `Model Services > Settings > Templates`. Select the model source that should have templates for this deployment, then confirm template cards, filters, and details work normally, and Provider, region, and meta-model associations are correct. If this deployment explicitly does not preconfigure templates, record `Not applicable` and do not temporarily create templates just to complete the check. |

The following situations block go-live: model authors, meta models, model sources, or model tags have no data at all; the page keeps reporting errors; lists or details cannot be opened; search, filter, or reset is clearly invalid; authors, tags, regions, model sources, or templates are obviously misbound; the page displays a real API Key, Token, or password. Individual optional descriptions, multilingual content, icons, or documentation URL issues should be recorded and submitted to the owner for judgment, not used directly to fail the whole deployment.

This section does not fill or verify real API Keys and does not initiate real model requests. Passing this section means only that baseline data exists, pages are usable, and major relationships show no obvious errors. It does not replace acceptance for model publishing, real invocation, Quota, credits, call records, or billing chain.

## 7. Go-Live Acceptance Checklist

### 7.1 Basics and Permissions

- [ ] License is valid, and delivery personnel confirm this deployment is Operations Edition.
- [ ] Two primary and backup License Management users can log in.
- [ ] Configuration executor permissions follow the least-privilege principle.
- [ ] Product name, support email, Logo, Favicon, and default language are correct.
- [ ] Privacy policy and terms of service are published, and registration-page links are correct.

### 7.2 Email, Registration, and Login

- [ ] Real registration verification-code receipt is completed with at least two different email services.
- [ ] A brand-new email can complete registration, and each registration creates an independent Tenant.
- [ ] Email verification-code login succeeds.
- [ ] Password login, failed-attempt lockout, and post-unlock behavior match the security plan.
- [ ] Account recovery email and password reset succeed.
- [ ] SMTP sender, support email, product name, and spam classification are acceptable.
- [ ] If `Login URL` is configured, it is a complete HTTP/HTTPS login page for the current environment. If it is empty, absence of a login entry in emails or Stripe metadata has been confirmed as acceptable.
- [ ] Google Login remains disabled, or real login has been completed with the customer's own OAuth configuration and independent-Tenant behavior has been confirmed.

### 7.3 Currency, Credits, and Payment

- [ ] Currency code, name, symbol, and payment-channel currency are consistent.
- [ ] Credits exchange ratio matches the approved value.
- [ ] Registration bonus switch and bonus amount match the campaign plan.
- [ ] Stripe is disabled, or `Check Configuration`, test-mode regression, and real small-amount top-up have been completed.
- [ ] When Stripe is enabled, test and production Webhook URLs, platform Tenant ID, and signing secrets have been checked separately.
- [ ] When Stripe is enabled and Login URL is configured, the login domain or address carried in Stripe matches the current platform. If not configured, related metadata is omitted.
- [ ] Alipay is disabled, or `Check Configuration`, sandbox regression, and real small-amount top-up have been completed.
- [ ] Minimum and maximum amounts for each enabled channel have been verified.
- [ ] Successful payment arrives only once, and balance, transaction records, and order are consistent. If Stripe top-up arrival email is enabled, email content and sending count are also consistent.
- [ ] Failed, canceled, or timed-out payment does not incorrectly increase balance.

### 7.4 Provider Relationship

- [ ] Provider mode matches the solution approved by product, delivery, and finance.
- [ ] If a default Provider is required, the correct Provider is configured. If Provider is not enabled, the default Provider is empty.
- [ ] A new test customer has been used to check the Operator/Provider relationship.
- [ ] `Backfill Binding` has not been executed without impact confirmation, backup, and approval.

### 7.5 Model Services Baseline Data

- [ ] Read-only checks have been completed with the fixed `operator` account.
- [ ] Model authors, meta models, model sources, and model tags all have preset data, and page, search, detail, and major associations work normally.
- [ ] Model templates have passed checks according to delivery scope, or have been explicitly recorded as `Not applicable`.
- [ ] Model-source request headers do not display real API Keys, Tokens, or passwords.
- [ ] Model Services publishing, invocation, metering, billing, and other end-to-end acceptance have been completed separately according to delivery scope, or are explicitly recorded as out of scope.

Formal external operations can be opened only after all required items pass and every enabled payment channel completes a real small-amount top-up.

## 8. Items That Require Approval Before Modification

- API prefix, file prefix, custom backend API address, and other delivery-level runtime parameters.
- Configurations marked `Beta` on the page.
- Currency, credits exchange ratio, and accounting basis after real transactions have occurred.
- Unapproved Provider mode, default Provider, and historical-customer `Backfill Binding`.
- Verification-code, rate-limit, and lockout policies not confirmed by the security owner.
- Payment callback URL, API version, and timeout-recovery parameters not confirmed by delivery personnel.
- Any email service provider or payment channel outside the scope of this document.
