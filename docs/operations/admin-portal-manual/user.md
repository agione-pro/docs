# User

## Document Purpose

This document explains how administrators manage users in the admin portal, including user creation, role assignment, account status control, reset operations, and audit verification.

## Before You Start

- Confirm the current administrator has permission to manage users.
- Confirm the target tenant, organization, project, or resource scope.
- Prepare the user's name, email or login identifier, organization, and contact information.
- Confirm the role that should be assigned and the reason for the assignment.
- Confirm whether the account should be enabled immediately after creation.

## User Lifecycle

| Stage | Main Action | Verification |
|-------|-------------|--------------|
| Create | Add the user and fill in required profile fields. | User record appears in the list. |
| Authorize | Assign role and resource scope. | Visible menus and resources match the expected scope. |
| Notify | Share login entry and initial access method through the approved channel. | User can complete first login. |
| Maintain | Update profile, role, scope, or status as responsibilities change. | Audit log records the change. |
| Disable | Disable or remove access when the user leaves the scope. | User can no longer access restricted functions. |

## Typical Operations

### Create a User

1. Navigate to `Admin Portal > Users`.
2. Click the create or add-user entry.
3. Fill in required profile fields, such as name, email, organization, and contact information.
4. Select the user's tenant or organization scope.
5. Confirm whether the account should be enabled immediately.
6. Save the user.

After saving, search for the user in the list and confirm that the profile and status are correct.

### Assign Roles and Resource Scope

1. Open the target user record.
2. Enter the role or permission configuration area.
3. Select the role template that matches the user's responsibility.
4. Assign tenant, organization, project, resource, or menu scope according to the platform configuration.
5. Save the change.
6. Ask the user to log in again, or refresh permissions if the platform provides a refresh entry.

Do not assign administrator or broad operator roles only to make a missing menu visible. First confirm whether the issue is caused by role, resource scope, or menu configuration.

### Enable, Disable, or Reset Access

Use status and reset operations carefully:

| Operation | Use When | Check Before Saving |
|-----------|----------|---------------------|
| Enable | A newly created or previously disabled user should regain access. | Confirm the user still belongs to the authorized organization. |
| Disable | A user leaves the project, changes responsibility, or should temporarily lose access. | Confirm that no active delivery or approval task depends on the account. |
| Reset access | Login recovery or account troubleshooting is required. | Confirm the requester identity and record the reason. |

## Validation Checklist

- [ ] User can sign in successfully.
- [ ] Assigned permissions match the expected role and resource scope.
- [ ] User can see only the intended menus.
- [ ] User cannot access resources outside the authorized scope.
- [ ] Create, update, disable, or reset actions are recorded in audit logs.
- [ ] High-risk changes have an approved reason or traceable request record.

## FAQ

| Issue | Possible Cause | Solution |
|-------|----------------|----------|
| User cannot sign in | Account disabled, wrong login identifier, or password/reset flow incomplete | Confirm account status and retry the approved reset flow |
| User cannot see an expected menu | Role or menu permission is missing | Confirm role assignment and menu authorization |
| User sees a menu but no data | Resource scope is not authorized | Confirm tenant, organization, project, or resource authorization |
| Role change does not take effect | Permission cache or active session has not refreshed | Ask the user to log out and log in again, or use the platform refresh entry |
| Audit log is missing | Action was not saved, log sync is delayed, or the current account lacks audit visibility | Recheck operation result and confirm audit permission |
