# Weekly Report Template

This is the exact template for the generated weekly report. Follow this structure, replacing placeholders (identified by `{{...}}`) with collected data.

---

# {{WEEK_RANGE}} 周报

> 自动生成于 {{GENERATED_AT}} | 仓库: {{REPO_NAME}}

---

## 📊 概览

| 指标 | 数值 |
|------|------|
| 提交次数 | **{{COMMIT_COUNT}}** |
| 贡献者 | **{{AUTHOR_COUNT}}** 人 |
| 涉及文件 | **{{FILE_COUNT}}** 个 |
| 新增行数 | **+{{LINES_ADDED}}** |
| 删除行数 | **-{{LINES_DELETED}}** |
| 新增 TODO/FIXME | **{{TODO_ADDED}}** |
| 已解决 TODO/FIXME | **{{TODO_RESOLVED}}** |

---

## 📝 提交记录

### 按日期分组

{{COMMITS_BY_DATE}}

Format for each day group:
```
### {{DATE}} ({{COUNT}} commits)

| Hash | Author | Message |
|------|--------|---------|
| `abc1234` | liucc17 | feat: add user auth module |
| `def5678` | liucc17 | fix: resolve login redirect bug |
```

### 按主题分类

Group commits into 2-4 key themes based on the commit messages. Use judgment to categorize — for example, commits about authentication, API endpoints, user management all go under "用户模块". If a commit fits multiple themes, pick the best one.

```
#### 🏗️ 新功能 ({{COUNT}})
- `abc1234` feat: add user auth module
- ...

#### 🐛 修复 ({{COUNT}})
- `def5678` fix: resolve login redirect bug
- ...

#### 🔧 重构 / 优化 ({{COUNT}})
- ...

#### 📚 文档 / 杂项 ({{COUNT}})
- ...
```

If a commit doesn't clearly fit any category, place it in a **📌 其他** group.

---

## 📋 TODO / FIXME 变更

### 新增 ({{TODO_ADDED}})

List each new TODO/FIXME/HACK with its file location and content:

```
- **`src/auth/login.ts:42`** — `// TODO: add rate limiting for failed login attempts`
- **`src/api/handler.go:108`** — `// FIXME: handle timeout edge case when upstream is down`
```

If no new TODOs were added, write: `本周无新增 TODO。`

### 已解决 ({{TODO_RESOLVED}})

List each resolved/removed TODO/FIXME/HACK:

```
- **`src/utils/format.ts:15`** — `// TODO: support i18n date formatting` ✅ 已实现
- **`src/db/connection.ts:88`** — `// FIXME: connection pool leak under high load` ✅ 已修复
```

If no TODOs were resolved, write: `本周无已解决 TODO。`

---

## 🔥 高频变更文件 (Top 10)

| 变更次数 | 文件路径 |
|----------|----------|
| {{COUNT}} | `src/{{FILE_PATH}}` |

---

## 📌 下周计划

> 此区域为手动填写模板，请根据本周进展补充。

- [ ] 待补充
- [ ] 待补充
- [ ] 待补充

---

## 📎 备注

- 统计范围: `{{MONDAY}} 00:00` ~ `{{NOW}}`
- 分支: `--all`（所有本地分支）
- 合并提交: 已排除
- 提交作者: {{AUTHOR_LIST}}
