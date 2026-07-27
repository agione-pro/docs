---
prev: false
next: true
---

# Purchase & Activation

::: info Document Information
Version: v1.0
Updated: 2026-07-15
:::

## Overview

This section describes AGIOne purchase, recharge, and License activation workflows. It covers online payment activation and activation by Activation Code.

Online payment activation focuses on validating the payment channel, end-user credits recharge, and customer top-up record review. Activation Code activation focuses on obtaining an `Activation Code` from a `Registration Code` and activating the `AI Infra License` on the `License Management` page.

## When To Use

- You are enabling Stripe or Alipay online recharge for the first time.
- You need to validate the end-user credits recharge workflow.
- Online License activation is unavailable and an Activation Code is required.
- A License has expired, capacity has been expanded, or the deployment needs to be authorized again.
- You need to review payment records, credits arrival, License status, validity, and quota.

## Documents

| Document | When to use | Core workflow |
| --- | --- | --- |
| [Online Payment Activation](./online-payment-activation) | Configure Stripe or Alipay and validate the end-user credits recharge workflow. | Configure the payment channel, test the connection, save the configuration, recharge credits as an end user, and review customer top-up records as a platform administrator. |
| [Activation Code License Activation](./activation-code-activation) | Obtain an Activation Code from a Registration Code and activate the AI Infra License. | Open License Management, copy the Registration Code, obtain an Activation Code, activate the License, and verify the authorization result. |

## Recommended Reading

1. To validate online recharge and customer top-up records, read [Online Payment Activation](./online-payment-activation).
2. To activate a License with a Registration Code, read [Activation Code License Activation](./activation-code-activation).
3. If both payment and authorization are involved, validate the payment channel and recharge workflow first, then activate the License and verify the authorization result.

::: warning Security Reminder
Do not write login credentials, payment secrets, Registration Codes, Activation Codes, or payment credentials in documents, screenshots, tickets, or chats. Actions such as `Save`, `Recharge`, and `Activate` affect configuration, billing, or authorization status. Confirm the current environment, account, amount, and target deployment before proceeding.
:::
