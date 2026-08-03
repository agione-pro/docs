# AGIOne Enterprise Internal Edition Post-Deployment Configuration

> Document purpose: A reusable go-live configuration template for every new AGIOne Enterprise Internal Edition deployment.  
> Audience: Delivery personnel responsible for new-deployment initialization and go-live acceptance; enterprise administrators, internal operations, information security, and finance owners provide and confirm business parameters.  
> Usage principle: Enterprise Internal Edition is used by the organization or group to consume AI capabilities internally. It does not charge external users, and it does not enable online user top-up or external Provider settlement.  
> Updated: 2026-07-30.

## 1. Replace Platform Address Before Use

This document uses `{{PLATFORM_BASE_URL}}` for the access address of the current deployment. Before using this template, replace it with the actual address. Do not add a trailing `/`.

Example:

```text
{{PLATFORM_BASE_URL}} = https://ai.example.com
```

After replacement, the direct links in this document can be used for navigation. Each deployment provides three fixed business identities: `admin`, `operator`, and `provider`. The End User acceptance account may need to be registered, or it may be created after `operator` creates a Tenant. Initial platform configuration uses `admin`; Model Services baseline-data checks use `operator`; later business acceptance uses the identity specified by each checklist item. This template does not record account passwords. Login credentials must be delivered through a controlled channel.

For each deployment, verify every direct link with the account specified for that entry. If a direct link fails, enter the page through the menu path and check the License, menu data, role permissions, and deployment routing. Links that have not been verified in a real deployment must not be marked as accepted.

General settings, provider relationship, currency settings, payment channels, account and settlement, email settings, and UI settings share the same Platform Settings page. URL parameters can open a specific tab directly. Payment channels can also open Stripe or Alipay directly. Each deployment must still use the `admin` account to verify that these links match the current permissions, License, and routing.

## 2. Deployment Information

| Item | Value for This Deployment |
| --- | --- |
| Enterprise or platform name | `To be filled` |
| Platform access address | `{{PLATFORM_BASE_URL}}` |
| Platform administrator username | `admin` |
| Environment | `Production / Acceptance / Other: to be filled` |
| Deployment version | `To be filled` |
| Delivery purpose | `Enterprise internal use; this is a delivery-purpose category and does not mean the system has automatically isolated capabilities by License` |
| Planned opening time | `To be filled` |
| Enterprise owner | `To be filled` |
| Configuration executor | `To be filled` |
| Delivery or technical support owner | `To be filled` |
| Information security owner | `To be filled` |

### 2.1 Configuration Scope Quick Check

| Configuration Item | Requirement for This Edition |
| --- | --- |
| License, delivery purpose, brand, currency, and credits exchange ratio | Required and must pass acceptance |
| Employee account-opening method, Tenant organization model, and registration-page access scope | Must be confirmed by the responsible owner |
| SMTP | Required when email registration, email verification-code login, or account recovery is used |
| Provider mode and default Provider | Confirmed by product and delivery owners, and validated against new Tenant relationships |
| Model Services baseline data | Check model authors, meta models, model sources, and model tags for every deployment; check model templates according to delivery scope |
| Google Login | Disabled by default; configure only when explicitly required by the enterprise |
| Stripe, Alipay, top-up route, and top-up arrival email | Must remain disabled |
| Google Analytics ID | Empty by default. Do not enable without privacy or compliance approval |

## 3. Common Entry Points

