---
prev: false
next: true
---

# Scenario Overview - Application Publishing and Approval

This scenario helps operators review an application's bound model, calling entry point, and customer visibility, then complete publishing, approval, and customer-side validation.

## Applicable Roles

- Platform Operators, application publishing administrators, and application reviewers

## Scenario Goals

- Confirm that the model bound to the application is available.
- Make the calling entry point, parameter mapping, and customer scope clear.
- Keep approval comments and publication state traceable.
- Ensure that only intended customers can see and call the application after approval.

## Scenario Flow

**Main path:** Prepare application materials -> Review publishing information -> Process application approval -> Validate visibility and calls -> Track call results

| Stage | Key Result |
| --- | --- |
| 1. Prepare | Description, bound model, entry point, and customer scope are complete |
| 2. Review | Decision, comments, reviewer, and time are recorded |
| 3. Publish | Publication state and intended visibility are correct |
| 4. Validate | Customer calls work and failures can be traced |

## Before You Start

- Obtain application publishing administration or approval permission.
- Prepare the application description, bound model, calling entry point, and customer scope.
- Confirm the bound model state and customer authorization boundary.

## Recommended Reading Order

1. Review publishing information in Applications.
2. Check application materials and scope in Application Reviews.
3. Validate visibility and the calling entry point from the customer perspective.
4. Use call logs to investigate any exception.

## Document Index

| Document | Description |
| --- | --- |
| [Application Publishing and Approval Workflow](./application-review-workflow) | Steps from publishing-information review through approval and customer validation |

## Completion Checklist

> **Purpose:** These are the scenario exit criteria. Use them to confirm that the approved application is visible only to its intended customers and has a usable, traceable calling path.

| Check | Pass Criteria |
| --- | --- |
| 1 | Application description, bound model, calling entry point, and customer scope are complete. |
| 2 | Approval state, comments, reviewer, and processing time are traceable. |
| 3 | The application is visible only to intended customers. |
| 4 | The customer-side calling entry point works and failures can be located in logs. |
