# Model Sources

::: info Document Information
Version: v1.0
Updated: 2026-09-07
:::

## Feature Overview

| Item | Content |
| --- | --- |
| Applicable role | Operator Admin |
| Navigation path | **Model Services** > **Settings** > **Model Sources** |
| Page route | `/modelone/settings/vendor` |
| Managed objects | Model Source names, identifiers, Regions, Base URLs, Request headers, and authentication settings |

#### Beginner Explanation

A Model Source stores the address and authentication settings for an upstream model service.
A Meta-model describes what a model can do.
A Model Source describes where the platform calls the service and how the platform authenticates.

#### Glossary

| Term | Description |
| --- | --- |
| Model Source | A record that stores an upstream service address and Request header settings. |
| Region | A service location with its own Base URL. |
| Base URL | The root address used before an API Endpoint path. |
| Endpoint | The path for one API operation. It is usually added after the Base URL. |
| API Key endpoint | The address used to obtain or manage API Keys. It is not the model call Endpoint. |
| Request header | An authentication or custom header that the platform sends to the upstream service. |

#### Beginner Quick Choice

| Case | Do First | Avoid |
| --- | --- | --- |
| First connection to an upstream service | Add the Model Source. Enter the approved upstream address. | Creating a model template first |
| A template requires a Region | Enter the Region identifier, Region name, and Base URL. | Entering only the Model Source name |
| The upstream service requires authentication | Check the default header. Enter the approved value. | Putting API Keys in docs or tickets |
| Template or published-model references are unclear | Open **"Details"** and confirm known references | Deleting the Model Source |

## Prerequisites

1. Confirm that the current account has permission to maintain Model Sources.
2. Get the Region, address, and Request header requirements from the upstream service owner.
3. Confirm network, certificate, and allowlist requirements with the responsible teams.
4. Prepare an approved method to enter or reference credentials.
5. Before an edit or deletion, identify the templates and published models that use the Model Source.

## Page Description

Use this page to manage the complete lifecycle of an upstream Model Source. Each page state has a different responsibility:

| Page State | Responsibility | Leave the State After |
| --- | --- | --- |
| List | Locate a source and review its name, identifier, Region, Base URL, creation time, and available actions. | The target row and intended operation are confirmed. |
| Add form | Create the source, Region, address, and Request header configuration. | Required values have been compared with the approved upstream configuration. |
| Details | Read the saved basic information, Region information, and Headers Preview. | The saved values and target record are confirmed. |
| Edit form | Maintain approved values while keeping the source identifier unchanged. | The changed fields and impact scope have been rechecked. |
| Delete dialog | Confirm a high-risk removal after downstream references are checked. | The target and approval are confirmed, or the operation is cancelled. |

Page screenshot:

![Model Source list](./images/model-source-list-public.png)

The row-end **"..."** opens **"Details"** and **"Delete"**. Use the list and details page together to confirm the target before editing or deleting it. Do not include real credentials in documentation screenshots.

## Main Operations

<!-- main-operation-title-exceptions: Create,Configure,Filter,Edit -->

Follow the object lifecycle: create the Model Source, configure its Endpoints, locate the target row by status and modality, then use the read-only details view or the configuration page.

### Create a Model Source

#### Applicable Scenarios

- Connect an upstream model service for the first time and register it in the Model Source Directory.
- Create the source before adding the Endpoint that carries its call address.

#### Steps

1. Go to **Model Services** > **Settings** > **Model Sources**.
2. Click **"Create Model Source"** at the top right to open the **"Create Model Source"** dialog.
3. Enter the unique identifier of the upstream service in `Model Source Code`. The dialog shows `For example, unified_model_source`.
4. Select the **"简体中文"** tab under `Model Source Display Name` and enter the name for that language.
5. Switch to the **"English"** and **"Español"** tabs and enter the name for each language.
6. Check the entered values and click **"Create and Configure Endpoints"**.
7. To close the dialog without creating the source, click **"Cancel"** or the **"×"** at the top right.

The dialog has only `Model Source Code` and `Model Source Display Name`. The primary button reads **"Create and Configure Endpoints"**, not a confirm label.

![Create Model Source](./images/model-source-add-public.png)

#### Result Validation

- Search the directory for the code you entered. The target row shows the new source name.
- Open **"Details"**. `Model Source Code` equals the value you entered.
- The `Total model sources` card changes with the new record.

