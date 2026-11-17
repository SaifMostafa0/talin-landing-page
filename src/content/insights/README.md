# Repository articles

Articles are normally published by the Talin team in Sanity Studio. Use this folder only to add an article from the repository, or to replace a Sanity article that needs fixing.

Each article is one Markdown file named after its slug, for example `the-cost-centre-trap.md`:

```md
---
title: The Cost Centre Trap
summary: One line shown on the article card and under the title.
topic: technology-strategy
date: 2026-12-01
---

Opening paragraph.

## Section heading

Body text with **bold**, _italic_ and [links](https://example.com).
```

- `topic` must be one of: `technology-strategy`, `data-strategy`, `applied-ai`, `change-enablement`.
- `date` uses `YYYY-MM-DD`. Articles are listed newest first.
- If a file has the same slug as a Sanity article, the file wins.
- A file with missing or invalid fields fails the build, so the mistake is caught before it goes live.
- This README is ignored.
