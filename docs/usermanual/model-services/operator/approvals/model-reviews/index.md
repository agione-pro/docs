# Model Reviews

## Preface

| Item | Content |
|------|---------|
| Target Audience | Operator |
| Navigation Path | Approvals > Model Reviews |
| Overview | Review model publishing applications submitted by users to ensure model quality and service compliance |

## Page Structure

### Search Area

The page top provides filter functionality, supporting filtering by review status and model type.

### Action Buttons

* Each model card provides a **"Details"** button for viewing complete information
* Each model card provides a **"Review"** button for executing review operations
* The page provides a **"Batch Review"** button for batch processing reviews

### Data List

The page displays all pending / reviewed model cards. Each card contains model name, type, free quota mode, customer, status, version, submission time, and other information.

### Page Screenshot

![Model Reviews](./images/model-reviews-list.png)

## Operations

### Viewing Model List

1. Enter the platform homepage, click the **"Approvals > Model Reviews"** menu in the left navigation bar to enter the model review management page.
2. The page displays all pending / reviewed model cards, containing model name, type, free quota mode, customer, status, version, submission time, and other information.

#### Parameters

| Term            | Type       | Example                                               | Description                                      |
| --------------- | ---------- | ----------------------------------------------------- | ------------------------------------------------ |
| Model Name      | Text       | `qwen-image-2.0 / Qwen3-235b-a22b`                    | The name of the model under review               |
| Model Type      | Tag        | `Image Model / Chat Model / Video Model / Multimodal` | The functional type of the model                 |
| Free Quota Mode | Text       | `Quota Mode / None`                                   | The free call quota configuration of the model   |
| Customer Name   | Text       | `DuShuangYan / AGIOneSystem`                          | The customer name who submitted the model        |
| Review Status   | Status Tag | `Pending / Approved / Rejected`                       | The current review status of the model           |
| Version         | Text       | `1.0.0`                                               | The submitted version number of the model        |
| Submission Time | Time       | `--`                                                  | The time when the model was submitted for review |
| Review Time     | Time       | `--`                                                  | The time when the model review was completed     |

## Other Operations

| Operation | Steps |
|-----------|-------|
| View Details | Click the target model card's **"Details"** button → View complete information including model info, configuration, test status, etc. |
| Individual Review | Click the target model card's **"Review"** button → View model info, configuration, tags in the review popup → Click "Approve" or "Reject" to complete the review |
| Batch Review | Click the "Batch Review" button, check multiple pending models → Click "Approve" or "Reject" to batch process reviews |

## Notes

* Review operations require caution. Ensure models comply with platform specifications before approval.
* When batch reviewing, carefully verify each model's information before executing.
* When rejecting a review, it is recommended to fill in the rejection reason so customers understand improvement directions.
