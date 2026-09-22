# obsidian-modified

Displays notes created or modified within a given period as two collapsed callouts
(`Created` / `Modified`).

## Block syntax

````markdown
```modified
period:    day            # "day", "week", or "month" (required)
date:      2026-09-22     # YYYY-MM-DD or "today"; falls back to frontmatter then filename
title:     Today's notes  # overrides the settings default
limit:     25             # max entries per callout; empty = all
showtitle: false          # hide the title heading for this block
```
````

Minimal usage:

````markdown
```modified
period: day
```
````

## Settings

| Setting | Default | Description |
| --- | --- | --- |
| Show title | on | Show the heading above the callouts by default |
| Default title (day) | `Today's notes` | Heading for `period: day` |
| Default title (week) | `This week's notes` | Heading for `period: week` |
| Default title (month) | `This month's notes` | Heading for `period: month` |
| Default limit | *(all)* | Max entries per callout; empty means no limit |

## Date resolution

The anchor date (which period to show) is resolved in this order:

1. `date` block config (`YYYY-MM-DD` or `"today"`)
2. `created` frontmatter of the context note
3. `date` frontmatter of the context note
4. Filename parsed as `YYYY-MM-DD`, `YYYY-Www`, or `YYYY-MM`
5. Error card

## Per-file timestamps

**Created date** (determines the Created callout):

1. `created` frontmatter
2. `file.stat.ctime`

**Modified date** (determines the Modified callout):

1. `updated` frontmatter
2. `file.stat.mtime`

Accepted frontmatter formats: `YYYY-MM-DD`, `YYYY-MM-DD HH:mm`, `YYYY-MM-DDTHH:mm:ss`,
`YYYY-MM-DDTHH:mm:ss+HH:mm`.

A file appears in **Created** if its created date falls within the period. It appears in
**Modified** if its modified date falls within the period but its created date does not.

## Note display

Each entry shows a resolved display title, tried in this order:

1. `name` frontmatter
2. `title` frontmatter
3. First entry of `aliases` frontmatter
4. Raw filename (without extension)

When a callout is truncated by `limit`, a *… and N more* placeholder appears at the bottom.

## Excluded folders

Always excluded from results: `.obsidian`, `templates`.

## Deploy

```sh
ln -s ~/obsidian/.obsidian/plugins/obsidian-modified dist
npm run build
```