| Page | Menu Path | Direct Link | Purpose |
| --- | --- | --- | --- |
| Login | No login required | [Open Login]({{PLATFORM_BASE_URL}}/user/login) | Login and login acceptance |
| Register | Enter from the login page, or open directly | [Open Register]({{PLATFORM_BASE_URL}}/user/register) | Employee email self-registration acceptance after SMTP is configured |
| License Management | User Center > License Management | [Open License Management]({{PLATFORM_BASE_URL}}/user/usercenter/license/managed-objects) | Import, activate, and check License |
| Platform Settings | System Configuration > Platform Settings | [Open Platform Settings]({{PLATFORM_BASE_URL}}/user/system/platform-settings/config) | Brand, currency, account, email, and related settings |
| Login Configuration | System Configuration > Login Configuration | [Open Login Configuration]({{PLATFORM_BASE_URL}}/user/system/login-properties) | Registration role, verification code, and login security |
| System Agreement Management | Operations Console > System Management > System Agreement Management | [Open System Agreement Management]({{PLATFORM_BASE_URL}}/deck/op/system/agreement) | Internal terms of use and privacy policy |
| Tenant Management | System Configuration > Tenant Management | [Open Tenant Management]({{PLATFORM_BASE_URL}}/user/tenant) | Administrator-created accounts and self-registration result checks |
| Team Members | User Space > Team Members | [Open Team Members]({{PLATFORM_BASE_URL}}/user/user-space/team-members) | Manage employee members in the same Tenant |
| Role Management | User Space > Role Management | [Open Role Management]({{PLATFORM_BASE_URL}}/user/user-space/roles) | Configure employee access permissions |
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

## 4. Decide the Employee Account-Opening Method First

Enterprise Internal Edition supports the following two approaches. They lead to different organization results, so the decision must be made before opening the system.

### 4.1 Option 1: Administrator Creates Employee Accounts Directly

Applicable scenario: All employees need to enter the same enterprise Tenant and have roles, projects, and quotas assigned centrally by the enterprise.

Recommended approach: The enterprise administrator creates members directly in Team Members, fills initial passwords, and assigns roles. There is currently no member email-invitation flow. Use this approach when SMTP is not configured.

### 4.2 Option 2: Employees Register by Email

Prerequisite: The customer's own SMTP has been configured, and real registration, login, and account-recovery email tests have passed.

Current behavior that must be understood:

- Email self-registration accepts any valid and unused email address. There is currently no enterprise email-domain allowlist.
- Each self-registered employee creates an independent Tenant and does not automatically join the existing enterprise Tenant.
- Therefore, if the goal is `all employees collaborate in the same enterprise space`, do not use email self-registration as the method to join the enterprise Tenant. Administrators should create members directly.
- There is currently no verified master switch to close all public registration. If the registration page is reachable from the Internet, external emails may attempt registration even if the text says `employee registration`.

If the enterprise still chooses email self-registration, the enterprise owner must confirm that the `one independent Tenant per registrant` behavior matches the usage model, and must restrict registration-page access through intranet, VPN, access control, or the delivery solution.

| Decision Item | Choice for This Deployment |
| --- | --- |
| Employee account-opening method | `Administrator creates directly / Email self-registration: to be confirmed` |
| Require all employees to enter the same Tenant | `Yes / No: to be confirmed` |
| Allow each person to create an independent Tenant | `Yes / No: to be confirmed` |
| Registration-page access scope | `Intranet / VPN / specified network / Internet: to be confirmed` |
| Decision owner | `To be filled` |

## 5. Materials Required Before Go-Live

### 5.1 Brand and Contact Information

| Item | Owner-Provided Value | Acceptance Owner |
| --- | --- | --- |
| Product name | `To be filled` | `To be filled` |
| Internal support email | `To be filled` | `To be filled` |
| Logo image file | `File to be provided` | `To be filled` |
| Favicon image file | `File to be provided` | `To be filled` |
| System default language | `Follow system / Chinese / English: to be confirmed` | `To be filled` |
| Internal user documentation URL | `To be filled; confirm hidden documentation entry if not provided` | `To be filled` |
| Default view mode | `Table / Card: to be confirmed` | `To be filled` |
| Login timeout | `Confirmed by information security owner; keep delivery value if not confirmed` | `To be filled` |
| Google Analytics ID | `Empty by default; privacy or compliance approval is required before enabling` | `To be filled` |

### 5.2 Internal Accounting and Quota Parameters

Enterprise Internal Edition does not open user top-up, but currency and credits exchange ratio still need to be configured for page display, usage measurement, and internal cost accounting.

