# Getting Started

::: info Document Information
Version: v1.0
Updated: 2026-07-23
:::

## Feature Overview

| Item | Content |
| --- | --- |
| Applicable Roles | End User / Provider / Operator |
| Navigation Path | User Manual > Billing > Getting Started |
| Page Route | `/usermanual/billing/getting-started/` |
| Guidance Scope | Reading entries for user billing, Provider earnings, customer billing, finance operations, and License |

#### Beginner Explanation

Billing is like the financial service desk of the platform. End Users start with their own balance, top-ups, and bills. Providers check revenue and settlements. Operators check customer records, settlement statements, financial accounts, and reconciliation results. License admins confirm whether resource authorization is valid. Do not start from a random record; first decide whether the issue is about user balance, Provider revenue, customer top-up, billing-cycle settlement, or resource authorization.

#### Terms Quick Reference

| Term | Meaning | Common Entry |
| --- | --- | --- |
| Credits | Unit used to display balance, top-up, and consumption. | User Billing, Customer Overview |
| Billing Cycle | Time period used for consumption, top-up, revenue, settlement, and reconciliation. | Monthly Bill, Monthly Overview, Settlement List |
| Top-up Order | Processing record after a user or customer starts a top-up. | Top-up Orders, Customer Top-up Orders |
| Transaction | Record of every balance, income, expense, or adjustment change. | Transactions, Financial Accounts |
| Settlement Statement | Settlement record for a tenant and billing cycle. | Settlement List, Settlements |
| License | Authorization that controls platform modules, resource quota, and validity period. | License |

## Prerequisites

1. The current account has permission for the corresponding Billing menus.
2. The issue has been classified as user billing, Provider earnings, customer billing, finance operations, or License.
3. For amount reconciliation, align billing cycle, tenant, customer, business unit, and transaction type first.
4. Before settlement, adjustment, compensation, rebuild, or License activation, confirm approval basis and impact scope.
5. Before external communication or screenshots, desensitize accounts, tenants, transaction numbers, order numbers, amounts, and authorization information.

## Page Description

#### 30-second Quick Check

| Who you are | Read first | Next step |
| --- | --- | --- |
| End User | Confirm your own balance, transactions, top-up orders, and monthly bills. | Open [Billing](../user/billing/overview/). |
| Provider | Confirm revenue account balance, revenue account activity, settlements, and customer revenue. | Open [Earnings](../user/earnings/revenue/). |
| Platform Operator | Confirm customer records, customer top-ups, and business-unit ownership. | Open [Customer Billing](../operator/customer-billing/customer-overview/). |
| Billing Operator | Confirm billing cycle, monthly progress, settlement statements, and reconciliation status. | Open [Finance Operations](../operator/finance-operations/today-tasks/). |
| Finance Reviewer | Confirm account transactions, settlement statements, and reconciliation exceptions. | Open [Financial Accounts](../operator/finance-operations/financial-accounts/). |
| License Admin | Confirm authorization type, quota, validity period, and activation status. | Open [License](../operator/license/license/). |

#### Applicable Roles

| Role | Focus First | Recommended Entry |
| --- | --- | --- |
| End User | Own balance, transactions, top-up orders, and monthly bills. | [User Billing](../user/billing/overview/) |
| Provider | Revenue overview, revenue account activity, settlements, and customer revenue. | [Provider Earnings](../user/earnings/revenue/) |
| Operator | Customer records, customer top-up orders, business units, and payment channels. | [Customer Billing](../operator/customer-billing/customer-overview/) |
| Billing Operator | Today Tasks, monthly overview, settlement statements, financial accounts, and reconciliation. | [Finance Operations](../operator/finance-operations/today-tasks/) |
| Finance Reviewer | Account transactions, settlement statements, reconciliation exceptions, and adjustment records. | [Financial Accounts](../operator/finance-operations/financial-accounts/) |
| License Admin | Authorization type, quota, validity period, and activation status. | [License](../operator/license/license/) |

