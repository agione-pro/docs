---
prev: false
next: true
---

# Admin Portal Manual

This section introduces core workflows in the admin portal. The current version focuses on user lifecycle management, role assignment, access status control, and audit verification.

## Who Should Read This

| Role | Typical Task |
|------|--------------|
| Platform administrator | Create users, maintain account status, and assign platform roles. |
| Tenant administrator | Manage users within the authorized tenant or organization scope. |
| Security or audit owner | Confirm that user changes are traceable and permission boundaries are correct. |

## Documents

| Document | Purpose |
|------|------|
| [User](./user) | User lifecycle operations in the admin portal: create, role assignment, status control, reset, and audit checks |

## Operating Principles

- Use the minimum role and resource scope required for the task.
- Confirm the target tenant, organization, or project before creating or updating a user.
- Avoid using shared accounts for daily operations.
- Keep high-risk changes, such as disabling users or resetting access, traceable through audit logs.
- Recheck the user's actual login and visible menus after permission changes.
