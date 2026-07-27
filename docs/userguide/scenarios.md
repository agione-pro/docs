---
prev: false
next: true
---

# Scenario Navigator

Scenario guides are organized around outcomes: what you want to accomplish. Choose the closest task or scenario, follow the reading order on its overview page, and open the linked user-manual pages when you need page-level field and button details.

| Role | Typical responsibilities |
| --- | --- |
| Platform Operator | Configure platform capabilities, onboard resources, assign access, process approvals, and review platform monitoring |
| Model Provider | Publish and maintain models, configure billing and rate limits, and review customer usage and model revenue |
| Platform User | Discover and try models, request quota, call APIs, and create development, training, or deployment workloads |

> If you are unsure which role applies, start with the [Role Comparison](../product/role-comparison), then use the role and subsystem filters below. Use each scenario's completion checklist to confirm that the task is actually finished.

<ScenarioGuide />

<style>
.agp-scenario-guide {
  --agp-nav-task: #2563eb;
  --agp-nav-path: #15803d;
  --agp-nav-scenes: #b45309;
}

.dark .agp-scenario-guide {
  --agp-nav-task: #60a5fa;
  --agp-nav-path: #4ade80;
  --agp-nav-scenes: #fbbf24;
}

.agp-scenario-guide > .agp-task-cloud,
.agp-scenario-guide > .agp-recommended {
  padding: 22px 22px 22px 26px;
  border: 0;
  border-left: 4px solid;
  border-radius: 0 6px 6px 0;
  background: var(--vp-c-bg-soft);
}

.agp-scenario-guide > .agp-task-cloud {
  border-left-color: var(--agp-nav-task);
  background: color-mix(in srgb, var(--agp-nav-task) 8%, var(--vp-c-bg));
}

.agp-scenario-guide > .agp-task-cloud .agp-task-cloud-title {
  color: var(--agp-nav-task);
}

.agp-scenario-guide > .agp-recommended {
  margin-top: 32px;
  border-left-color: var(--agp-nav-path);
  background: color-mix(in srgb, var(--agp-nav-path) 8%, var(--vp-c-bg));
}

.agp-scenario-guide > .agp-recommended .agp-section-kicker {
  color: var(--agp-nav-path);
}

.agp-scenario-guide > .agp-section-head {
  margin-top: 32px;
  margin-bottom: 0;
  padding: 22px 22px 10px 26px;
  border: 0;
  border-left: 4px solid var(--agp-nav-scenes);
  border-radius: 0 6px 0 0;
  background: color-mix(in srgb, var(--agp-nav-scenes) 8%, var(--vp-c-bg));
}

.agp-scenario-guide > .agp-section-head h2 {
  color: var(--agp-nav-scenes);
}

.agp-scenario-guide > .agp-section-head + .agp-filter-bar {
  padding: 6px 22px 22px 26px;
  border: 0;
  border-left: 4px solid var(--agp-nav-scenes);
  border-radius: 0 0 6px 0;
  background: color-mix(in srgb, var(--agp-nav-scenes) 8%, var(--vp-c-bg));
}

@media (max-width: 640px) {
  .agp-scenario-guide > .agp-task-cloud,
  .agp-scenario-guide > .agp-recommended {
    padding: 18px 16px 18px 20px;
  }

  .agp-scenario-guide > .agp-section-head {
    padding: 18px 16px 8px 20px;
  }

  .agp-scenario-guide > .agp-section-head + .agp-filter-bar {
    padding: 6px 16px 18px 20px;
  }
}
</style>