| Item | Owner-Provided Value | Reasonableness Check |
| --- | --- | --- |
| Currency code | `To be filled, such as an ISO 4217 code` | Consistent with the enterprise internal accounting currency |
| Currency name | `To be filled` | Consistent with currency code |
| Currency symbol | `To be filled` | Not confused with other currencies |
| Credits exchanged for 1 currency unit | `To be filled` | Supports internal cost accounting and display |
| Enable new-Tenant registration bonus | `Yes / No: to be filled` | Pay special attention only in email self-registration mode |
| Registration bonus credits | `To be filled` | Consistent with internal subsidy policy |
| Other internal credits provisioning method | `Platform subsidy / Administrator allocation / Other: to be filled` | Does not depend on online user top-up |

Do not use code values or page defaults directly as enterprise recommendations.

### 5.3 SMTP Information

SMTP is required only when email self-registration, email verification-code login, or account recovery is selected. This document uses SMTP only and does not configure other email service providers.

| Item | Provided Value |
| --- | --- |
| SMTP host | `To be filled` |
| SMTP port | `Fill according to the enterprise SMTP service, commonly 465; implicit SSL/TLS must be supported` |
| SMTP username | `To be filled` |
| SMTP password or authorization code | `Provided by credential custodian; do not write it in this document` |
| Sender email | `To be filled` |
| SPF, DKIM, and DMARC status of the sender domain | `Confirmed by email administrator` |
| SMTP credential custody location | `To be filled; record custody location only, not plaintext` |
| Test recipient emails | `At least one enterprise mailbox and one backup test mailbox` |

The current version does not support `587 STARTTLS`. If the enterprise email service provides only `587 STARTTLS`, it cannot be connected in this release. Stop email acceptance and report it to R&D for later support evaluation.

New deployments cannot send email by default: SMTP host, username, password, and sender email do not contain real built-in values; top-up arrival email is disabled by default; CC recipients and login URL are empty by default; if no password configuration record exists, the page shows `Not configured`. Do not rely on any historical values in the delivery package, configuration center, or page. If historical credentials are found, treat them as exposed and have the credential owner rotate or revoke them immediately.

### 5.4 Internal Agreements and Security Parameters

- Enterprise internal terms of use, privacy policy, or employee notice text.
- Ordinary employee default role for the email registration entry.
- Verification-code validity period, maximum error count, sending rate limit, and password-failure lockout parameters.
- Network access scope of the registration page and emergency shutdown plan.
- Google Login remains disabled by default. If it must be enabled, prepare the enterprise's own Google OAuth configuration and confirm independent-Tenant behavior.

## 6. Recommended Configuration Order

1. Activate and check the License. Confirm that this delivery purpose is enterprise internal use.
2. Use the platform administrator `admin` to check configuration permissions and all direct links owned by `admin`.
3. Use the fixed `operator` account to complete the Model Services baseline-data precheck.
4. Determine employee account-opening method and Tenant organization model.
5. Publish internal terms of use and privacy policy.
6. Configure product name, support email, Logo, Favicon, and default language.
7. If email registration, email login, or account recovery is used, configure and verify SMTP.
8. Configure registration default role and login security parameters. Keep Google Login explicitly disabled if not used.
9. Configure currency, credits exchange ratio, and internal credits provisioning method.
10. Have delivery personnel confirm provider relationship.
11. Confirm that Stripe and Alipay are both disabled and user top-up entry is not open.
12. Complete go-live acceptance.

## 7. Step-by-Step Configuration

### 7.1 License and Delivery Purpose

Entry: [Open License Management]({{PLATFORM_BASE_URL}}/user/usercenter/license/managed-objects)

Steps:

1. Log in as platform administrator `admin`.
2. Import and activate the valid License agreed for this deployment contract.
3. Check that authorized object, validity period, status, and deployment environment are consistent.
4. Confirm the delivery purpose as `enterprise internal use`, and check the capability boundaries of `no external top-up`, `no external retail`, and `no external Provider settlement`.
5. Keep at least two available License Management accounts.

Acceptance: The License page has no expiry or unavailable warning; ordinary internal accounts can log in normally; both License administrators confirm that their accounts are available.

