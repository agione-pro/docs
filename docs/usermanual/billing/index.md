# Overview

::: info Document Information
Version: v1.0
Updated: 2026-07-23
:::

## Feature Overview

| Item | Content |
| --- | --- |
| Applicable Roles | End User / Provider / Operator |
| Navigation Path | User Manual > Billing > Overview |
| Page Route | `/usermanual/billing/` |
| Coverage | User billing, Provider earnings, customer billing, finance operations, and License |

#### Beginner Explanation

Billing works like the financial control room for the platform. User billing helps End Users check balances, transactions, top-ups, and monthly bills. Customer billing handles customer identity, tags, top-up sources, and business units. Finance operations handles settlement, financial accounts, and reconciliation status. License handles resource authorization, validity period, and quota. Start by classifying the issue before opening a specific statement or record.

#### Terms Quick Reference

| Term | Meaning | Common Location |
| --- | --- | --- |
| Billing Cycle | The time period used for billing statistics and settlement, usually viewed by month. | Monthly Bill, Monthly Overview, Settlement List, Reconciliation Center |
| Credits | The unit used for balance, top-up, or billing display in the platform. | Overview, Customer Overview, Top-up Orders, user bills |
| Top-up Order | A processing record created after a user or customer starts a top-up. | Top-up Orders, Customer Top-up Orders |
| Transaction | A record for balance, income, expense, or adjustment changes. | Transactions, Financial Accounts |
| Settlement Statement | A settlement record for a tenant and billing cycle. | Settlement List, Settlements |
| License | Authorization that controls platform modules, resource quota, and validity period. | License |

## Prerequisites

1. The current account has permission to access billing-related menus.
2. The issue has been classified as user billing, Provider earnings, customer billing, finance operations, or License.
3. For amount reconciliation, billing cycle, tenant, customer, business unit, account, and transaction type have been aligned.
4. Before settlement generation, account adjustment, compensation, rebuild, or License activation, approval basis, billing cycle, tenant, and impact scope have been confirmed.
5. Amounts, tenants, accounts, emails, transaction numbers, order numbers, and License information have been desensitized before external communication.

## Page Description

#### Read by Role

| Role | Start Here | Next Step |
| --- | --- | --- |
| End User | [User Billing](./user/billing/overview/) | Check balance, transactions, top-up orders, quota governance, and monthly bills. |
| Provider | [Provider Earnings](./user/earnings/revenue/) | Check revenue overview, settlements, and customers. |
| Operator | [Customer Billing](./operator/customer-billing/customer-overview/) | Check customers, business units, and top-up orders, then open Finance Operations when needed. |
| Billing Operator | [Finance Operations](./operator/finance-operations/today-tasks/) | Start with Today Tasks and Monthly Overview, then continue by billing cycle. |
| Finance Reviewer | [Financial Accounts](./operator/finance-operations/financial-accounts/) | Compare account transactions, settlement statements, and reconciliation exceptions. |
| License Admin | [License](./operator/license/license/) | Check authorization quota, expiration time, and activation status. |

#### Where to Start

| Module | Entry | Suitable Issue |
| --- | --- | --- |
| Getting Started | [Getting Started](./getting-started/) | First-time reading or choosing the correct Billing path. |
| Billing-cycle Workflow | [Reconcile and Settle a Billing Cycle](./end-to-end/reconcile-billing-cycle/) | Connecting monthly overview, tasks, accounts, reconciliation, settlement statements, and account adjustment. |
| User Billing | [User Billing](./user/billing/overview/) | Checking balance, quota, transactions, top-up orders, and monthly bills. |
| Provider Earnings | [Provider Earnings](./user/earnings/revenue/) | Checking revenue, customers, and settlements. |
| Customer Billing | [Customer Billing](./operator/customer-billing/customer-overview/) | Managing customer records, tags, top-up orders, business units, and payment channels. |
| Finance Operations | [Finance Operations](./operator/finance-operations/today-tasks/) | Handling Today Tasks, monthly overview, settlement statements, accounts, reconciliation, and account adjustment. |
| License | [License](./operator/license/license/) | Checking authorization type, quota, validity period, and activation status. |

#### Find an Entry by Goal

| Goal | Recommended Entry | Next Step |
| --- | --- | --- |
| View your balance, transactions, or top-ups | [User Billing](./user/billing/overview/) | Start with Account Overview, then open Transactions, Top-up Orders, or Monthly Bill. |
| Review customer accounts and business lines | [Customer Billing](./operator/customer-billing/customer-overview/) | Review Customer Overview, Top-up Orders, and Business Units. |
| Troubleshoot settlement or amount differences | [Finance Operations](./operator/finance-operations/today-tasks/) | Review Today's Tasks, Monthly Overview, Settlement Statements, Financial Accounts, and Reconciliation Center. |
| Manage authorization credits | [License](./operator/license/license/) | Distinguish authorization credits and validity from the billing account balance. |

## Main Operations

### Choose a Billing Entry

1. Choose a feature page by role and goal.
2. Verify the title, billing period, and object scope.
3. Continue with the Main Operations on that feature page.

![Billing](./operator/finance-operations/today-tasks/images/manual-billing-today-tasks-page.png)

The image shows the page entry or current state for this workflow step. Verify the page title, target record, and visible actions.

## Parameter Quick Reference

#### Scope Definitions

| Scope | Covered in this manual | Not determined on this page |
| --- | --- | --- |
| User Billing | Balance, quota, transactions, top-up orders, and monthly-bill entries. | Whether each consumption detail is correct. |
| Provider Earnings | Revenue overview, revenue account activity, settlements, and customer revenue entries. | Final settlement scope for a single customer. |
| Customer Billing | Customer records, top-up orders, business units, and payment-channel entries. | Whether funds have completed clearing. |
| Finance Operations | Today tasks, monthly overview, settlement statements, financial accounts, reconciliation, and account adjustment entries. | Business attribution for a single business order. |
| License | Authorization type, quota, validity period, and activation entry. | Customer balance, top-up, or settlement amount. |

