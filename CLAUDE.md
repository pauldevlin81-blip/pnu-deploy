# CLAUDE.md — PNU (PIP Navigator UK)

> Read this every session. This is the routing file for Claude Code when working in the pnu-deploy repository.

---

## What this repo is

PIP Navigator UK is an England-and-Wales-only PIP guidance business. Faceless brand. Sells PDF guides and answer banks via Gumroad. Operator is the sole human; Claude Code is the engineer. Operator is PM, Claude Code executes.

Sister brand: NI Benefits Navigator (NIBN). Separate repo at `~/nibn-deploy/`. Separate brand voice. Separate jurisdiction. Never cross.

PNU is the younger brand — less list, fewer paid customers, no testimonials yet. Treat as early-stage: zero social-proof number claims, content quality and specificity is the trust strategy.

---

## Hard rules — never violate

1. **England and Wales only.** Use DWP (Department for Work and Pensions), never DfC. Use gov.uk references, not nidirect. Use NHS, not HSC. Explicitly exclude Scotland (ADP) and Northern Ireland (DfC PIP) anywhere "who is this for" is addressed.
2. **Faceless brand.** Operator name never appears in any code, copy, content, comment, commit message, alt text, or metadata. Public-facing voice is "we" and "the team."
3. **Peer support framing.** Never "professional advice," "legal advice," or "official guidance." Always "peer support" or "educational guidance." Always signpost to Citizens Advice (England/Wales) in compliance footers.
4. **Tribunal guardrail.** Zero content drawn from operator's own case (MT/4332/25/02/D) or daughter's case material — including anonymised — until tribunal decisions land.
5. **Anti-drift.** Conversion rate is the single business metric. PNU is currently sub-3% conversion — leak is at decision-moment, not awareness. Do not propose new products until conversion ≥ 5%. Cut scope, don't add features.
6. **No "type 0 in price box" instruction anywhere.** Retired April 2026. Free guides use PWYW slider with £0 floor. The phrase "type 0" must not appear in any code, copy, template, saved-reply, or generated content.
7. **No guarantee language.** Never "exact words that work," "score points," "guaranteed award," or any phrasing implying outcome certainty. The product helps claimants explain truthfully; it does not engineer awards. *(Lesson 10 May 2026: "The words that work" hero failed this rule. Rejected and replaced with "How to write your PIP form when 'I cope' isn't true.")*
8. **Defamation safety on assessors.** Never use "lying" or "fraud" to describe assessor reports. Safe framing: "did the report match what you said?" or "the report didn't reflect what was said."
9. **No NIBN content in this repo.** Cross-contamination is a documented governance debt. Any NIBN-branded asset that lands here gets purged (10 May 2026 incident). Audit periodically.

---

## Brand voice — PNU

- Calm operator tone. Plain English. Short paragraphs. No emojis except 🧭 (sign-off only).
- Audience: E&W claimants mid-process — form-stage, assessment-stage, MR-stage. Most are looking for "what to write" on the descriptors. Speak as peer who's been through the same forms.
- Tagline: *"The words that work."* (allowed only as sub-line/tagline in lockup, never as hero headline or copy guarantee.)
- Never sound like: a solicitor, a startup brochure, a charity press release.
- Always: PIP (Personal Independence Payment) for E&W adults 16-66. All 12 PIP activities. Daily living + mobility.
- Sign-off conventions: comment replies end `🧭`. DMs and emails end `PIP Navigator 🧭`.

---

## Verified data — E&W single source of truth

PIP rates 2026/27 (from GOV.UK):
- Enhanced Daily Living: £114.60
- Standard Daily Living: £76.70
- Enhanced Mobility: £80.00
- Standard Mobility: £30.30

Market-level proof figures (use only these on LPs/content, never invented PNU-specific volume):
- 3.93M PIP claimants in England and Wales
- PIP new-claim award rate: 35% awarded at first decision (normal rules, excl. withdrawn), qtr ending Jan 2026. Source: DWP PIP Official Statistics to Jan 2026, pub 17 Mar 2026, E&W. 65% not awarded at initial decision is PRE-MR/appeal — never state as flat 'rejected'. Next release 16 Jun 2026.
- 66% win at tribunal with representation *(never 63%)*
- PIP tribunal backlog: ~53,000 PIP appeals awaiting tribunal hearing, Q2 2025/26. Source: HMCTS tribunal statistics. '99K' is not a verified PIP figure — do not use. Appeal success rate ~68–72% (HMCTS); MR change rate ~22–25%.

If a Scotland or NI rate appears in any generated copy, it's a bug — flag and correct.

---

## Tech stack

- **Hosting:** Netlify (site name: `pip-navigator` / domain: pipnavigator.com — NOT `pnu-deploy.netlify.app`)
- **Deploy:** netlify CLI from this repo, OR (once linked) `git push origin main` → Netlify auto-deploy. As of 10 May 2026 GitHub auto-deploy not yet linked — Monday 11 May P0 task.
- **Repo:** `pauldevlin81-blip/pnu-deploy` (branch: `main`)
- **Frontend:** Plain HTML/CSS/JS. Inline CSS. No frameworks. Single-file pages.
- **Email:** Mailjet (sender: hello@pipnavigator.co.uk). Unsubscribe tag `[[UNSUB_ALL_LINK_EN_US]]` — never any other variant.
- **Payments:** Gumroad storefront `nibenefitsnavigator.gumroad.com` (shared with NIBN until Q3 2026 review). PNU permalinks: `uk-pip-answer-bank`, `free-uk-pip-guide`.
- **Analytics:** Meta Pixel ID `517991158551582`. PostHog stub in place (no PNU project key yet).
- **Automation:** Mailjet workflows, ManyChat flows.
- **CEO reports archive:** Sister repo `nibn-deploy/ceo-reports/` holds both brands' EOD files. Append-only.

