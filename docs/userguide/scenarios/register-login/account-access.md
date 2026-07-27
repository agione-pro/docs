---
prev: false
next: true
---

# Sign In, Register, and Reset a Password

## Target Outcome

A new Platform User completes registration and email verification; all roles can enter the correct workspace and recover access after forgetting a password.

## Applicable Roles

- Platform User registering an account
- Model Provider and Platform Operator signing in or recovering access

## Before You Start

- Prepare an email address that can receive verification codes and a password that meets the organization policy.
- Confirm the platform URL, tenant, expected role, and whether self-registration is allowed with the organization administrator.

## Procedure

### Create an Account

1. Open the AGIOne sign-in URL provided by the organization, such as `https://agione.pro/user/login`.
2. Select **Create Account** at the bottom of the sign-in card.
3. Complete the registration form:
   - **Username**: account username.
   - **Password**: account password.
   - **Confirm Password**: enter the same password again.
   - **Corporate Email**: address used to receive the verification code.
4. Select **Send Verification Code**.
5. Enter the six-digit code received by email.
6. Read and accept the Privacy Policy and Terms of Service.
7. Select **Create Account**. After registration succeeds, use the new account to sign in.
8. Select **Back to Sign In** to return without registering.

![Open account creation](./images/create-your-account.png)

#### Parameter Reference

| Field | Type | Example | Description |
| --- | --- | --- | --- |
| Username | Text | `new-user-001` | Required; new account username |
| Password | Password | `********` | Required; new account password |
| Confirm Password | Password | `********` | Required; must match Password |
| Corporate Email | Text | `user@example.com` | Required; receives verification codes |
| Send Verification Code | Button | Not applicable | Required; sends a six-digit code |
| Verification Code | Text | `4 4 2 5 6 8` | Required; six-digit code received by email |
| Privacy Policy and Terms | Checkbox | Selected | Required; accepts the user agreements |
| Create Account | Button | Not applicable | Required; submits registration |
| Back to Sign In | Link | Not applicable | Optional; returns to sign-in |

### Sign In to AGIOne with a Password

1. Open the AGIOne sign-in URL provided by the organization.
2. Select **Password Sign-In**, which is selected by default.
3. Enter the username or registered email and the password.
4. Read and accept the Privacy Policy and Terms of Service.
5. Select **Sign In** and verify that the correct workspace opens.
6. If sign-in fails, use the on-screen error to check the credentials and network before retrying.
7. Use **Home**, **Create Account**, or **Forgot Password** when the corresponding action is needed.

![Use password sign-in](./images/password.png)

#### Parameter Reference

| Field | Type | Example | Description |
| --- | --- | --- | --- |
| Username or Email | Text | `provider-user` | Required; username or registered corporate email |
| Password | Password | `********` | Required; account password |
| Privacy Policy and Terms | Checkbox | Selected | Required; accepts the user agreements |
| Sign In | Button | Not applicable | Required; submits the credentials |
| Home | Link | Not applicable | Optional; returns to the platform home page |
| Create Account | Link | Not applicable | Optional; opens registration |
| Forgot Password | Link | Not applicable | Optional; opens password recovery |

### Sign In to AGIOne with an Email Code

1. Open the AGIOne sign-in URL provided by the organization.
2. Select **Email Verification Code**.
3. Enter the registered corporate email.
4. Select **Send Verification Code**.
5. Enter the six-digit code before it expires.
6. Read and accept the Privacy Policy and Terms of Service.
7. Select **Sign In** and verify that the correct workspace opens.
8. Select **Continue with Google** only when the organization allows Google sign-in.

![Use email verification-code sign-in](./images/verification-code.png)

#### Parameter Reference

| Field | Type | Example | Description |
| --- | --- | --- | --- |
| Corporate Email | Text | `user@example.com` | Required; registered email |
| Send Verification Code | Button | Not applicable | Required; sends a six-digit code |
| Verification Code | Text | `4 4 2 5 6 8` | Required; code received by email before expiry |
| Privacy Policy and Terms | Checkbox | Selected | Required; accepts the user agreements |
| Sign In | Button | Not applicable | Required; submits email-code sign-in |
| Continue with Google | Button | Not applicable | Optional; uses organization-approved Google sign-in |

### Reset a Forgotten Password

Password recovery has three steps: verify the email, reset the password, and complete the flow.

#### Step 1: Verify the Email

1. Open the AGIOne sign-in URL provided by the organization.
2. Select **Forgot Password**.
3. Enter the registered corporate email.
4. Select **Send Verification Code** and wait for the resend timer before requesting another code.
5. Enter the six-digit code received by email.
6. Select **Continue**.
7. Select **Contact Us** if the code does not arrive after the checks below.
8. Select **Back to Sign In** to leave password recovery.

![Verify the registered email](./images/verify-email.png)

#### Step 2: Reset the Password

1. After email verification, confirm the account information shown on the Reset Password step.
2. Enter the new password and enter it again under Confirm Password.
3. Resolve any validation message, such as an empty password or mismatched values.
4. Select **Reset Password**.
5. Select **Previous** to return to email verification when needed.

![Set a new password](./images/reset-password.png)

#### Step 3: Complete

1. Confirm that the page reports a successful password reset.
2. Select **Back to Sign In** and sign in with the new password.

#### Parameter Reference

| Field | Type | Example | Description |
| --- | --- | --- | --- |
| Corporate Email | Text | `user@example.com` | Required; registered email |
| Send Verification Code | Button | Not applicable | Required; sends a six-digit code after the resend timer |
| Verification Code | Text | `4 4 2 5 6 8` | Required; six-digit code received by email |
| Continue | Button | Not applicable | Required; submits email verification |
| Contact Us | Link | Not applicable | Optional; requests help when no code arrives |
| Back to Sign In | Link | Not applicable | Optional; returns to sign-in |
| New Password | Password | `********` | Required; new account password |
| Confirm Password | Password | `********` | Required; must match New Password |
| Previous | Button | Not applicable | Optional; returns to email verification |
| Reset Password | Button | Not applicable | Required; submits the new password |

## Completion Checklist

> **Purpose:** These are the exit criteria for the current feature task. Use them to decide whether the result is observable and reviewable and whether you can continue to the next step in the scenario. They do not repeat the procedure; if any item fails, follow the troubleshooting section below.

| Check | Pass Criteria |
| --- | --- |
| 1 | A new account completes email verification and signs in. |
| 2 | Password and email-code sign-in enter the correct tenant and workspace. |
| 3 | The old password no longer works after reset and the new password does. |
| 4 | Failed authentication shows a useful error without exposing whether an account exists. |

## Common Issues

| Symptom | Check First |
| --- | --- |
| Verification email is missing | Email address, spam folder, resend timer, and mail-service state |
| Account creation fails | Duplicate username, password policy, code expiry, and accepted terms |
| The wrong workspace opens | Tenant assignment, assigned role, and default entry |
| The new password does not work | Use of the new password, account state, keyboard input, and sign-in method |

## User Manual

[Choose the relevant subsystem manual after signing in](/usermanual/)