#### Reading Parameters

| Field Name | Required | Field Type | Example | Description |
| --- | --- | --- | --- | --- |
| Issue Type | Yes | Enum | `Settlement reconciliation` | Determines whether to start from user billing, Provider earnings, customer billing, finance operations, or License. |
| Role | Yes | Enum | `Billing Operator` | Matches the accessible entry and recommended reading path. |
| Billing Cycle | Conditionally required | Month | `2026-07` | Must be aligned before comparing amounts, settlements, or transactions. |
| Tenant / Customer | Conditionally required | Text | `Desensitized tenant` | Limits customer, settlement statement, and account-transaction scope. |
| Next Entry | System generated | Link | `Finance Operations` | Points to the next page according to issue type. |

## Pitfalls

- Do not make amount conclusions on the entry page. Amount issues should be checked in Monthly Bill, Settlement List, Financial Accounts, or Transactions.
- User billing, Provider earnings, customer billing, finance operations, and License use different perspectives. Do not mix their statistics.
- Amounts and statuses may differ when billing cycle, tenant, customer, or business unit scope is inconsistent.
- Do not record real tenants, customer names, accounts, emails, amounts, order numbers, transaction numbers, License registration codes, activation codes, Token, or Key.

## Result Validation

| Check Item | Success Signal | If Abnormal |
| --- | --- | --- |
| Entry identified | The issue can be mapped to user billing, Provider earnings, customer billing, finance operations, or License. | Return to the role entry table and classify the issue again. |
| Paths available | Getting Started, the end-to-end workflow, and core module entries can be opened. | Check sidebar configuration and account menu permissions. |
| Scope separated | Balance, revenue, settlement, account transactions, and authorized quota are not mixed. | Open the specific feature page and align billing cycle, tenant, customer, and business unit. |
| Follow-up path clear | The reader can continue to Getting Started or the billing-cycle workflow. | Follow the recommended reading path. |

## FAQ

#### Which Billing entry should I start from?

**Symptom:**

You only know that "billing has a problem" but do not know whether to open user billing, customer billing, finance operations, or License.

**Possible cause:**

User balance, customer top-ups, Provider revenue, settlement reconciliation, and resource authorization are being handled as one issue.

**How to handle:**

Classify by keywords first. Balance, transactions, top-up orders, and monthly bills go to User Billing. Revenue, settlements, and customer revenue go to Provider Earnings. Customers, tags, top-ups, and business units go to Customer Billing. Billing cycle, settlement statements, account transactions, reconciliation, and adjustments go to Finance Operations. Quota, authorization, expiration, and activation go to License.

#### Balance, settlement statement, and monthly overview amounts do not match

**Symptom:**

Customer balance, settlement amount, monthly overview, or financial account balance differs.

**Possible cause:**

Different pages use different scopes, or billing cycle, tenant, or transaction type is inconsistent. Pending settlement, refund, adjustment, or reconciliation exception may also exist.

**How to handle:**

Align billing cycle and tenant first. Check Settlement List for statement status, Financial Accounts for account transactions, and Reconciliation Center for unmatched transfers, missing revenue details, or compensation queue items.

#### What is the relationship between License and billing?

**Symptom:**

When platform resources are unavailable, you are not sure whether to check billing balance or License status.

**Possible cause:**

Billing balance handles customer or platform financial issues, while License handles platform resource authorization and quota. They affect different parts of the system.

**How to handle:**

If the issue is top-up, deduction, settlement, or balance-related, use user billing, customer billing, or finance operations. If the issue is resource quota, restricted module, expired authorization, or activation, open License.


#### The Recommended Entry Is Not Available for the Current Role

**Symptom:**

The current account cannot see a Billing entry recommended on the Overview page.

**Possible causes:**

- The current role does not have permission for that menu.
- The tenant or business identity does not match the recommended reading role.

**How to handle:**

1. Confirm whether the current role is an End User, Provider, or Operator.
2. Use the entry that is actually visible in the left navigation.
3. If access is required, ask authorized personnel to review role and menu permissions.

#### What Scope Information Is Required Before Reconciliation?

**Symptom:**

You need to reconcile amounts but are not sure which conditions must be aligned first.

**Possible causes:**

- The billing cycle, tenant, customer, or business unit is not confirmed.
- Related pages use different statistical scopes.

**How to handle:**

1. Record the target billing cycle and business object.
2. Confirm the tenant, customer, business unit, account, and transaction type.
3. Use the same scope on every related page before comparing amounts and statuses.
## Notes

- This entry page is for path selection only. Amount conclusions must be verified in specific feature pages with aligned filters.
- User billing, Provider earnings, customer billing, finance operations, and License have different data scopes and permission boundaries.
- For billing-cycle workflows, use the end-to-end page to connect monthly overview, tasks, accounts, reconciliation, and settlement statements.
- Examples in this document are placeholders. External materials still require desensitization according to security requirements.

## Next Steps

- To build a quick global understanding, open [Billing Getting Started](./getting-started/).
- To complete a billing-cycle workflow, open [Reconcile and Settle a Billing Cycle](./end-to-end/reconcile-billing-cycle/).
- To check user-side balance, top-ups, or bills, open [Billing](./user/billing/overview/).
- To maintain customers and customer top-ups, open [Customer Billing](./operator/customer-billing/customer-overview/).
- To proceed with settlement and reconciliation, open [Finance Operations](./operator/finance-operations/today-tasks/).
- To confirm authorization and quota, open [License](./operator/license/license/).
