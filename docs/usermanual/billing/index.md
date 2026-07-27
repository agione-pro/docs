# Billing

::: info Document Information
Version: v1.0
Updated: 2026-07-23
:::

## Subsystem Positioning

Billing is the entry page for AGIOne billing, charging, settlement, reconciliation, and License management. It covers user billing, Provider earnings, customer billing, finance operations, and License. Operators, billing operators, finance reviewers, Providers, and regular users can use this page to choose the correct entry before reviewing balances, top-up orders, monthly bills, customer records, monthly settlement progress, settlement statements, financial accounts, reconciliation checks, and License authorization.

#### Beginner Explanation

Billing works like the financial control room for AGIOne. User billing helps regular users check balances, transactions, top-ups, and monthly bills. Customer billing handles customer identity, tags, top-up sources, and business units. Finance operations handles settlement, financial accounts, and reconciliation status. License handles resource authorization, validity period, and quota. Start by classifying the issue before opening a specific statement or record.

## Core Terms Quick Reference

| Term | Meaning | Common location |
| --- | --- | --- |
| Billing Cycle | The time period used for billing statistics and settlement, usually viewed by month. | Monthly Bill, Monthly Overview, Settlement List, Reconciliation Center |
| Credits | The unit used for balance, top-up, or billing display in the platform. | Overview, Customer Overview, Top-up Orders, user bills |
| Top-up Order | A processing record created after a user or customer starts a top-up. | Top-up Orders, Customer Top-up Orders |
| Transaction | A record for balance, income, expense, or adjustment changes. | Transactions, Financial Accounts |
| Settlement Statement | A settlement record for an organization and billing cycle. | Settlement List, Settlements |
| Clearing Account | An account used to aggregate or reconcile transaction funds. | Financial Accounts |
| Revenue Account | An account related to platform or Provider revenue. | Financial Accounts, Revenue |
| Compensation Queue | Billing tasks that require retry, compensation, or manual handling. | Reconciliation Center |
| Account Adjustment | A financial correction after approval. | Account Adjustment |
| License | Authorization that controls platform modules, resource quota, and validity period. | License |

## Role Entry Points

| Role | What to read first | Next step |
| --- | --- | --- |
| Regular user | [Billing](./user/billing/overview/) | Check balance, transactions, top-up orders, quota governance, and monthly bills. |
| Provider | [Earnings](./user/earnings/revenue/) | Check revenue overview, settlements, and customer revenue. |
| Platform operator | [Customer Billing](./operator/customer-billing/customer-overview/) | Verify customers, business units, and customer top-up orders before checking finance status. |
| Billing operator | [Finance Operations](./operator/finance-operations/today-tasks/) | Start from Today Tasks and Monthly Overview, then proceed by billing cycle. |
| Finance reviewer | [Financial Accounts](./operator/finance-operations/financial-accounts/) | Compare account transactions, settlement statements, and reconciliation results. |
| License admin | [License](./operator/license/license/) | Check authorized quota, validity period, and activation status. |

## Where to Start

| Module | Entry | Best for |
| --- | --- | --- |
| Getting Started | [Billing Getting Started](./getting-started/) | First-time reading and path selection. |
| End-to-end workflow | [Reconcile and Settle a Billing Cycle](./end-to-end/reconcile-billing-cycle/) | Connecting monthly overview, tasks, accounts, reconciliation, settlement statements, and adjustments. |
| User Billing | [Billing](./user/billing/overview/) | Regular users checking balances, quotas, transactions, top-up orders, and monthly bills. |
| Provider Earnings | [Earnings](./user/earnings/revenue/) | Providers checking revenue overview, settlements, and customer revenue. |
| Customer Billing | [Customer Billing](./operator/customer-billing/customer-overview/) | Customer records, customer tags, customer top-up orders, business units, and payment-channel configuration. |
| Finance Operations | [Finance Operations](./operator/finance-operations/today-tasks/) | Today tasks, monthly overview, settlement statements, financial accounts, reconciliation center, and account adjustment. |
| License | [License](./operator/license/license/) | Platform authorization, resource license, quota composition, validity period, and activation status. |

## Recommended Reading Path

