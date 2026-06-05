# App Reviews

## Preface

| Item            | Content                                                                                                    |
| --------------- | ---------------------------------------------------------------------------------------------------------- |
| Target Audience | Operator                                                                                                   |
| Navigation Path | Approvals > App Reviews                                                                                    |
| Overview        | Review application publishing applications submitted by users to ensure application quality and compliance |

## Page Structure

### Search Area

The page top provides filter functionality, supporting filtering by review status and category.

### Action Buttons

* Each application card provides a **"Details"** button for viewing complete information
* Each application card provides a **"Review"** button for executing review operations
* Each approved application card provides an **"Edit Tag"** button
* The page provides a **"Batch Review"** button for batch processing reviews

### Data List

The page displays all pending / reviewed application cards. Each card contains application name, category, customer, review status, version, submission time, and other information.

### Page Screenshot

![Model Reviews](./images/app-reviews-list.png)

## Operations

### Viewing Application List

1. Enter the platform homepage, click the **"Approvals > App Reviews"** menu in the left navigation bar to enter the application review management page.
2. The page displays all pending / reviewed application cards, containing application name, category, customer, review status, version, submission time, and other information.

#### Parameters

| Term             | Type       | Example                                | Description                                            |
| ---------------- | ---------- | -------------------------------------- | ------------------------------------------------------ |
| Application Name | Text       | `Test App / OnePro-HyperBDR-AI`        | The name of the application under review               |
| Category         | Tag        | `Marketing Copy / Agent & Interaction` | The functional classification tag of the application   |
| Customer         | Text       | `liao1 / lixipeng`                     | The customer name who submitted the application        |
| Review Status    | Status Tag | `Pending / Approved / Rejected`        | The current review status of the application           |
| Version          | Text       | `1.0.0 / 1.0.12`                       | The submitted version number of the application        |
| Submission Time  | Time       | `2026-02-04 11:34:47`                  | The time when the application was submitted for review |
| Review Time      | Time       | `2026-02-11 10:52:27`                  | The time when the application review was completed     |

## Other Operations

| Operation | Steps |
|-----------|-------|
| View Details | Click the target application card's **"Details"** button → View complete information including application info, configuration, test status, etc. |
| Individual Review | Click the target application card's **"Review"** button → View application info, configuration, tags in the review popup → Click "Approve" or "Reject" to complete the review |
| Batch Review | Click the "Batch Review" button, check multiple pending applications → Click "Approve" or "Reject" to batch process reviews |
| Edit Tag | Click an approved application card's **"Edit Tag"** button → Select tag (None / Hot / Recommended / Newest) → Click "Confirm" to save |

## Notes

* Review operations require caution. Ensure applications comply with platform specifications before approval.
* When batch reviewing, carefully verify each applications information before executing.
* When rejecting a review, it is recommended to fill in the rejection reason so customers understand improvement directions.
