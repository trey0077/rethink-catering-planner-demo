# Codex Task: Build the Rethink Catering Planner Demo

Read these files first:

- `README.md`
- `AGENTS.md`
- `research/app-spec.md`
- `research/validation-notes.md`

## Goal

Build a polished local web app demo called **Plan Food for 40+ Guests**. It should demonstrate a Rethink Strategy buyer-decision tool for caterers: use event context and caterer menu/service knowledge to produce a practical, quote-ready catering recommendation.

## Tech preference

Use Vite + React + TypeScript unless there is a strong reason not to.

## Required features

1. Landing/hero section
   - Headline: “Have 40+ people coming? Don’t start with a menu. Start with the event.”
   - Rethink-style subheading explaining this is a decision tool caterers can adapt to their own menu/data.

2. Interactive planner form
   - Guest count, default 40
   - Event type
   - Meal role
   - Event time
   - Service style
   - Budget posture
   - Crowd profile
   - Dietary needs checkboxes
   - Notes/special requests

3. Recommendation engine
   - Deterministic TypeScript function, not hardcoded one-off copy.
   - Choose recommended catering direction based on inputs.
   - Generate spread structure, reasons, risk flags, caterer questions, and copyable summary.

4. Results view
   - Best-fit direction
   - Suggested spread
   - Why this makes sense
   - Don’t forget checklist
   - Questions to ask the caterer
   - Copy/paste consultation summary
   - CTA: “Want this adapted to your catering menu?”

5. Demo presets
   - Add at least 3 preset buttons/scenarios:
     - 40-person corporate lunch
     - 75-person cocktail/open house
     - 120-person wedding/full meal

6. Design
   - Clean, modern, warm, credible.
   - Use no paid assets and no external API calls.
   - Avoid generic bootstrap-looking form vomit.

7. Verification
   - Install dependencies.
   - Run build.
   - Add tests for recommendation logic if practical; run them.

## Non-goals

- No payment processing.
- No login/auth/database.
- No real ordering integration.
- No claim of live Bay Gourmet pricing/availability.
- No final dietary/food-safety guarantees.

## Completion report

When finished, report:

- What was built
- Commands run and results
- How to run locally
- Any limitations