1. For first-time reading, start from this page to understand user billing, Provider earnings, customer billing, finance operations, and License boundaries.
2. To build a quick global understanding, continue with [Billing Getting Started](./getting-started/).
3. For user-side balance, top-up, or bill issues, open [Billing](./user/billing/overview/).
4. For Provider revenue, open [Revenue](./user/earnings/revenue/), then review settlements or customers as needed.
5. For customer-related issues, open [Customer Billing](./operator/customer-billing/customer-overview/), then check Customer Overview, Customer Top-up Orders, or Business Units.
6. For settlement and reconciliation issues, open [Finance Operations](./operator/finance-operations/today-tasks/), start with Today Tasks and Monthly Overview, then continue to Settlement List, Financial Accounts, or Reconciliation Center.
7. For a complete billing-cycle workflow, read [Reconcile and Settle a Billing Cycle](./end-to-end/reconcile-billing-cycle/).
8. For authorization and quota issues, open [License](./operator/license/license/) and confirm license type, remaining quota, and validity period.
9. In operation records or tickets, keep only desensitized billing cycle, statement status, conclusion, and next action.

## Usage Prerequisites

1. The current account has permission to access billing-related menus.
2. The issue has been classified as user billing, Provider earnings, customer billing, finance operations, or License.
3. For amount reconciliation, billing cycle, organization, customer, business unit, account, and transaction type have been aligned.
4. Before settlement generation, account adjustment, compensation, rebuild, or License activation, approval basis, billing cycle, organization, and impact scope have been confirmed.
5. Amounts, organizations, accounts, emails, transaction numbers, order numbers, and License information have been desensitized before external communication.

## Parameter Reference

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
| Role | Yes | Enum | `Billing operator` | Matches the accessible entry and recommended reading path. |
| Billing Cycle | Conditionally required | Month | `2026-07` | Must be aligned before comparing amounts, settlements, or transactions. |
| Organization / Customer | Conditionally required | Text | `Desensitized organization` | Limits customer, settlement statement, and account-transaction scope. |
| Next Entry | System generated | Link | `Finance Operations` | Points to the next page according to issue type. |

## Result Validation

| Check Item | Success Signal | If Abnormal |
| --- | --- | --- |
| Entry identified | The issue can be mapped to user billing, Provider earnings, customer billing, finance operations, or License. | Return to the role entry table and classify the issue again. |
| Paths available | Getting Started, the end-to-end workflow, and core module entries can be opened. | Check sidebar configuration and account menu permissions. |
| Scope separated | Balance, revenue, settlement, account transactions, and authorized quota are not mixed. | Open the specific feature page and align billing cycle, organization, customer, and business unit. |
| Follow-up path clear | The reader can continue to Getting Started or the billing-cycle workflow. | Follow the recommended reading path. |

## Pitfalls

- Do not make amount conclusions on the entry page. Amount issues should be checked in Monthly Bill, Settlement List, Financial Accounts, or Transactions.
- User billing, Provider earnings, customer billing, finance operations, and License use different perspectives. Do not mix their statistics.
- Amounts and statuses may differ when billing cycle, organization, customer, or business unit scope is inconsistent.
- Do not record real organizations, customer names, accounts, emails, amounts, order numbers, transaction numbers, License registration codes, activation codes, Token, or Key.

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

Different pages use different scopes, or billing cycle, organization, or transaction type is inconsistent. Pending settlement, refund, adjustment, or reconciliation exception may also exist.

**How to handle:**

Align billing cycle and organization first. Check Settlement List for statement status, Financial Accounts for account transactions, and Reconciliation Center for unmatched transfers, missing revenue details, or compensation queue items.

#### What is the relationship between License and billing?

**Symptom:**

When platform resources are unavailable, you are not sure whether to check billing balance or License status.

**Possible cause:**

Billing balance handles customer or platform financial issues, while License handles platform resource authorization and quota. They affect different parts of the system.

**How to handle:**

If the issue is top-up, deduction, settlement, or balance-related, use user billing, customer billing, or finance operations. If the issue is resource quota, restricted module, expired authorization, or activation, open License.

## Next Steps

- To build a quick global understanding, open [Billing Getting Started](./getting-started/).
- To complete a billing-cycle workflow, open [Reconcile and Settle a Billing Cycle](./end-to-end/reconcile-billing-cycle/).
- To check user-side balance, top-ups, or bills, open [Billing](./user/billing/overview/).
- To maintain customers and customer top-ups, open [Customer Billing](./operator/customer-billing/customer-overview/).
- To proceed with settlement and reconciliation, open [Finance Operations](./operator/finance-operations/today-tasks/).
- To confirm authorization and quota, open [License](./operator/license/license/).

## Notes

- This entry page is for path selection only. Amount conclusions must be verified in specific feature pages with aligned filters.
- User billing, Provider earnings, customer billing, finance operations, and License have different data scopes and permission boundaries.
- For billing-cycle workflows, use the end-to-end page to connect monthly overview, tasks, accounts, reconciliation, and settlement statements.
- Examples in this document are placeholders. External materials still require desensitization according to security requirements.