#### Notes

- `Model Source Code` and all three language tabs carry a required mark.
- A Model Source holds no call address. The address belongs to an Endpoint.
- The page states that the backend enables the source after the first endpoint is saved.

### Configure a Model Source Endpoint

#### Applicable Scenarios

- Register a call address and its protocol capabilities so that downstream flows can select the source.
- Add another Endpoint when one source needs several addresses or region tags.

#### Steps

1. Click **"Configure"** on the target row to open the configuration page of the Model Source.
2. Click **"Add Endpoint"** in the `Endpoint Management` section.
3. Enter `Endpoint Display Name` in `Endpoint Information`, and switch language tabs when required.
4. Enter a region tag in `Region Tag`. The field shows `For example, global or cn-east`.
5. Turn on the **"Official Endpoint"** switch when the address is operated by the model provider.
6. Enter the required `Base URL` in `Connection URLs`. Click **"Insert {workspace}"** when calls need dynamic workspace routing.
7. Enter `Console URL` and `Documentation URL` when these links apply.
8. Click **"Select and Add Protocols"** in `Protocol Configuration` and choose the protocols of this Endpoint.
9. Click **"Save Endpoint"** to submit. To leave without saving, click **"Cancel"** or **"Exit Editor"**.

The **"Add Endpoint"** drawer has three sections: `Endpoint Information`, `Connection URLs`, and `Protocol Configuration`. The `Base URL` row carries the **"Insert {workspace}"** button.

![Add Endpoint](./images/model-source-add-endpoint-public.png)

#### Result Validation

- A new card appears in `Endpoint Management`. The card title shows the region and the corner badge shows the entered region tag.
- The card shows the same `Base URL`, `Console URL`, and `Documentation URL` values, and the number after `Protocol Configuration` equals the protocol rows.
- The notice above the cards reads "This source has 1 endpoints. The backend enables the source after the first endpoint is saved." The count changes with the saved Endpoints.

#### Notes

- The card footer offers `Details`, `Edit`, `Copy`, and `Delete` for one Endpoint. Only the read-only drawer opened from the row-level **Details** was captured this round; the screens after `Edit`, `Copy`, and `Delete` were not, so verify the target card first.
- The section states that endpoints are saved independently and can be added, edited, copied, or deleted down to zero.
- Request headers and other call parameters are configured per protocol, not in this drawer.
- The gateway replaces the `{workspace}` placeholder with the bound workspace identifier when it sends the call.

### Filter Model Sources

#### Applicable Scenarios

- Locate one row when the directory holds many Model Sources.
- Confirm which Model Source owns a given Base URL.

#### Steps

1. Go to **Model Services** > **Settings** > **Model Sources**.
2. Enter a source name, code, Endpoint name, or Base URL in the search box, then click the search icon.
3. Select `All statuses`, `Enabled`, or `Disabled` in the `Status` group.
4. Select `All modalities`, `Text`, `Image`, `Video`, `Audio`, `Embedding`, `Rerank`, or `Multimodal` in the `Modality` group.

The top of the page shows the `Total model sources`, `Enabled`, and `Disabled` cards, followed by the status and modality filter groups.

![Model Source filters](./images/model-source-filter-public.png)

#### Result Validation

- The list shows the columns `MODEL SOURCE NAME`, `CODE`, `ENDPOINT AND BASE URL`, `PROTOCOL CAPABILITIES`, `STATUS`, and `ACTIONS`.
- Each row shows an endpoint count under the name, and a row with several endpoints offers `View all 2 endpoints`.
- The protocol column shows protocol pills with a modality tag, `No protocols configured`, or a `+9` overflow badge.

#### Notes

- The summary card counts disabled sources, but every visible row in this screenshot reads `Enabled`.
- The actions column contains only **"Configure"** and **"Details"**.

### View Model Source Details

#### Applicable Scenarios

- Check the code, endpoint count, and protocol configuration without entering edit mode.
- Confirm the target record before maintenance.

#### Steps

1. Click **"Details"** on the target row.
2. Check `Model Source Code`, `Endpoint Count`, and the status badge in `Model Source Information`.
3. Inspect each card such as `Endpoint #1` in the `Endpoint Management` section.
4. Check the region name, the region tag, the read-only Base URL field, and the `Console URL` and `Documentation URL` links of each card.
5. Collapse or expand `Protocol Configuration` and check each protocol name, path, and modality tag.
6. Click **"Go to Edit"** when a change is required, or click **"Close"** or the **"×"** at the top right.

