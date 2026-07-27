# Billing Getting Started

::: info Document Information
Version: v1.0
Updated: 2026-07-23
:::

## 30-second Quick Check

| Who you are | Read first | Next step |
| --- | --- | --- |
| Regular user | Confirm your own balance, transactions, top-up orders, and monthly bills. | Open [Billing](../user/billing/overview/). |
| Provider | Confirm revenue account balance, revenue account activity, settlements, and customer revenue. | Open [Earnings](../user/earnings/revenue/). |
| Platform operator | Confirm customer records, customer top-ups, and business-unit ownership. | Open [Customer Billing](../operator/customer-billing/customer-overview/). |
| Billing operator | Confirm billing cycle, monthly progress, settlement statements, and reconciliation status. | Open [Finance Operations](../operator/finance-operations/today-tasks/). |
| Finance reviewer | Confirm account transactions, settlement statements, and reconciliation exceptions. | Open [Financial Accounts](../operator/finance-operations/financial-accounts/). |
| License admin | Confirm authorization type, quota, validity period, and activation status. | Open [License](../operator/license/license/). |

## Feature Overview

Billing Getting Started helps different roles choose the correct Billing reading path. It connects user balances, top-ups, transactions, monthly bills, Provider earnings, customer billing, finance operations, reconciliation, account adjustment, and License management. Use it to choose the entry first, then open the specific page for fields and operation boundaries.

| Item | Content |
| --- | --- |
| Applicable role | Regular user, Provider, platform operator, billing operator, finance reviewer, License admin |
| Navigation path | Billing > Getting Started |
| Page route | `/usermanual/billing/getting-started/` |
| Managed objects | Billing roles, object hierarchy, reading path, and operation boundaries |
| Typical use | Choose the correct Billing entry before checking balances, top-ups, revenue, settlement, reconciliation, or License |

#### Beginner Explanation

Billing is like the financial service desk of the platform. Regular users start with their own balance, top-ups, and bills. Providers check revenue and settlements. Operators check customer records, settlement statements, financial accounts, and reconciliation results. License admins confirm whether resource authorization is valid. Do not start from a random record; first decide whether the issue is about user balance, Provider revenue, customer top-up, billing-cycle settlement, or resource authorization.

## Applicable Roles

| Role | Focus first | Recommended entry |
| --- | --- | --- |
| Regular user | Own balance, transactions, top-up orders, and monthly bills. | [Billing](../user/billing/overview/) |
| Provider | Revenue overview, revenue account activity, settlements, and customer revenue. | [Earnings](../user/earnings/revenue/) |
| Platform operator | Customer records, customer top-up orders, business units, and payment channels. | [Customer Billing](../operator/customer-billing/customer-overview/) |
| Billing operator | Today tasks, monthly overview, settlement statements, financial accounts, and reconciliation. | [Finance Operations](../operator/finance-operations/today-tasks/) |
| Finance reviewer | Account transactions, settlement statements, reconciliation exceptions, and adjustment records. | [Financial Accounts](../operator/finance-operations/financial-accounts/) |
| License admin | Authorization type, quota, validity period, and activation status. | [License](../operator/license/license/) |

## What Billing Is

Billing is the unified entry for balance, top-up, consumption, revenue, settlement, reconciliation, account adjustment, and License authorization. It does not replace business orders or external payment systems. Instead, it connects user-side bills, Provider earnings, operator-side financial processing, and authorization status.

## Role Relationships

| Role | Main responsibility | Common entry |
| --- | --- | --- |
| Regular user | View own balance, transactions, top-up orders, and monthly bills. | [Billing](../user/billing/overview/) |
| Provider | View revenue, settlements, and customer revenue. | [Earnings](../user/earnings/revenue/) |
| Platform operator | Maintain customer billing objects, top-up orders, and business units. | [Customer Billing](../operator/customer-billing/customer-overview/) |
| Billing operator | Drive monthly settlement, reconciliation, and account adjustment. | [Finance Operations](../operator/finance-operations/today-tasks/) |
| Finance reviewer | Reconcile account transactions, settlement statements, and exceptions. | [Financial Accounts](../operator/finance-operations/financial-accounts/) |
| License admin | View authorized quota, validity period, and activation status. | [License](../operator/license/license/) |

