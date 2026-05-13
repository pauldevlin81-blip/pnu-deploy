# PNU Infrastructure Diagnosis — 13 May 2026

**Generated:** 13 May 2026, ~17:00 BST
**Context:** Earlier today (~15:30 BST) a "lean V1" LP was deployed over the proper full 10 May LP. This report diagnoses the current state and proposes restoration.

---

## 1. What's in the backup

**File:** `~/pnu-deploy/archive/pip-answer-bank-HOLDING-PAGE-2026-05-09-to-2026-05-13.html`
**Size:** 18,020 bytes / 477 lines
**Created:** 13 May 2026 15:50 BST

**Contents inspection:** Full 10-section PNU PIP Answer Bank LP. Starts with `<title>PIP Answer Bank — How to write your PIP form when "I cope" isn't true</title>`. Contains CSS variables (`--navy`, `--amber`, `--teal`), hero section, trust strip, full LP structure.

**VERDICT: This is the proper 10 May full LP rebuild — NOT a holding page.** The filename is misleading. The file we backed up was the correct production LP that had been live since Sunday 10 May. This file is the only local copy of the correct LP. **Do not delete it.**

For comparison:
- The actual 9 May holding page was 1,333 bytes (commit `fca2465`) — a stub with "Page Being Rebuilt" title
- This backup is 18,020 bytes — a full multi-section LP matching the final 10 May polish (commit `44166fc`)

---

## 2. Git history table

| Commit | Date | Message | File size | Nature |
|--------|------|---------|-----------|--------|
| `da58edb` | 2026-05-13 | Rebuild PNU PIP Answer Bank LP — E&W content, DWP framing, replaces holding page | 14,807 bytes | **Today's mistake** — lean V1 from Downloads, overwrote the proper LP |
| `bafeb11` | 2026-05-11 | Add CLAUDE.md — session routing + brand rules | (no change to LP) | — |
| `a64f7db` | 2026-05-10 | PNU repo — purge NIBN-branded archive file | (no change to LP) | — |
| `44166fc` | 2026-05-10 | PNU LP — trust strip iOS chrome clearance | 18,020 bytes | **Final polished 10 May LP** — this is the correct version |
| `af7ebf0` | 2026-05-10 | PNU LP — mobile trust strip + hero polish | 18,010 bytes | Intermediate 10 May polish |
| `0c8ffe3` | 2026-05-10 | PNU PIP AB landing page — Sunday 10 May rebuild | 17,659 bytes | Initial 10 May rebuild |
| `fca2465` | 2026-05-09 | Replace misbranded NIBN landing page with PNU holding page | 1,333 bytes | The actual 9 May holding page |
| `0c346eb` | 2026-05-09 | Remove type-0 instruction; PWYW slider visible for tip capture | 47,646 bytes | Pre-purge NIBN-contaminated version |

**Key finding:** The correct LP to restore is at commit `44166fc` (18,020 bytes). It also exists locally in the archive file.

---

## 3. Live URL state table

| # | URL | Status | Size | Title | Coming soon | Words that work | Gumroad CTAs |
|---|-----|--------|------|-------|-------------|-----------------|--------------|
| 1 | `pipnavigator.co.uk/` | 200 | 835 | PIP Navigator UK | YES | 0 | 0 |
| 2 | `pipnavigator.co.uk/pip-answer-bank.html` | 200 | 14,807 | The Words That Work — UK PIP Answer Bank — PIP Navigator | no | 1 | 3 |
| 3 | `www.pipnavigator.co.uk/` | 200 | 835 | PIP Navigator UK | YES | 0 | 0 |
| 4 | `www.pipnavigator.co.uk/pip-answer-bank.html` | 200 | 14,807 | The Words That Work — UK PIP Answer Bank — PIP Navigator | no | 1 | 3 |
| 5 | `pipnavigator.com/` | 200 | 835 | PIP Navigator UK | YES | 0 | 0 |
| 6 | `pipnavigator.com/pip-answer-bank.html` | 200 | 14,807 | The Words That Work — UK PIP Answer Bank — PIP Navigator | no | 1 | 3 |
| 7 | `www.pipnavigator.com/` | 200 | 835 | PIP Navigator UK | YES | 0 | 0 |
| 8 | `www.pipnavigator.com/pip-answer-bank.html` | 200 | 14,807 | The Words That Work — UK PIP Answer Bank — PIP Navigator | no | 1 | 3 |
| 9 | `pipnavigator.uk/` | 200 | 114 | (none) | no | 0 | 0 |
| 10 | `pipnavigator.uk/pip-answer-bank.html` | 200 | 114 | (none) | no | 0 | 0 |
| 11 | `pip-navigator.netlify.app/` | 200 | 835 | PIP Navigator UK | YES | 0 | 0 |
| 12 | `pip-navigator.netlify.app/pip-answer-bank.html` | 200 | 14,807 | The Words That Work — UK PIP Answer Bank — PIP Navigator | no | 1 | 3 |
| 13 | `pnu-deploy.netlify.app/` | 200 | 835 | PIP Navigator UK | YES | 0 | 0 |
| 14 | `pnu-deploy.netlify.app/pip-answer-bank.html` | 200 | 1,333 | PIP Navigator UK — Page Being Rebuilt | no | 0 | 0 |