Current-version note: The `enterprise/operator` version field and backend capability isolation are not fully implemented. `Enterprise Internal Edition` is a delivery-purpose category in this template, not a License configuration item on the current page. Even if payment or settlement entries are still visible on the page, they must not be enabled. Delivery personnel must disable and accept them according to this checklist.

### 7.2 Enterprise Administrators and Permissions

Entry: [Open Team Members]({{PLATFORM_BASE_URL}}/user/user-space/team-members); [Open Role Management]({{PLATFORM_BASE_URL}}/user/user-space/roles)

Steps:

1. Confirm first that the platform administrator username is `admin` and can log in. Then confirm that backup administrators, License administrators, and configuration executors are available.
2. When all employees enter the same Tenant, assign roles such as ordinary employee, department administrator, and project administrator by position. Do not share administrator accounts.
3. Give configuration executors only the view and save permissions required for this work.
4. Do not grant ordinary employees access to Platform Settings, payment, License, variable push, or other administrator entries.
5. This template does not record `admin` or other account passwords. Initial passwords must be delivered through a controlled channel and changed according to the security policy.

Acceptance: Enterprise administrators can manage members and roles; ordinary employees can access only functions required for their work; the backup administrator completes one login.

### 7.3 Internal Terms of Use and Privacy Policy

Entry: [Open System Agreement Management]({{PLATFORM_BASE_URL}}/deck/op/system/agreement)

Steps:

1. Publish internal terms of use and privacy policy according to enterprise legal or information security requirements.
2. Fill the official version, effective time, and scope.
3. Open agreement links on the registration page and check title, body, version, and navigation.

Acceptance: When email self-registration is used, employees can read the current effective agreements on the registration page and can continue registration only after agreeing.

### 7.4 Product Name, Support Email, Logo, Favicon, and Default Language

Entry: [Open General]({{PLATFORM_BASE_URL}}/user/system/platform-settings/config?tab=general); [Open UI Settings]({{PLATFORM_BASE_URL}}/user/system/platform-settings/config?tab=ui)

In `General`:

1. Fill the product name confirmed by the enterprise.
2. Fill the internal support email and confirm that an owner continuously handles messages.
3. Save and refresh the page to confirm the values remain correct.

In `UI Settings`:

1. Upload Logo and Favicon with the file upload control. Do not manually fill server file paths.
2. Select the system default language.
3. Configure the internal documentation URL according to enterprise materials. If no valid document exists, enable `Hide Documentation` and leave the documentation URL empty.
4. Select default view mode, table or card. This affects only default list display.
5. Use the login timeout approved by the information security owner. If not approved, keep the delivery default.
6. Keep Google Analytics ID empty by default. Enable it only after privacy or compliance approval.
7. Keep the top-up route empty and do not point it to a user top-up page.
8. `Custom backend API address`, `Check frontend update version`, API prefix, and file prefix are delivery-level settings. Do not modify them without a delivery change request.

Acceptance: After logging out and reopening the platform, the login page, navigation bar, browser tab icon, default language, product name in emails, and support email are correct.

### 7.5 SMTP and Login URL

Entry: [Open Email Settings]({{PLATFORM_BASE_URL}}/user/system/platform-settings/config?tab=email), then expand `SMTP Service Configuration`. The current page exposes SMTP only.

Steps:

1. Fill the enterprise-owned SMTP host, username, password or authorization code, and sender email. Fill the port according to the enterprise SMTP service. `465` is common.
2. The port must support implicit SSL/TLS (TLS 1.2). `587 STARTTLS` is not supported; do not trial-fill 587 settings.
3. Save and reopen the page. Confirm that SMTP status and password both show `Configured`. If no password configuration record exists, the page must show `Not configured`.
4. Leaving the password field empty when a password has already been saved means keeping the existing password. Select `Clear saved password` only when the old credential is explicitly revoked.
5. Enterprise Internal Edition must keep Stripe and top-up arrival email disabled, so `Login URL` can stay empty. If Stripe is later enabled through special approval, it can be configured as `{{PLATFORM_BASE_URL}}/user/login` when needed. When configured, it is written to Stripe PaymentIntent metadata and description; when empty, it is omitted and does not block save, enabling, or payment. If top-up arrival email is also enabled and the email should provide a login entry, configure the correct URL.
6. Keep `top-up arrival email` disabled and CC recipients empty for Enterprise Internal Edition.

