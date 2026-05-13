# PNU Overnight Report — 2026-05-14

## EXECUTIVE SUMMARY (read first)

Three PNU infrastructure jobs ran overnight on branch `overnight-d-scope-2026-05-13`. **Job 1** (Netlify auto-deploy wiring): `pip-navigator` site has no repo linked — ready to wire; morning commands prepared. **Job 2** (homepage restoration): the 12 April known-good homepage (792 lines, 25,317 bytes) was pulled from Netlify's immutable deploy history, contamination-checked (zero NIBN/DfC/nidirect), and committed locally — ready to merge and deploy. **Job 3** (contamination audit): all 6 repo files scanned, zero contamination found — all flagged references are in allowed contexts (geo-exclusion FAQ, internal config, diagnostic report). One human-review item: the restored homepage has pre-existing "score points" / "exact words that work" language that conflicts with CLAUDE.md rule 7 (added 10 May). Total morning execution: ~10 minutes.

---

## MORNING EXECUTE LIST (priority — copy-paste ready)

### Pre-9am block (Paul, ~10 minutes)

**Step 1 — Merge the overnight branch into main:**
```bash
cd ~/pnu-deploy
git checkout main
git merge overnight-d-scope-2026-05-13
```

**Step 2 — Wire pip-navigator Netlify site to pnu-deploy repo:**
```bash
netlify api updateSite --data '{
  "site_id": "7f2223af-1efc-4baf-b621-ce74cd35d724",
  "body": {
    "repo": {
      "provider": "github",
      "repo_path": "pauldevlin81-blip/pnu-deploy",
      "repo_branch": "main",
      "cmd": "",
      "dir": "."
    }
  }
}'
```
> **Note:** If the API returns a permissions/OAuth error, wire it via the Netlify dashboard instead:
> `app.netlify.com/projects/pip-navigator` → Site configuration → Build & deploy → Link repository → select `pauldevlin81-blip/pnu-deploy`, branch `main`, publish directory `.`

**Step 3 — Push to main (triggers auto-deploy if Step 2 succeeded):**
```bash
git push origin main
```

**Step 4 — If auto-deploy did NOT fire (Step 2 failed or pending), deploy manually:**
```bash
netlify deploy --prod --dir . --site 7f2223af-1efc-4baf-b621-ce74cd35d724
```

**Step 5 — Verify no dual-fire from pnu-deploy orphan site:**
```bash
netlify api listSiteDeploys --data '{"site_id":"970dad31-4fc7-43cf-800e-b5bd35baa108"}' | head -5
```
> If pnu-deploy also fired a deploy, unlink it:
> ```bash
> netlify unlink --site 970dad31-4fc7-43cf-800e-b5bd35baa108
> ```

### Verification checklist (after morning execution)

Run all 7 — all must pass:

```bash
# Homepage restored (not "Coming soon"):
curl -sL https://pipnavigator.com | grep -c -i "Coming soon"           # must be 0
curl -sL https://pipnavigator.com | grep -c "PIP Navigator"            # must be >= 1
curl -sL https://pipnavigator.com | wc -c                              # must be > 20,000

# Homepage clean:
curl -sL https://pipnavigator.com | grep -c -i "NIBN"                  # must be 0

# WWW variant matches:
curl -sL https://www.pipnavigator.com | grep -c -i "Coming soon"       # must be 0
curl -sL https://www.pipnavigator.com | wc -c                          # must be > 20,000

# LP still serving correctly:
curl -sL https://pipnavigator.com/pip-answer-bank.html | wc -c         # must be > 10,000
```

---

## DETAILED REPORTS

### Job 1 — GitHub auto-deploy wiring

**Diagnostic verdict: READY TO WIRE**

| Property | pip-navigator (live site) | pnu-deploy (orphan) |
|---|---|---|
| Site ID | `7f2223af-1efc-4baf-b621-ce74cd35d724` | `970dad31-4fc7-43cf-800e-b5bd35baa108` |
| Custom domain | `pipnavigator.com` + `.co.uk` variants | (none — `.netlify.app` only) |
| `build_settings.repo_url` | **empty** (no repo linked) | `github.com/pauldevlin81-blip/pnu-deploy` |
| `build_settings.repo_branch` | — | `main` |
| Current deploy | `6a04ab59` (13 May, manual CLI) | `69ff2728` (9 May, git-triggered) |

**Situation:** The live production site (`pip-navigator`) has never been git-linked — all deploys were manual CLI pushes. The `pnu-deploy` orphan site IS git-linked but serves stale content at a non-production URL. The fix is to wire `pip-navigator` to the repo and optionally unlink `pnu-deploy` to avoid dual-fire.

**Tonight's action:** None (wiring requires API call that modifies live infrastructure). Morning commands prepared above.

---

### Job 2 — pipnavigator.com homepage restoration

**Diagnostic verdict: RESTORATION FILE READY**

