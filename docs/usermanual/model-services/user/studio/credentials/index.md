# My Credentials

## 1. Feature Overview

| Item | Content |
| --- | --- |
| Applies to | Model Provider |
| Navigation | **Model Services** > **Studio** > **My Credentials** |
| Route | `/modelone/credentials` |
| Managed objects | Model source credentials, Endpoint bindings, linked models, and revisions |

**New to this page**: My Credentials manages the credentials a publisher uses to connect upstream model sources. Each credential binds to a model source and active Endpoint and shows how many models reference it; rename or rotate credentials here.

## 2. Prerequisites

1. Your account has access to **Studio > My Credentials**.
2. The target model source and Endpoint are confirmed.
3. The upstream API key is ready before creating a credential.

## 3. Page Description

The page title is `My Credentials`, with the description `Manage model source credentials, active Endpoint bindings and current model references.` and **Refresh** / **Access Credential** on the right.

Filters include the search box `Search credential name or description`, a model source selector (`All model sources`), a status selector (`Enabled`), **Search**, and **Reset**.

Columns are `Name / Description`, `Model source`, `Status`, `Active bindings`, `Current models`, `Callable models`, `Revision / Last rotation`, `Creator`, `Updated`, and `Actions`. Row actions provide **View**, **Edit**, and more.

![My Credentials list](./images/credentials-list.png)

**Figure note**: Columns are `Name / Description`, `Model source`, `Status`, `Active bindings`, `Current models`, `Callable models`, `Revision / Last rotation`, `Creator`, `Updated`, and `Actions`. Example rows show `Enabled`, `1` active binding, and `0 models`.

## 4. Main Operations

### 4.1 Access a credential

1. Click **Access Credential** to open the three-step wizard.
2. In `1 Select Model Source`, choose the model source.
3. Click **Next**, then choose the active Endpoint in `2 Select Endpoints & Workspace`.
4. In `3 Credential information & API Key`, enter the credential details and API key.
5. Verify the model source, Endpoint, and credential name before submitting.

### 4.2 View credential details

1. Click **View** on the target row.
2. In `Credential details`, check `Credential display name`, `Model source`, `Rev.`, and `Description`.
3. Under `Bound Endpoints & network configuration`, check `1 active / 1 total Endpoints bound` and the Endpoint address.
4. Click **Close** when finished.

### 4.3 Edit credential metadata

1. Click **Edit** on the target row.
2. In `Edit Credential metadata`, change `Credential display name` or `Description`.
3. Click **Save metadata**; use **Close** to leave without saving.

### 4.4 Filter credentials

1. Enter a credential name or description in the search box.
2. Select a model source and status.
3. Click **Search** or **Reset**.

## 5. Parameter Quick Reference

| Field | Required | Type | Example | Description |
| --- | --- | --- | --- | --- |
| Credential display name | Yes | Text, 1–128 chars | `test66744` | Must be unique within the tenant and model source after trimming |
| Description | No | Text | `Text chat test credential` | Identifies the credential purpose |
| Model source | Yes | Selector | `AGIOne` | Upstream model source |
| Endpoint | Yes | Selector | `China` | Active Endpoint bound to the credential |
| API Key | Yes | Secret | — | Upstream key, not displayed after saving |
| Status | System | Tag | `Enabled` | Current availability |
| Active bindings | System | Number | `1` | Number of active Endpoint bindings |
| Current models | System | Number | `0 models` | Models that reference the credential |
| Callable models | System | Number | `0` | Models currently callable |
| Revision / Last rotation | System | Version | `Rev.1` / `Initial creation, not rotated` | Credential revision history |
| Creator | System | Text | `provider_admin` | Account that created the credential |
| Updated | System | Time | `2026-10-26 14:38:43` | Last update time |

## 6. Pitfalls

- The credential display name must be unique within the same tenant and model source; duplicates are rejected.
- `1 active / 1 total Endpoints bound` means only one Endpoint is bound; confirm model calls before changing the binding.
- `Current models: 0 models` does not mean the credential is unusable; it means no model references it yet.
- The API key is entered only during creation or rotation and is not displayed in full afterwards.

## 7. Result Validation

| Check | What you can see |
| --- | --- |
| Credential created | A new row appears with status `Enabled` |
| Binding applied | `Active bindings` shows the binding count |
| Linked models updated | `Current models` shows the number of referencing models |
| Metadata saved | The name or description updates in the list |
| Revision info | `Revision / Last rotation` shows the `Rev.` and rotation note |

## 8. FAQ

#### The credential name cannot be saved

**Symptom**: Clicking **Save metadata** does not save the name.

**Resolution**:

1. Check that the name is 1–128 characters after trimming and not empty.
2. Confirm no credential with the same name exists under the model source.

#### The target credential is missing

**Symptom**: Search returns no result.

**Resolution**: Clear the search and check the model source and status filters.

## 9. Notes

- API keys are sensitive; do not screenshot them, copy them into documents, or send them to external tools.
- Changing bindings or rotating keys affects models that use the credential; confirm the impact first.
- Before changing a binding or rotating a credential, confirm the models and calls that depend on it.

## 10. Next Steps

- Bind the credential in [My Models](../my-models/).
- Verify model availability in [Models](../../discover/models/).
- Check calls in [My Calls](../../my-calls/overview/).