The current page has no independent SMTP connection-test button. Verification must use real business emails:

1. Send a registration verification code from the registration page to a test mailbox and confirm receipt.
2. If this deployment allows email self-registration, complete one test registration.
3. Verify email verification-code login from the login page.
4. Verify account recovery email and recovery flow.
5. Check sender, subject, product name, verification code, support email, delivery time, and spam classification.

Acceptance gate: Employee email self-registration can be opened only after all real receipt tests pass. Seeing `Configured` alone does not mean SMTP works.

Security gate: If the deployment package, configuration center, or historical page ever exposed SMTP credentials provided by the organization, do not continue using them. The credential owner must rotate or revoke them before acceptance.

If SMTP is not configured for this deployment, email self-registration, email verification-code login, or email-based account recovery must not be treated as available employee methods. Prepare administrator-created accounts, initial-password delivery, and password-reset procedure in advance.

### 7.6 Employee Registration and Login Security

Entry: [Open Login Configuration]({{PLATFORM_BASE_URL}}/user/system/login-properties)

If administrators create accounts directly:

1. Create employees directly in Team Members and fill initial passwords. There is currently no member email-invitation flow.
2. Assign correct roles and quotas, and confirm members enter the current enterprise Tenant.
3. Deliver usernames and initial passwords through a controlled channel. Require password change after first login according to the enterprise security policy.

If email self-registration is selected:

1. In `Registration Configuration`, check the default role for the `Email Registration` entry. It must be an ordinary employee or ordinary user role.
2. Confirm that the enterprise owner accepts the current behavior of `one independent Tenant per registrant` and `no email-domain allowlist`.
3. Restrict registration-page access through intranet, VPN, access control, or the delivery solution.
4. External system access, platform source directory, and third-party points recharge are not required for employee email registration. Keep them disabled.

In `Login Security`, `Registration Verification Code`, and `Account Recovery`:

1. Set verification-code validity period, maximum error count, sending rate limit, and password-failure lockout according to values provided by the information security owner.
2. Do not use `0` as a rate-limit value unless the information security owner explicitly requires disabling that dimension.
3. Save each group and refresh to recheck.

In `Google Login`:

1. Google Login is disabled by default for new deployments. If it is not used, confirm the status is `Not enabled` and Client ID is empty.
2. If it must be enabled, fill the enterprise's own Google OAuth configuration and complete a real Google login test.
3. A Google user creates an independent Tenant at first login and does not automatically join the existing enterprise Tenant. If all employees must enter the same enterprise space, do not use Google Login as the method to join the enterprise Tenant.

To urgently stop email registration: stop publishing the registration link immediately and restrict network access to the registration page, then contact delivery personnel. There is currently no verified master switch for public registration. Do not casually delete the default role or clear SMTP password as a substitute for disabling registration.

### 7.7 Currency, Credits Exchange Ratio, and Internal Credits

Entry: [Open Currency Settings]({{PLATFORM_BASE_URL}}/user/system/platform-settings/config?tab=currency); [Open Account and Settlement]({{PLATFORM_BASE_URL}}/user/system/platform-settings/config?tab=account)

Configure internal accounting currency code, name, and symbol in `Currency Settings`; configure default credits exchange ratio and registration bonus in `Account and Settlement`.

Requirements:

1. Use only the values approved in section 5.2. Do not treat code values or page defaults as recommended values.
2. Currency and exchange ratio are used for display, usage measurement, and internal cost accounting. They do not mean employees are allowed to top up with real money.
3. When email self-registration is selected and initial credits are required, registration bonus can be enabled according to the approved plan. The change affects only future new Tenants.
4. Provide credits through administrator allocation, platform subsidy, or another internal method, and keep approval and allocation records.
5. Configurations marked `Beta` on the page are not included in this go-live configuration. Do not modify them without a dedicated plan.

