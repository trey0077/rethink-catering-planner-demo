# Agent Instructions

Build a focused demo, not a platform.

## Product guardrails

- This is a Rethink Strategy buyer-decision-tool demo: “small tools for complicated buying decisions.”
- The app should help a potential catering customer make a better pre-consultation decision and give the caterer ~80% of what they need for a useful first response.
- Start from event context, not menu catalog browsing.
- Treat output as quote-prep / planning guidance, not a final catering order or binding quote.
- Use plain-English guidance. Avoid internal scoring jargon unless placed in a secondary explanation.
- Never claim to know live Bay Gourmet availability/pricing.
- Keep the demo local/static: no external API keys, no database, no auth.

## Engineering expectations

- Prefer Vite + React + TypeScript if starting from scratch.
- Keep logic deterministic and testable in plain functions.
- Use a clean component structure.
- Include basic tests for recommendation logic if practical.
- Verify with `npm install`, `npm run build`, and tests if added.

## UX standards

- The first screen should make the pain obvious: “Don’t start with a menu. Start with the event.”
- Make the default 40 guests prominent because Bay Gourmet states a 40-person minimum.
- Output should be useful enough to paste into a contact form or email.
- Show “why this recommendation” so the tool demonstrates judgment.
- Include Rethink positioning and a CTA like “Want this adapted to your catering menu?”