## Billing Object Hierarchy

| Layer | Description | Impact |
| --- | --- | --- |
| Organization / Customer | Main subject for billing statistics and settlement. | Affects balances, bills, revenue, settlement, and reconciliation scope. |
| Business Unit | Business ownership under a customer or organization. | Affects top-up, consumption, and statistical split. |
| Billing Cycle | Time period used to aggregate billing data. | Affects monthly bills, monthly overview, settlement statements, and revenue statistics. |
| Transaction / Order | Single top-up, consumption, adjustment, or transaction record. | Affects balance changes and exception tracing. |
| Account / Settlement Statement | Finance-side account, reconciliation, and settlement object. | Affects fund verification and settlement closure. |
| License | Platform resource authorization object. | Affects modules, quota, and validity period. |

## User-side and Operator-side Boundaries

| Capability | User side | Operator side |
| --- | --- | --- |
| Balance and transactions | View data visible to the current account or organization. | Reconcile by customer, organization, business unit, and billing cycle. |
| Top-up orders | View own top-up records and statuses. | View customer top-up orders, payment channels, and processing status. |
| Monthly bills | View user-side billing-cycle summary. | Drive monthly overview, settlement statements, and financial account reconciliation. |
| Provider earnings | View revenue overview, settlements, and customer revenue. | Reconcile platform financial accounts, settlement statements, and reconciliation results. |
| Exception handling | Report balance, order, or bill exceptions. | Close issues through Reconciliation Center, compensation queue, and Account Adjustment. |
| License | Understand whether resources are available. | View authorized quota, validity period, and activation status. |

#### Terms Quick Reference

| Term | Beginner meaning | Common entry |
| --- | --- | --- |
| Credits | Unit used to display balance, top-up, and consumption. | User Billing, Customer Overview |
| Billing Cycle | Time period used for consumption, top-up, revenue, settlement, and reconciliation. | Monthly Bill, Monthly Overview, Settlement List |
| Top-up Order | Processing record after a user or customer starts a top-up. | Top-up Orders, Customer Top-up Orders |
| Transaction | Record of every balance, income, expense, or adjustment change. | Transactions, Financial Accounts |
| Settlement Statement | Settlement record for an organization and billing cycle. | Settlement List, Settlements |
| Reconciliation | Entry for checking billing data exceptions. | Reconciliation Center |
| Account Adjustment | Approved correction for abnormal billing data. | Account Adjustment |
| License | Authorization that controls platform modules, resource quota, and validity period. | License |

## Usage Prerequisites

1. The current account has permission for the corresponding Billing menus.
2. The issue has been classified as user billing, Provider earnings, customer billing, finance operations, or License.
3. For amount reconciliation, align billing cycle, organization, customer, business unit, and transaction type first.
4. Before settlement, adjustment, compensation, rebuild, or License activation, confirm approval basis and impact scope.
5. Before external communication or screenshots, desensitize accounts, organizations, transaction numbers, order numbers, amounts, and authorization information.

## Parameter Reference

| Field Name | Required | Field Type | Example | Description |
| --- | --- | --- | --- | --- |
| Role | Yes | Enum | `Regular user` | Determines whether to read user-side pages, Provider earnings, operator-side pages, or License. |
| Issue Keyword | Yes | Text | `Balance mismatch` | Helps locate the recommended entry quickly. |
| Billing Cycle | Conditionally required | Month | `2026-07` | Must be confirmed before amount comparison. |
| Business Scope | Conditionally required | Text | `Desensitized business unit` | Prevents comparison across organizations, customers, or business units. |
| Recommended Entry | System generated | Link | `Billing` | Points to the next page according to role and issue type. |

## Result Validation

| Check Item | Success Signal | If Abnormal |
| --- | --- | --- |
| Entry selected | The issue can be classified as user billing, Provider earnings, customer billing, finance operations, or License. | Return to the role table and classify again. |
| Billing cycle clear | The target billing cycle is confirmed before amount reconciliation. | Align the billing cycle before comparing data. |
| Pages accessible | Recommended entries open normally. | Check account permissions and menu scope. |
| Next step clear | A specific feature page can be selected according to issue type. | Continue with the recommended reading path. |