#### What Billing Is

Billing is the unified entry for balance, top-up, consumption, revenue, settlement, reconciliation, account adjustment, and License authorization. It does not replace business orders or external payment systems. Instead, it connects user-side bills, Provider earnings, operator-side financial processing, and authorization status.

#### User-side and Operator-side Boundaries

| Capability | User side | Operator side |
| --- | --- | --- |
| Balance and transactions | View data visible to the current account or tenant. | Reconcile by customer, tenant, business unit, and billing cycle. |
| Top-up orders | View own top-up records and statuses. | View customer top-up orders, payment channels, and processing status. |
| Monthly bills | View user-side billing-cycle summary. | Drive monthly overview, settlement statements, and financial account reconciliation. |
| Provider earnings | View revenue overview, settlements, and customer revenue. | Reconcile platform financial accounts, settlement statements, and reconciliation results. |
| Exception handling | Report balance, order, or bill exceptions. | Close issues through Reconciliation Center, compensation queue, and Account Adjustment. |
| License | Understand whether resources are available. | View authorized quota, validity period, and activation status. |

#### Recommended Reading Path

| Goal | Read first | Next step |
| --- | --- | --- |
| Understand Billing boundaries | [Billing Overview](../) | Continue with this Getting Started page. |
| Check own balance and top-ups | [Billing](../user/billing/overview/) | Open Overview, Transactions, or Top-up Orders. |
| Reconcile Provider revenue | [Earnings](../user/earnings/revenue/) | Open Revenue, Settlements, or Customers. |
| Handle customer top-up issues | [Customer Billing](../operator/customer-billing/customer-overview/) | Open Customer Overview, Customer Top-up Orders, or Business Units. |
| Drive billing-cycle settlement | [Finance Operations](../operator/finance-operations/today-tasks/) | Open Monthly Overview, Financial Accounts, Reconciliation Center, and Settlement List. |
| Complete a reconciliation workflow | [Reconcile and Settle a Billing Cycle](../end-to-end/reconcile-billing-cycle/) | Follow the workflow across tasks, accounts, reconciliation, and settlement statements. |
| Handle resource authorization | [License](../operator/license/license/) | Check authorized quota, validity period, and activation status. |

## Main Operations

### Choose a Billing Entry

1. Choose a feature page by role and goal.
2. Verify the title, billing period, and object scope.
3. Continue with the Main Operations on that feature page.

![Billing Getting Started](../operator/finance-operations/today-tasks/images/manual-billing-today-tasks-page.png)

The image shows the page entry or current state for this workflow step. Verify the page title, target record, and visible actions.

## Parameter Quick Reference

| Field Name | Required | Field Type | Example | Description |
| --- | --- | --- | --- | --- |
| Role | Yes | Enum | `End User` | Determines whether to read user-side pages, Provider earnings, operator-side pages, or License. |
| Issue Keyword | Yes | Text | `Balance mismatch` | Helps locate the recommended entry quickly. |
| Billing Cycle | Conditionally required | Month | `2026-07` | Must be confirmed before amount comparison. |
| Business Scope | Conditionally required | Text | `Desensitized business unit` | Prevents comparison across tenants, customers, or business units. |
| Recommended Entry | System generated | Link | `Billing` | Points to the next page according to role and issue type. |

## Pitfalls

- Getting Started helps choose a path; it does not replace field explanations or amount reconciliation in specific feature pages.
- When amounts do not match, align billing cycle, tenant, customer, business unit, and transaction type before comparing pages.
- A normal License only means the authorization path is available. It does not prove top-up, consumption, revenue, settlement, or account transactions are correct.
- Do not record real tenants, customer names, accounts, emails, amounts, order numbers, transaction numbers, License registration codes, activation codes, Token, or Key.

## Result Validation