The drawer subtitle reads "Read-only source, endpoint, and protocol inspection". The footer contains only **"Close"** and **"Go to Edit"**.

![View Model Source Details](./images/model-source-details-public.png)

#### Result Validation

- The drawer shows no save button, and the Base URL appears in a read-only field.
- `Endpoint Count` equals the counter at the top right of `Endpoint Management`.

#### Notes

- `Console URL` and `Documentation URL` are external links. Check the query parameters before you share a screenshot.
- The drawer is read-only. A change still needs **"Save Model Source"** on the configuration page.

### Edit a Model Source

#### Applicable Scenarios

- Change the display name shown in lists and selectors.
- Maintain the Endpoints and protocol configuration of the source.

#### Steps

1. Click **"Configure"** on the target row.
2. Check the read-only `Model Source Code` in `Model Source Information` and keep its value.
3. Switch the language tabs of `Model Source Display Name` and change the name of each language.
4. To maintain a call address, add or change an Endpoint as described in Configure a Model Source Endpoint.
5. Click **"Save Model Source"** to submit the source-level change.
6. Click **"Back to Directory"** and confirm that the target row shows the new value.

The page header shows the source name and its status badge. The top-right buttons are **"Back to Directory"** and **"Save Model Source"**.

![Edit a Model Source](./images/model-source-edit-public.png)

#### Result Validation

- After you return to the directory, the row shows the new name and the expected endpoint count.
- Reopen **"Details"** and confirm that `Model Source Code` is unchanged.

#### Notes

- `Model Source Code` is read-only on the configuration page and carries a copy icon.
- Source-level and endpoint-level saves are independent. The name change takes effect only after **"Save Model Source"**.

## Parameter Quick Reference

The table separates form requirements from downstream requirements.
A field can be optional in this form but required by a template or upstream service.

| Field name | Form requirement | Downstream requirement | Field type | Example | Description |
| --- | --- | --- | --- | --- | --- |
| English Name | Required | Required for every Model Source | Multilingual text | `Example Source` | Lists and selectors show this English name. |
| Chinese Name | Optional | Chinese UI display | Multilingual text | `Example Source` | The Chinese interface shows this name. |
| Model source identifier | Required | All Model Sources | Text | `example-source` | Enter a unique value. Read-only on edit. |
| Region identifier | Optional | Templates with a Region | Text | `example-region` | Enter with Region name and Base URL. |
| Region name | Optional | Required when the template uses a Region | Multilingual text | `Example Region` | The Region selector shows this name. |
| Base URL | Optional | Region call to upstream | URL | `https://api.example.com` | Root address. Add operation paths downstream. |
| API Key endpoint | Optional | API Key management | URL | `https://api.example.com/keys` | Key link. Not a model call Endpoint. |
| API documentation URL | Optional | Documentation link | URL | `https://api.example.com/docs` | Upstream documentation address. |
| Auth field name | Optional | Upstream Request header auth | Text | `Authorization` | Default field: `Authorization`. |
| Auth value | Optional | Upstream authentication | Text | `Bearer <API_KEY>` | Default format: `Bearer <key>`. Use the approved secret method. |
| Headers Preview | System-generated | Configured Request headers | JSON preview | `{"Authorization":"Bearer <API_KEY>"}` | Generated from configured headers. Compare with the upstream specification. |

## Pitfalls

- Do not enter an operation Endpoint in `Base URL` unless the upstream specification requires it.
- When a template requires a Region, enter the Region identifier, Region name, and Base URL as one complete set.
- Match the Request header field name, prefix, and value format to the upstream specification.
- After an address or header change, reopen **"Details"** and compare the displayed values with the approved configuration.
- Before deletion, confirm known template and published-model references. The confirmation dialog does not show dependency details.

## Result Validation

