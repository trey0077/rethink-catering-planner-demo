# Rethink Catering Planner Demo

A prototype buyer-decision tool for caterers: turn “I have 40+ people coming” into a practical, consultation-ready catering direction.

## Concept

Catering websites usually show menus and make the buyer reverse-engineer the order. This demo starts with the event context, then recommends a menu style, item mix, dietary coverage, service notes, and a quote-ready handoff.

## Source examples

- HoneyBaked catering: menu/category-first ecommerce flow; can add 40 identical boxed lunches but does not guide a mixed group order.
- Bay Gourmet Catering: credible local caterer with menu/event pages and 40-person minimum, but no guided planner. Menus show many possibilities; contact form captures event details but does not help the buyer choose.

## Success criteria

- Static/local demo app that runs with `npm install` and `npm run dev`.
- A polished landing screen for Rethink Strategy positioning.
- Interactive planner collecting guest count, event type, meal format, vibe, budget, service level, dietary needs, and notes.
- Deterministic recommendation logic; no API required.
- Output includes recommended format, suggested spread, add-ons, risk flags, questions for the caterer, and a copyable consultation summary.
- Design feels like a credible Rethink demo, not a generic form slop bucket.

## Non-goals

- No payment processing.
- No real caterer ordering integration.
- No final dietary/medical/food safety guarantees.
- No pretending the demo has live Bay Gourmet pricing.
- No broad SaaS/admin portal unless Codex has time after the core demo is excellent.