| Item | Value |
|---|---|
| DNS: `pipnavigator.com` | `75.2.60.5` (Netlify) |
| DNS: `www.pipnavigator.com` | CNAME → `pipnavigator.netlify.app` (Netlify) |
| Current live state | 835-byte "Coming soon" placeholder |
| Overwrite incident | 13 April 2026 — outcomes wizard (`69dc5a60`, 32,912 bytes) deployed as homepage |
| Known-good source | Netlify deploy `69db40cfe439886540207dec` (12 April 2026, 06:50 UTC) |
| Known-good size | 792 lines / 25,317 bytes |
| Known-good title | "PIP Navigator — The Words That Score Points on Your PIP Form" |
| Contamination check | NIBN:0, DfC:0, nidirect:0, "Coming soon":0 — **CLEAN** |
| Git commit_ref | None (all pip-navigator deploys were manual CLI — no git history for this file) |
| Local commit on branch | `5efeed8` — homepage restored from immutable deploy URL |
| Placeholder backed up to | `archive/index-COMING-SOON-PLACEHOLDER-restored-13Apr-to-13May.html` |

**Timeline reconstructed:**
1. Pre-13 April: Full LP homepage live (25,317 bytes)
2. 13 April 02:52 UTC: Outcomes wizard deployed over homepage (32,912 bytes)
3. Subsequent deploy: "Coming soon" placeholder deployed (835 bytes)
4. Tonight: Known-good homepage pulled from Netlify deploy history, committed to feature branch

---

### Job 3 — Repo contamination audit

**Diagnostic verdict: GREEN — no contamination requiring fix**

**Files audited:** 6
**Clean:** 6 (all)
**Auto-fixed locally:** 0
**Flagged for human review:** 0 (contamination), 1 (brand rule compliance — see below)

| File | NIBN | DfC | nidirect | Verdict |
|---|---|---|---|---|
| `.netlify/state.json` | 0 | 0 | 0 | CLEAN |
| `CLAUDE.md` | 11 | 3 | 1 | ALLOWED — internal config file; references sister brand in context of instructions to avoid cross-contamination |
| `emails/pnu-lp-recovery-2026-05-10.html` | 0 | 0 | 0 | CLEAN |
| `index.html` (restored) | 0 | 0 | 0 | CLEAN |
| `pip-answer-bank.html` | 0 | 5 | 0 | ALLOWED — all 5 DfC references are in geo-exclusion context ("Northern Ireland uses PIP but administered by DfC, not DWP") routing NI users away. Per CLAUDE.md rule 1 this is correct. |
| `PNU-INFRA-DIAGNOSIS-2026-05-13.md` | 6 | 0 | 0 | ALLOWED — internal diagnostic report (this file), not user-facing content |

---

## ALL LOCAL COMMITS THIS RUN (feature branch: `overnight-d-scope-2026-05-13`)

| Hash | Description |
|---|---|
| `5efeed8` | Job 2: Restore pipnavigator.com homepage from Netlify deploy 69db40cf (12 Apr 2026) |

Job 1: No local commits (morning API call only).
Job 3: No auto-fixes needed (all clean or in allowed context).

---

## HUMAN-REVIEW QUEUE (do NOT execute without Paul's approval)

### 1. [MEDIUM] Restored homepage contains pre-rule-7 guarantee language

The known-good homepage from 12 April predates the CLAUDE.md rule 7 tightening (10 May 2026). The following lines use language now prohibited:

| Line | Content | Rule violated |
|---|---|---|
| 6 | `<title>PIP Navigator — The Words That Score Points on Your PIP Form</title>` | "score points" |
| 7 | `<meta name="description" content="...PIP Navigator gives you the exact words that work.">` | "exact words that work" |
| 9 | `<meta property="og:description" content="...The exact words that score points.">` | "exact words that score points" |
| 672 | `<h2>The words that work.</h2>` | "words that work" as headline |
| 726 | `Just the words that work.` | "words that work" |

Line 740-741 FAQ ("Will this guarantee I get PIP?" / "No. Nobody can guarantee that.") is **acceptable** — it's a disclaimer, not a claim.

**Recommendation:** Deploy the restoration as-is (better than "Coming soon"), then schedule a follow-up session to update the homepage copy to comply with rule 7. The LP (`pip-answer-bank.html`) already uses compliant framing — the homepage can be aligned to match.

**Severity:** MEDIUM — not a contamination issue, but a brand compliance issue. Does not block the morning deploy.

### 2. [LOW] Consider unlinking `pnu-deploy` orphan site

The `pnu-deploy.netlify.app` site is git-linked to the same repo but serves stale content at a non-production URL. Once `pip-navigator` is wired (Step 2 above), having two sites linked to the same repo could cause dual-fire deploys. The verification step (Step 5) checks for this.

**Recommendation:** After confirming pip-navigator auto-deploy works, unlink pnu-deploy to avoid confusion.

---

## SLEEP-TIGHT SUMMARY

All three jobs diagnosed and actioned. The homepage restoration (Job 2) is committed on `overnight-d-scope-2026-05-13` and ready to merge — one `git merge` + `git push` gets the real homepage live for the first time since 13 April. The auto-deploy wiring (Job 1) has morning commands ready. The contamination audit (Job 3) came back clean. Paul needs ~10 minutes before 9am: merge, wire, push, verify.
