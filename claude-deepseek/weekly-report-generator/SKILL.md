---
name: weekly-report-generator
description: Generate a structured weekly report in Markdown from Git history. Use when the user mentions "weekly report", "周报", "git weekly", "工作周报", "weekly summary", "本周总结", or wants to summarize this week's work. Also use when the user asks to "summarize my week", "what did I do this week", or wants a report of recent git activity.
---

# Weekly Report Generator

Generate a structured weekly work report in Markdown by scanning the current Git repository's commit history and TODO changes from Monday 00:00 to the current moment.

## Prerequisites

- The working directory must be inside a Git repository
- The `git` CLI must be available

## Workflow

### Step 1: Determine the date range

Calculate the following values using `date` or bash built-ins:

- **MONDAY**: Monday of the current week at 00:00. On Windows (Git Bash), use:
  ```bash
  TODAY=$(date +%Y-%m-%d)
  DAY_OF_WEEK=$(date +%u)  # 1=Monday, 7=Sunday
  DAYS_SINCE_MONDAY=$((DAY_OF_WEEK - 1))
  MONDAY=$(date -d "$TODAY - $DAYS_SINCE_MONDAY days" +%Y-%m-%d)
  ```

- **NOW**: Current date and time:
  ```bash
  NOW=$(date "+%Y-%m-%d %H:%M:%S")
  ```

- **WEEK_RANGE**: Human-readable label for the report title, e.g. "2026-06-15 ~ 2026-06-20".

### Step 2: Collect Git commits

Run the following to collect all commits from Monday to now across all branches:

```bash
git log --since="$MONDAY 00:00:00" --until="$NOW" \
  --format="%h|%ad|%an|%s" \
  --date=short \
  --all \
  --no-merges
```

Parse the pipe-delimited output into these fields: short hash, date, author, subject.

If no commits are found, the report should state "No commits this week" in the summary section — do not generate an empty report.

### Step 3: Collect repository statistics

Get the overall diff stats for the week:

```bash
# Total lines added/deleted across the week
git log --since="$MONDAY 00:00:00" --until="$NOW" \
  --all --no-merges --shortstat | \
  awk '/files? changed/ {files+=$1; inserted+=$4; deleted+=$6} \
  END {printf "%d|%d|%d", files, inserted, deleted}'
```

Get the most-changed files:

```bash
git log --since="$MONDAY 00:00:00" --until="$NOW" \
  --all --no-merges --pretty=format: --name-only | \
  sort | uniq -c | sort -rn | head -10
```

### Step 4: Collect TODO / FIXME / HACK changes

Scan for TODO-related comment changes during the week. These indicate pending work, technical debt, or resolved issues.

Search for additions and deletions of lines containing `TODO`, `FIXME`, or `HACK` (case-insensitive):

```bash
git log --since="$MONDAY 00:00:00" --until="$NOW" \
  --all --no-merges \
  -p -S"TODO" -- "*.ts" "*.tsx" "*.js" "*.jsx" "*.py" "*.java" "*.go" "*.rs" "*.c" "*.cpp" "*.h" "*.cs" "*.rb" "*.php" "*.swift" "*.kt" "*.scala" "*.md" \
  | grep -E "^[+-].*(TODO|FIXME|HACK)" \
  | sort | uniq -c | sort -rn | head -30
```

Also check for `FIXME` and `HACK` separately:

```bash
git log --since="$MONDAY 00:00:00" --until="$NOW" \
  --all --no-merges \
  -p -S"FIXME" -- "*.ts" "*.tsx" "*.js" "*.jsx" "*.py" "*.java" "*.go" "*.rs" "*.c" "*.cpp" "*.h" "*.cs" "*.rb" "*.php" "*.swift" "*.kt" "*.scala" "*.md" \
  | grep -E "^[+-].*(FIXME)" \
  | sort | uniq -c | sort -rn | head -20
```

```bash
git log --since="$MONDAY 00:00:00" --until="$NOW" \
  --all --no-merges \
  -p -S"HACK" -- "*.ts" "*.tsx" "*.js" "*.jsx" "*.py" "*.java" "*.go" "*.rs" "*.c" "*.cpp" "*.h" "*.cs" "*.rb" "*.php" "*.swift" "*.kt" "*.scala" "*.md" \
  | grep -E "^[+-].*(HACK)" \
  | sort | uniq -c | sort -rn | head -20
```

Classify each TODO/FIXME/HACK entry:
- `+` prefix → **新增** (added this week)
- `-` prefix → **已解决** (resolved/removed this week)

### Step 5: Analyze and structure

Before writing the report, mentally summarize:

- **Key themes**: Group commits by topic — what areas of the codebase saw the most activity? Are there patterns?
- **Authors**: Who contributed what? If multiple authors, note the breakdown.
- **TODO trends**: Are more TODOs being added than resolved? This signals accumulating technical debt.

### Step 6: Generate the report

Create `reports/` directory if it doesn't exist, then write the report to `reports/weekly-YYYY-MM-DD.md` where `YYYY-MM-DD` is today's date.

Use the template in [references/template.md](references/template.md) as the output structure. The template is the single source of truth for the report format — follow it exactly, filling in all sections with the data collected above.

After writing the report, print a brief summary to the user:
- Path of the generated report
- Commit count and author count
- TODO/FIXME added vs resolved counts