### Observations

- **All `.co.uk` and `.com` variants** (rows 1-8) resolve to the same `pip-navigator` Netlify site. The LP pages serve today's lean V1 (14,807 bytes). **This is the wrong version.**
- **Homepage** across all domains shows 835-byte "Coming soon" page — this is the pre-existing `index.html` issue (13 April incident, separate from today).
- **`pipnavigator.uk`** (rows 9-10) is NOT a Netlify domain. Returns a 114-byte JS redirect to `/lander` — this is a domain registrar parking page. Not under our control via Netlify.
- **`pnu-deploy.netlify.app`** (rows 13-14) serves the 9 May holding page (1,333 bytes) for the LP, suggesting its auto-deploy from git is stale or the last successful git-triggered deploy was from the `fca2465` era. Despite `da58edb` being pushed today, auto-deploy may not have triggered or may have failed.
- **`pip-navigator.netlify.app`** (rows 11-12) matches the `.co.uk`/`.com` domains — confirms it's the same site serving the lean V1.

---

## 4. Netlify sites table

| Site name | Site ID | Custom domain(s) | Git repo linked | Notes |
|-----------|---------|-------------------|-----------------|-------|
| `pip-navigator` | `7f2223af-1efc-4baf-b621-ce74cd35d724` | `pipnavigator.com`, `pipnavigator.co.uk` (+ www variants) | **No** (no `repo` field) | **Live production site.** Deployed via CLI only. Currently serving lean V1. |
| `pnu-deploy` | `970dad31-4fc7-43cf-800e-b5bd35baa108` | (none — `pnu-deploy.netlify.app` only) | **Yes** — `github.com/pauldevlin81-blip/pnu-deploy` | Git auto-deploy wired but appears stale (serving 9 May holding page, not today's commit). Not the live site. |
| `nibn` | `93e72294-1862-4b19-b1ec-f9e614d2bab6` | `nibenefitsnavigator.com` | **Yes** — `github.com/pauldevlin81-blip/nibn-deploy` | NIBN site — not relevant to PNU. |
| `ni-benefits-navigator` | `e0ec850a-bb21-4df7-b999-53dfd37cfccc` | (none) | No | Legacy NIBN — not relevant. |
| `thequietbatch` | `fd77d52b-676d-412a-9588-5d5b74b84306` | (none) | No | Unrelated. |
| `maranna` | `ad57aba1-2cba-423c-821b-51cdc5703ce2` | (none) | No | Unrelated. |
| `9-slievegallion-park-reno` | `1be419c7-11ef-4d36-8c6d-ac32d8d85852` | (none) | No | Unrelated. |
| `delicate-strudel-fda75c` | `6a5fb212-3955-41ce-b9e5-bc6a8c16d872` | (none) | No | Unknown/orphan. |
| `9-slievegallion` | `4c5b99ca-59a1-44fe-9fa0-9fc5b39d936e` | (none) | No | Unrelated. |

**Key:** `pip-navigator` is the live site (CLI-deployed, no git link). `pnu-deploy` has git auto-deploy but serves a different (stale) site at a different URL. The two sites are not connected — git push updates `pnu-deploy.netlify.app`, CLI deploy updates `pip-navigator`/`pipnavigator.co.uk`.

---

## 5. Local repo state

**Files in repo root:**

| File | Size | Notes |
|------|------|-------|
| `pip-answer-bank.html` | 14,807 bytes (411 lines) | Today's lean V1 — the wrong version currently live |
| `index.html` | 835 bytes | "Coming soon" placeholder |
| `CLAUDE.md` | 8,372 bytes | Session routing / brand rules |
| `netlify.toml` | 247 bytes | Netlify config |
| `.gitignore` | 32 bytes | — |
| `archive/` | dir | Contains the misnamed backup |
| `emails/` | dir | Untracked |

**Uncommitted changes:** None (clean working tree, `emails/` untracked only).

**Diff — current LP vs backup:**
- Current `pip-answer-bank.html`: 411 lines / 14,807 bytes (lean V1)
- Archive backup: 477 lines / 18,020 bytes (full 10 May LP)
- Files are **completely different** — different titles, different structure, different content length. Not a minor edit.

---

## 6. VERDICT

**The 10 May full LP was overwritten today by a smaller "lean V1" LP.** The deploy prompt from earlier today incorrectly assumed the file in `~/pnu-deploy/pip-answer-bank.html` was a "holding page" when it was actually the correct, polished, 10-section production LP that had been live since Sunday. The backup we created (misnamed as "HOLDING-PAGE") is actually the correct version and is our primary restoration source. The same version also exists in git at commit `44166fc`.

The live site (`pipnavigator.co.uk/pip-answer-bank.html`) is currently serving the lean V1 (14,807 bytes) — a downgrade from the proper LP (18,020 bytes) that 567 email contacts were sent to on 10 May. Anyone clicking the link from that recovery email is now seeing the wrong page.

**Separately:** The homepage (`pipnavigator.co.uk/`) still shows "Coming soon" (835 bytes) across all domains — this is the pre-existing 13 April incident, unrelated to today.

**Separately:** `pipnavigator.uk` is a parked domain (registrar redirect), not pointed at Netlify. Not under current infrastructure control.

**Separately:** `pnu-deploy.netlify.app` has stale content despite git auto-deploy being wired. Low priority — it's not the live site.

---

## 7. PROPOSED FIX — awaiting human approval

### Restore the 10 May LP (urgent)

1. Copy the archive file back into place:
   ```bash
   cp ~/pnu-deploy/archive/pip-answer-bank-HOLDING-PAGE-2026-05-09-to-2026-05-13.html ~/pnu-deploy/pip-answer-bank.html
   ```

2. Rename the archive file to reflect what it actually is:
   ```bash
   mv ~/pnu-deploy/archive/pip-answer-bank-HOLDING-PAGE-2026-05-09-to-2026-05-13.html ~/pnu-deploy/archive/pip-answer-bank-FULL-LP-10-MAY-2026.html
   ```

3. Save today's lean V1 to archive for reference:
   ```bash
   cp ~/pnu-deploy/pip-answer-bank.html ~/pnu-deploy/archive/pip-answer-bank-LEAN-V1-13-MAY-2026-REJECTED.html
   ```
   (Do this BEFORE step 1 overwrites it.)

4. Verify the restored file with the same audit battery (DWP count, E&W count, no NIBN, etc.).

5. Git commit:
   ```bash
   git add -A && git commit -m "Restore 10 May full LP — revert accidental lean V1 overwrite (13 May 2026)"
   git push origin main
   ```

6. Deploy to live:
   ```bash
   netlify deploy --prod --dir . --site 7f2223af-1efc-4baf-b621-ce74cd35d724
   ```

7. Verify live with curl checks.

### Deferred (not part of this fix)

- Homepage "Coming soon" fix (13 April incident) — separate change control
- `pipnavigator.uk` DNS — not pointed at Netlify, needs registrar config
- `pnu-deploy.netlify.app` stale auto-deploy — low priority, not the live site
- GitHub auto-deploy wiring for `pip-navigator` — deferred P0

---

**DO NOT EXECUTE. Awaiting human decision.**