## Pitfalls

- Getting Started helps choose a path; it does not replace field explanations or amount reconciliation in specific feature pages.
- When amounts do not match, align billing cycle, organization, customer, business unit, and transaction type before comparing pages.
- A normal License only means the authorization path is available. It does not prove top-up, consumption, revenue, settlement, or account transactions are correct.
- Do not record real organizations, customer names, accounts, emails, amounts, order numbers, transaction numbers, License registration codes, activation codes, Token, or Key.

## Recommended Reading Path

| Goal | Read first | Next step |
| --- | --- | --- |
| Understand Billing boundaries | [Billing Overview](../) | Continue with this Getting Started page. |
| Check own balance and top-ups | [Billing](../user/billing/overview/) | Open Overview, Transactions, or Top-up Orders. |
| Reconcile Provider revenue | [Earnings](../user/earnings/revenue/) | Open Revenue, Settlements, or Customers. |
| Handle customer top-up issues | [Customer Billing](../operator/customer-billing/customer-overview/) | Open Customer Overview, Customer Top-up Orders, or Business Units. |
| Drive billing-cycle settlement | [Finance Operations](../operator/finance-operations/today-tasks/) | Open Monthly Overview, Financial Accounts, Reconciliation Center, and Settlement List. |
| Complete a reconciliation workflow | [Reconcile and Settle a Billing Cycle](../end-to-end/reconcile-billing-cycle/) | Follow the workflow across tasks, accounts, reconciliation, and settlement statements. |
| Handle resource authorization | [License](../operator/license/license/) | Check authorized quota, validity period, and activation status. |

1. Start from [Billing Overview](../) to understand user billing, Provider earnings, customer billing, finance operations, and License boundaries.
2. Regular users open [Billing](../user/billing/overview/) and read Overview, Transactions, Top-up Orders, and Monthly Bill.
3. Providers open [Earnings](../user/earnings/revenue/) and read Revenue, Settlements, and Customers.
4. Operators read [Customer Billing](../operator/customer-billing/customer-overview/) and [Finance Operations](../operator/finance-operations/today-tasks/) before opening specific feature pages.
5. For a complete billing cycle, read [Reconcile and Settle a Billing Cycle](../end-to-end/reconcile-billing-cycle/).
6. If the symptom is resource unavailable, authorization expired, or quota insufficient, open [License](../operator/license/license/).

## FAQ

#### Should I start from user-side or operator-side Billing?

**Symptom:**

You know that billing data is questionable but do not know whether to open user-side or operator-side pages.

**Possible cause:**

User-side pages focus on the current account's visible balance, top-ups, and bills. Operator-side pages focus on customers, organizations, settlement statements, financial accounts, and exception handling.

**How to handle:**

If the issue comes from a user checking their own balance or top-up, start with [Billing](../user/billing/overview/). If you need to reconcile customers, organizations, settlement statements, financial accounts, or reconciliation exceptions, open [Finance Operations](../operator/finance-operations/today-tasks/) or [Customer Billing](../operator/customer-billing/customer-overview/).

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

## Next Steps

- For user self-service balance, top-ups, and bills, open [Billing](../user/billing/overview/).
- For Provider revenue and settlement, open [Earnings](../user/earnings/revenue/).
- For customer and top-up reconciliation, open [Customer Billing](../operator/customer-billing/customer-overview/).
- For settlement, reconciliation, and account adjustment, open [Finance Operations](../operator/finance-operations/today-tasks/).
- For a complete billing-cycle workflow, open [Reconcile and Settle a Billing Cycle](../end-to-end/reconcile-billing-cycle/).
- For resource authorization, open [License](../operator/license/license/).

## Notes

- Getting Started only helps choose a path. It does not replace field descriptions, operation steps, or approval requirements in specific feature pages.
- User billing, Provider earnings, customer billing, finance operations, and License use different perspectives, data scopes, and permissions.
- For top-up, settlement, adjustment, compensation, rebuild, or authorization changes, open the corresponding feature page and confirm status and processing records.
