---
prev: false
next: true
---

# Scenario Overview - Register and Login

This scenario covers account registration, password login, email-code login, and password recovery before users enter an AGIOne subsystem.

## Applicable Roles

- Platform User, Model Provider, and Platform Operator

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

> **Purpose:** These are the scenario exit criteria. Use them to decide whether the outcome is observable and reviewable and whether you can continue to the next scenario. They do not repeat the procedure; if any item fails, return to the relevant feature guide and follow its troubleshooting section.

| Check | Pass Criteria |
| --- | --- |
| 1 | Password or email-code sign-in succeeds without persistent authentication errors. |
| 2 | The account enters the correct tenant and sees the expected role, menus, and subsystems. |
| 3 | Password recovery completes, the new password works, and the old password no longer works. |