| Check Item | Success Signal | If Abnormal |
| --- | --- | --- |
| Entry selected | The issue can be classified as user billing, Provider earnings, customer billing, finance operations, or License. | Return to the role table and classify again. |
| Billing cycle clear | The target billing cycle is confirmed before amount reconciliation. | Align the billing cycle before comparing data. |
| Pages accessible | Recommended entries open normally. | Check account permissions and menu scope. |
| Next step clear | A specific feature page can be selected according to issue type. | Continue with the recommended reading path. |

## FAQ

#### Should I start from user-side or operator-side Billing?

**Symptom:**

You know that billing data is questionable but do not know whether to open user-side or operator-side pages.

**Possible cause:**

User-side pages focus on the current account's visible balance, top-ups, and bills. Operator-side pages focus on customers, tenants, settlement statements, financial accounts, and exception handling.

**How to handle:**

If the issue comes from a user checking their own balance or top-up, start with [Billing](../user/billing/overview/). If you need to reconcile customers, tenants, settlement statements, financial accounts, or reconciliation exceptions, open [Finance Operations](../operator/finance-operations/today-tasks/) or [Customer Billing](../operator/customer-billing/customer-overview/).

#### Why do balance, transactions, and monthly bills not match?

**Symptom:**

Overview, Transactions, and Monthly Bill show different amounts.

**Possible cause:**

The pages use different scopes, or billing cycle, transaction time, account, project, or business unit filters are inconsistent. Synchronization delay may also exist.

**How to handle:**

Align billing cycle and filters first. Use Transactions to locate single balance changes, then use Monthly Bill to verify the billing-cycle summary. If the difference remains, operators should continue with Financial Accounts and Reconciliation Center.

#### What should I do if License is normal but Billing is still abnormal?

**Symptom:**

License is valid, but top-up, balance, settlement, or transaction data is still abnormal.

**Possible cause:**

License only describes resource authorization status. It does not prove that billing has completed settlement, posting, or reconciliation.

**How to handle:**

Use License for resource authorization issues. Use user billing, customer billing, or finance operations for amount, top-up, transaction, and settlement issues. Do not use License status as a substitute for billing reconciliation.


#### The Recommended Entry Is Not Available

**Symptom:**

The selected page does not appear in the left navigation.

**Possible causes:**

- The current role does not have permission for that module.
- The selected entry belongs to another business identity.

**How to handle:**

1. Confirm the current role and issue object again.
2. Choose the equivalent entry visible to the current role.
3. If cross-role handling is required, ask authorized personnel to review role and menu permissions.

#### Can High-risk Actions Be Performed from Getting Started?

**Symptom:**

The recommended entry is known, but it is unclear whether top-up, settlement, adjustment, or activation can proceed directly.

**Possible causes:**

- Getting Started only selects a path and does not provide business approval evidence.
- High-risk actions still require object, status, and impact checks on the feature page.

**How to handle:**

1. Open the corresponding feature page.
2. Read its prerequisites, operation steps, and notes.
3. Confirm permission, approval evidence, and impact scope before following the business process.
## Notes

- Getting Started only helps choose a path. It does not replace field descriptions, operation steps, or approval requirements in specific feature pages.
- User billing, Provider earnings, customer billing, finance operations, and License use different perspectives, data scopes, and permissions.
- For top-up, settlement, adjustment, compensation, rebuild, or authorization changes, open the corresponding feature page and confirm status and processing records.

## Next Steps

- For user self-service balance, top-ups, and bills, open [Billing](../user/billing/overview/).
- For Provider revenue and settlement, open [Earnings](../user/earnings/revenue/).
- For customer and top-up reconciliation, open [Customer Billing](../operator/customer-billing/customer-overview/).
- For settlement, reconciliation, and account adjustment, open [Finance Operations](../operator/finance-operations/today-tasks/).
- For a complete billing-cycle workflow, open [Reconcile and Settle a Billing Cycle](../end-to-end/reconcile-billing-cycle/).
- For resource authorization, open [License](../operator/license/license/).
