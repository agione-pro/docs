---
prev: false
next: true
---

# 场景导航

场景指南按“我要完成什么”组织内容。先选择与你目标最接近的任务或场景，再按场景概览中的顺序完成各功能文档；需要了解页面字段和按钮时，进入文档内链接的操作手册。

| 角色 | 适合处理的任务 |
| --- | --- |
| 平台运营方 | 配置平台能力、纳管资源、分配权限、处理审批和查看平台级监控 |
| 模型提供方 | 发布和维护模型、配置计费与限流、查看客户调用和模型收益 |
| 平台用户 | 查找和体验模型、申请配额、调用 API，以及创建开发、训练或部署任务 |

> 不确定角色时，先查看[角色对比总览](../product/role-comparison)，再使用下方的角色和子系统筛选。每个场景的“完成检查”用于确认任务是否真正完成。

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