---

## Coding standards

- Plain HTML over frameworks unless explicitly asked.
- Inline CSS in `<style>` blocks. Use CSS variables for brand colours.
- Mobile-first. Test at 375px viewport. Trust strips must clear iOS Safari URL bar (add `padding-bottom: 64px` minimum on mobile media query for full-bleed sections at page-end).
- No `<form>` tags in artifacts; use event handlers.
- Cookie consent banner on every page that loads tracking.
- UTM capture script on every page (`utm-capture.js` pattern).
- All commits include a one-line summary that describes the *change*, not the *file*.

---

## Implementation standard

Do not use any paid third-party libraries, services, SDKs, frameworks, or dependencies unless they are already present in the project.

Output must be implementation-complete.

For every build:

1. Show the complete file tree.
2. Show every new file in full.
3. Show every modified file in full.
4. Never provide partial snippets.
5. Never use placeholders such as:
   - TODO
   - INSERT HERE
   - YOUR CODE HERE
   - pseudo-code
6. Never assume I know where code belongs.
7. Never assume I know how to deploy.
8. Never assume I will debug manually.

Provide:

- exact file paths
- exact code
- exact environment variables
- exact Netlify settings
- exact Supabase settings
- exact Git commands
- exact terminal commands
- exact deployment commands
- exact verification procedure

If a build depends on secrets or credentials:

- stop at the precise blocker
- identify the missing credential
- explain exactly where I obtain it
- explain exactly where I paste it

Do not guess credentials.

All output must be production-ready and capable of first-time deployment by a non-developer operator.

Before presenting the solution, perform an adversarial review and identify:

- broken assumptions
- missing dependencies
- deployment risks
- security risks
- failure points

Then revise the implementation to remove those risks.

Your objective is not to produce code. Your objective is to produce a build that works first time with minimal operator intervention.

---

## Brand colours — PNU

- Navy: `#0F1432` (primary background)
- Amber: `#D28C32` (CTAs, h2 headers)
- Teal: `#3CB4AA` (trust elements, secondary accents, ew-callout left border)
- Salmon: `#F07864` (accent, sparingly)
- Body text on navy: `#C8CDDC`
- Footer/muted: `#7A7F94`
- Dark panel for trust strips: `#1A2050`

Identical palette to NIBN — distinction is the sign-off emoji (🧭 not 💙) and the jurisdiction language (DWP not DfC).

---

## Compliance preflight — run before any publish

Before any copy, email, post, LP section, or generated content ships, verify:

- [ ] No DfC↔DWP cross-contamination
- [ ] No Scotland or NI rates accidentally used
- [ ] No guarantee language
- [ ] No "type 0" phrasing
- [ ] No operator name leakage
- [ ] No tribunal case material referenced
- [ ] No NIBN branding (logo, terms, references, image assets, scripts)
- [ ] Faceless brand voice maintained
- [ ] Sign-off uses 🧭 (not 💙, which is NIBN)
- [ ] Mailjet unsub tag is `[[UNSUB_ALL_LINK_EN_US]]` if email
- [ ] Compliance footer present if LP or email (peer support / Citizens Advice E&W signpost)
- [ ] Mobile renders cleanly at 375px if HTML
- [ ] Tribunal rate is 66%, not 63%

---

## Session workflow

1. Read PICKUP file if one exists at project root or in sister repo's `ceo-reports/`.
2. State the ONE priority for the session before doing anything else.
3. If building anything beyond a 1-file change, ask 5 feature-interview questions first.
4. Plan Mode (Shift+Tab) for any multi-step build. Show the plan before executing.
5. Commit small, push often.
6. End with one or two next actions. Not five.

---

## What this repo is NOT for

- Northern Ireland content — use `~/nibn-deploy/` and `nibn-deploy/CLAUDE.md`.
- Scotland content (ADP is a different scheme entirely).
- Child DLA content (UK-wide child DLA exists but the wedge product is NIBN's `NI Child DLA Answer Bank` — leave that lane to NIBN until conversion proves PNU can support a second product line).
- Operator's or daughter's case research.

---

## Open governance debt (as of 10 May 2026)

- Q3 2026 Gumroad separation review — currently shared storefront with NIBN
- Netlify GitHub auto-deploy link — pending Monday 11 May
- PostHog PNU project setup — stub in place, no project key
- ManyChat "Get Started" leak fix — pending (NIBN fix lands first)
- PNU LP forensic count (3-9 May mis-routed traffic) — pending

---

## When in doubt

- Default to silence over output.
- Default to one question over three.
- Default to paste-ready over describe-then-build.
- Default to cutting scope over adding complexity.
- Default to asking the operator before assuming.

Ship discipline > ship volume.