| Check item | Observable result | If the result is absent |
| --- | --- | --- |
| New Model Source | List shows the expected name and identifier. | Clear filters. Refresh. Check the message after **"Confirm"**. |
| Details | The details page shows the expected fields. | Verify the identifier. Reopen **"Details"**. |
| Headers Preview | The preview shows the expected names and values. | Compare the headers with the upstream specification. |
| Edit | The list or details page shows the new values. | Check the message. Submit the approved change again. |
| Template provider selection | `Select Provider` shows the target source. | Reopen the selector. Check the name, identifier, and Operator Admin permission. |
| Template Region selection | `Select Region` shows the configured Region. | Stop the flow. Complete Region fields in Model Sources. |
| Delete dialog | The dialog shows **"Cancel"** and **"OK"**. | Close the dialog. Verify the target row. |
| Deleted Model Source | Search does not show the identifier. | Record errors or a remaining row. Do not assume completion. |

## FAQ

#### Cannot Find the Model Source After Adding It

**Symptom:**

The list does not show the new name or identifier.

**Possible causes:**

- Search fields hide the record.
- The form shows a validation message.
- The submission did not complete.

**Handling:**

1. Clear the search fields and refresh the list.
2. Search for the exact `Model source identifier`.
3. Check the message shown after **"Confirm"**.

#### Details Do Not Match the Approved Configuration

**Symptom:**

The details page shows an unexpected Region, address, or Request header structure.

**Possible causes:**

- You opened a different row.
- An edit was not submitted.
- You entered the approved value in a different field.

**Handling:**

1. Return to the list and verify the identifier.
2. Open **"Details"** again.
3. Compare each visible field with the approved configuration.

#### Headers Preview Does Not Match the Upstream Specification

**Symptom:**

`Headers Preview` shows an unexpected field name, prefix, or value format.

**Possible causes:**

- `Auth field name` is incorrect.
- `Auth value` has an incorrect prefix or placeholder format.
- Multiple Request headers use an incorrect combination.

**Handling:**

1. Compare the fields with the upstream API specification.
2. Edit only the approved Request header values.
3. Reopen **"Details"** and check `Headers Preview`.

#### Model Templates Do Not Show the Model Source

**Symptom:**

`Select Provider` does not show the target Model Source.

**Possible causes:**

- The selector search does not match the source name.
- The Region fields are incomplete for a template that requires a Region.
- The current Operator Admin account cannot use the required record.

**Handling:**

1. Go to **Model Services** > **Settings** > **Model Templates**.
2. Select the target source in the `Model Source` list.
3. Click **"Add"**.
4. In `Provider Information`, reopen `Select Provider`.
5. If **"Select Region"** requires a value, complete the Region fields.

#### Downstream Call Fails

**Symptom:**

The template can select the Model Source, but a downstream validation call fails.

**Possible causes:**

- Base URL or Endpoint is incorrect.
- Request header authentication is incomplete or invalid.
- Network, certificate, rate limit, or upstream service policy blocks the call.

**Handling:**

1. Model Source setup ends when you select the source in the template or publishing flow.
2. Use the error shown in the downstream call flow to continue troubleshooting.
3. See [Publish Models](/userguide/scenarios/publish-model/) for the call procedure.

#### Deletion Does Not Complete

**Symptom:**

The confirmation dialog remains open, an error appears, or the refreshed list still shows the Model Source.

**Possible causes:**

- The deletion request did not complete.
- The current account does not have the required permission.
- The service rejected the deletion for a reason that is not shown before confirmation.

**Handling:**

1. Record the visible error message.
2. Search for the identifier after a refresh.
3. Confirm known template and published-model use with the responsible owner.
4. Do not repeat the deletion until the cause is understood.

## Notes

- A Model Source visible in the list is not proof that the upstream service is callable.
- Keep real authentication values in the approved secret-entry system.

## Next Steps

Use the [Model Templates](../model-templates/) manual for the next page.

**When the Model Source has a Region**

1. As an Operator Admin, go to **Model Services** > **Settings** > **Model Templates**.
2. Select the target source in the `Model Source` list.
3. Click **"Add"**.
4. In `Provider Information`, select the source from **"Select Provider"**.
5. Select the configured Region from **"Select Region"**.
6. Continue only after both selectors show the expected values.

**When the Model Source has no Region**

1. Open `Provider Information` and check **"Select Provider"**.
2. If the source appears, check the state of **"Select Region"**.
3. If the page requires **"Select Region"** or shows no option, stop the template flow.
4. Continue without a Region only after the template owner confirms that this flow supports it.
5. If the flow is not approved, return to Model Sources and add a complete Region configuration.

After the template and publishing steps, follow [Publish Models](/userguide/scenarios/publish-model/) for call validation.
Call validation is outside the Model Sources page. Use the response or error shown by that flow.
