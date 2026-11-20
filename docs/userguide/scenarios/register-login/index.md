---
prev: false
next: true
---

# Scenario Overview - Register and Login

This scenario covers account registration, password login, email-code login, and password recovery before users enter an {{DOCS_PRODUCT_NAME_EN}} subsystem. An email verification code is time-limited identity-verification information, not a long-term password. Available sign-in methods depend on current platform settings.

## Applicable Roles

- End User, Model Provider, and Platform Operator

## Goals

- Register a new account or sign in with an existing account.
- Recover access through email verification.
- Enter the workspace allowed by the account role.

## Scenario Flow

**Main path:** Prepare access → Register or sign in → Verify the role workspace → Establish account recovery

| Stage | Key Result |
| --- | --- |
| 1. Prepare access | The correct platform address, email, and tenant information are available |
| 2. Register or sign in | The account is verified and enters the platform through a supported method |
| 3. Verify the workspace | The current role, menus, and visible subsystems match expectations |
| 4. Recover access | Password or verification-code problems have a clear recovery path |

## Before You Start

- Prepare an accessible business email address.
- Read the privacy policy and terms of service.
- For an existing account, prepare its username or email and password.

## Recommended Reading Order

1. Create an account
2. Sign in with a password or email code
3. Recover the password when sign-in fails

## Document Index

| Document | Description |
| --- | --- |
| [Register, Login, and Recover Password](./account-access) | Full steps, field descriptions, and feature screenshots |

## Completion Checklist

Confirm the results below before moving on; use the linked procedure to resolve failed checks.

| Check | Pass Criteria |
| --- | --- |
| 1 | Password or email-code sign-in succeeds without persistent authentication errors. |
| 2 | The account enters the correct tenant and sees the expected role, menus, and subsystems. |
| 3 | Password recovery completes, the new password works, and the old password no longer works. |