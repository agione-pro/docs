# AGIOne Documentation Agent Rules

## Scope

These rules apply to this documentation repository.

Before modifying any file in this repository, read:

1. `README.md` for the current repository structure, commands, and content rules.
2. `GUIDE.md` for VitePress maintenance, navigation, configuration, deployment, and user-guide scenario conventions.

Before modifying either user-manual tree, also read
`USER_MANUAL_PAGE_STRUCTURE_GUIDE.md` completely:

- `docs/usermanual/`
- `docs/zh-CN/usermanual/`

For user-manual work, `USER_MANUAL_PAGE_STRUCTURE_GUIDE.md` is the canonical
source for page structure, content boundaries, bilingual alignment,
screenshots, masking, and acceptance requirements. If a general example in
`GUIDE.md` conflicts with the user-manual guide, follow the user-manual guide.

## User Manual Requirements

1. Preserve the established five-subsystem, role-group, and visible-menu hierarchy.
2. Change directories, sidebars, page ownership, or menu order only after verifying the affected role's visible left menu in the current AGIOne system.
3. Do not treat an internal route, configuration entry, or source-code path as proof that a user-visible manual page should exist.
4. Preserve the ten-section page structure defined in `USER_MANUAL_PAGE_STRUCTURE_GUIDE.md`.
5. Update the corresponding Chinese and English pages together.
6. Keep feature scope, operation order, parameter meaning, risk boundaries, and screenshot coverage aligned between languages.
7. Use light-theme screenshots.
8. Place each screenshot next to the page area or operation that it supports.
9. Include a corresponding screenshot for a critical visual transition when text alone cannot reliably locate it, including a new page, dialog, form, tab, detail view, or final confirmation.
10. Do not use screenshots as a substitute for executable written steps.
11. Use Gaussian blur only for actual Key values and telephone-number values.
12. Do not mask names, amounts, order numbers, status values, field labels, buttons, borders, or adjacent content.
13. Do not invent fields, operations, permissions, states, workflows, or menu entries that have not been verified in the current product.

## Navigation And Content

1. Keep English and Chinese paths and navigation entries aligned.
2. Maintain sidebars in `docs/.vitepress/theme/sidebar/en.ts` and `docs/.vitepress/theme/sidebar/zh.ts`.
3. Treat `docs/.vitepress/theme/navbar/en.ts` and `zh.ts` as the Preview navigation files.
4. For production navigation, update the applicable `*.main.ts` and `*.global.main.ts` templates as described in `GUIDE.md`.
5. Preserve the language-specific AGIOne URL rules documented in `README.md` and `GUIDE.md`.
6. Do not commit secrets, credentials, tokens, cookies, private keys, internal customer data, or real API keys.

## Required Workflow

Before editing user-manual content:

1. Inspect the Chinese page, English page, their screenshots, and nearby pages that use the same content pattern.
2. Check the current live UI when the requested change depends on current menu visibility, fields, behavior, permissions, or visual appearance.
3. Keep unrelated existing worktree changes intact.

After editing:

1. Check Chinese and English page correspondence.
2. Check modified image references, file existence, and filename casing.
3. Confirm screenshots use the light theme and serve the adjacent operation.
4. Confirm sensitive values follow the masking rules in `USER_MANUAL_PAGE_STRUCTURE_GUIDE.md`.
5. Run `npm run check:docs-profile`.
6. Run `npm run docs:build`.
7. Review the final Git diff and exclude unrelated files from the change.

Do not report the task as complete if a required check fails. If a check cannot
run because of the environment, state exactly what was not verified and why.