Acceptance: Test accounts can see the correct currency and credits. When registration bonus is enabled, the amount matches the approved value; when disabled, a newly registered Tenant does not receive a bonus. The platform has no successful online real-money top-up path for employees.

### 7.8 Provider Relationship

Entry: [Open Provider Relationship]({{PLATFORM_BASE_URL}}/user/system/platform-settings/config?tab=provider)

Single Provider, multiple Providers, and Operator-only binding represent different AI service ownership relationships. Even if the enterprise does not operate externally, underlying model service sources may require specific binding. Product and delivery owners must determine this item; enterprise administrators should not decide it alone.

The system marks `Single Provider` as `Recommended`. This applies to common deployments where all Tenants belong to one fixed Provider. `Beta` indicates feature maturity and is different from `Recommended`. The approved model-service and delivery solution still prevails.

`Backfill Binding` processes historical customer relationships. Do not click it unless impact scope, backup, and change approval have been confirmed.

Acceptance: The test Tenant relationship matches the delivery solution. If Provider is not enabled, confirm that no mistaken binding exists.

### 7.9 Payment Channels and Top-Up

Entry: [Open Stripe]({{PLATFORM_BASE_URL}}/user/system/platform-settings/config?tab=channels&channel=STRIPE); [Open Alipay]({{PLATFORM_BASE_URL}}/user/system/platform-settings/config?tab=channels&channel=ALIPAY); [Open UI Settings]({{PLATFORM_BASE_URL}}/user/system/platform-settings/config?tab=ui)

Enterprise Internal Edition requirements:

1. Keep Stripe disabled. Do not fill or enable production payment credentials.
2. Keep Alipay disabled. Do not fill or enable production payment credentials.
3. Do not open any other user payment or top-up channel.
4. Keep the top-up route in UI Settings empty, or have delivery personnel confirm that it does not point to a user top-up page.
5. Keep top-up arrival email disabled in Email Settings.
6. If the UI still shows a top-up entry, record the actual page and account and have delivery personnel check License and menu capabilities. Do not validate Enterprise Internal Edition by making a trial top-up.

Acceptance: Use an ordinary employee account to check navigation, account pages, and related entries. The user must not be able to complete a real-money top-up. Stripe and Alipay both show disabled.

### 7.10 Model Services Baseline-Data Precheck

Check account: use the fixed `operator` account provided for each deployment. During checks, view only. Do not add, edit, enable, disable, or delete data. Click `Reset` or clear search conditions on each page first.

| Check Object | Deployment Requirement | Quick Check |
| --- | --- | --- |
| Meta Models (including model authors) | Preset data is required for every deployment | [Open Meta Models]({{PLATFORM_BASE_URL}}/modelone/settings/meta), or enter through `Model Services > Settings > Meta Models`. Confirm that both the model-author list on the left and meta models on the right have data; switch authors, run one search or filter, open one detail page, and confirm author, model type, scenario, and major capabilities display correctly. |
| Model Sources | Preset data is required for every deployment | [Open Model Sources]({{PLATFORM_BASE_URL}}/modelone/settings/vendor), or enter through `Model Services > Settings > Model Sources`. Run one search and open one detail page. Confirm that model-source identifier, region, Base URL, and documentation URL ownership are reasonable. Request-header authentication values may show only placeholders such as `<key>` or non-sensitive constants. Real API Keys, Tokens, or passwords must not be displayed. |
| Model Tags | Preset data is required for every deployment | [Open Tags]({{PLATFORM_BASE_URL}}/modelone/settings/tags), or enter through `Model Services > Settings > Tags`. Select the `Model` type and confirm tree tags have data; run one name search, status filter, and reset; confirm parent-child hierarchy is reasonable and meta-model scenario shows category names rather than internal IDs. |
| Model Templates | Check according to delivery scope | [Open Templates]({{PLATFORM_BASE_URL}}/modelone/settings/provider-template), or enter through `Model Services > Settings > Templates`. Select the model source that should have templates for this deployment, then confirm template cards, filters, and details work normally, and Provider, region, and meta-model associations are correct. If this deployment explicitly does not preconfigure templates, record `Not applicable` and do not temporarily create templates just to complete the check. |

The following situations block go-live: model authors, meta models, model sources, or model tags have no data at all; the page keeps reporting errors; lists or details cannot be opened; search, filter, or reset is clearly invalid; authors, tags, regions, model sources, or templates are obviously misbound; the page displays a real API Key, Token, or password. Individual optional descriptions, multilingual content, icons, or documentation URL issues should be recorded and submitted to the owner for judgment, not used directly to fail the whole deployment.

This section does not fill or verify real API Keys and does not initiate real model requests. Passing this section means only that baseline data exists, pages are usable, and major relationships show no obvious errors. It does not replace acceptance for model publishing, real invocation, Quota, credits, call records, or billing chain.

## 8. Go-Live Acceptance Checklist

### 8.1 Basics and Permissions

- [ ] License is valid, and delivery personnel confirm this deployment is Enterprise Internal Edition.
- [ ] Two primary and backup License Management users can log in.
- [ ] Enterprise administrator and ordinary employee permissions follow the least-privilege principle.
- [ ] Product name, support email, Logo, Favicon, and default language are correct.
- [ ] Internal terms of use and privacy policy are published.
- [ ] Employee account-opening method, Tenant organization model, and registration-page access scope have been signed off by the responsible owner.

### 8.2 Email, Accounts, and Organization

- [ ] When SMTP is used, real registration verification-code, login verification-code, and account-recovery emails have all been received.
- [ ] Employees created directly by administrators enter the correct enterprise Tenant, and initial passwords have been delivered through a controlled channel.
- [ ] When email self-registration is used, the owner has confirmed that each registrant creates an independent Tenant.
- [ ] When email self-registration is used, registration-page access scope matches enterprise security requirements.
- [ ] Password login, failed-attempt lockout, and post-unlock behavior match the security plan.
- [ ] When SMTP is not configured, administrator-created account, initial login, and password-reset flows have been rehearsed.
- [ ] Google Login remains disabled, or real login has been completed with the enterprise's own OAuth configuration and independent-Tenant behavior has been confirmed.

### 8.3 Currency, Credits, and Payment Boundaries

- [ ] Currency code, name, and symbol match the internal accounting solution.
- [ ] Credits exchange ratio matches the approved value.
- [ ] Registration bonus or internal subsidy method matches the approved plan.
- [ ] Stripe is disabled.
- [ ] Alipay is disabled.
- [ ] Top-up arrival email is disabled.
- [ ] Ordinary employees cannot complete real-money top-up.
- [ ] If the UI still shows a payment entry, it has been recorded as an implementation boundary and submitted to delivery personnel for verification.

### 8.4 Provider Relationship

- [ ] Provider mode matches the approved model-service and delivery solution.
- [ ] If a default Provider is required, the correct Provider is configured. If Provider is not enabled, the default Provider is empty.
- [ ] A new test Tenant has been used to check the Operator/Provider relationship.
- [ ] `Backfill Binding` has not been executed without impact confirmation, backup, and approval.

### 8.5 Model Services Baseline Data

- [ ] Read-only checks have been completed with the fixed `operator` account.
- [ ] Model authors, meta models, model sources, and model tags all have preset data, and page, search, detail, and major associations work normally.
- [ ] Model templates have passed checks according to delivery scope, or have been explicitly recorded as `Not applicable`.
- [ ] Model-source request headers do not display real API Keys, Tokens, or passwords.
- [ ] Model Services publishing, invocation, metering, billing, and other end-to-end acceptance have been completed separately according to delivery scope, or are explicitly recorded as out of scope.

The system can be opened to employees only after all required items pass.

## 9. Items That Require Approval Before Modification

- Stripe, Alipay, or other online user top-up configuration.
- API prefix, file prefix, custom backend API address, and other delivery-level runtime parameters.
- Configurations marked `Beta` on the page.
- Currency, credits exchange ratio, and accounting basis after usage or internal transaction records have been generated.
- Unapproved Provider mode, default Provider, and historical-customer `Backfill Binding`.
- Verification-code, rate-limit, and lockout policies not confirmed by the information security owner.
- Any email service provider outside the scope of this document.
