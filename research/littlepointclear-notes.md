# Little Point Clear crawl notes

Source: https://www.littlepointclear.com/ crawled from sitemap on 2026-07-13. Raw crawl saved in `research/littlepointclear-crawl.md` and `.json`.

## Site pages crawled

- Home
- Event Spaces / venue spaces
- Wedding Packages
- What's Included
- FAQ
- Suites and suite galleries
- Contact
- About/team
- Guest check-in pages
- Privacy policy

## Nuggets that apply to the catering/event planner

Little Point Clear is mostly a venue/wedding-planning site, so most wedding-specific packaging should **not** get shoved into the catering tool. But several planning items generalize well to catering, corporate events, private parties, and weddings.

### 1. What the venue already includes

The `What's Included` page is useful because it makes an event budget problem visible: before renting plates/tables/bars/etc., a buyer needs to know what the venue already provides.

Examples listed:

- venue staff assisting vendor arrival/setup
- parking valet
- full setup of furnishings based on custom floor plan/final design meeting
- dining rounds
- dining chairs
- ceremony/courtyard chairs
- pub tables
- portable bars and built-in bar
- food-service tables
- farm tables
- cake table
- outdoor seating groupings
- A/V and sound system
- fans and lamps
- optional bar packages
- linens in larger/weekend package

**Planner implication:** keep rentals in the app, but add a venue-support question so the output can say “confirm what the venue provides before renting duplicates.”

### 2. Parking and shuttle threshold

FAQ says valet is provided for on-site parking; certain guest counts require off-site parking/shuttle service; shuttle service is required over 65 guests.

**Planner implication:** for 65+ guests, especially full-service, wedding, open house, or venue events, ask whether parking/shuttle needs to be solved. This affects timing, guest arrival flow, staffing, and budget even if it is not catering per se.

### 3. Coordinator / timeline / vendor load-in

FAQ says day-of coordinator is required for weddings; coordinator should attend final design meeting, provide a timeline, and be present for first vendor load-in and load-out. Wedding package copy also references design meetings, vendor selections, floor plans, timelines, setup/cleanup windows, and rental/vendor deliveries.

**Planner implication:** not a wedding-planning app, but catering quotes need setup window, vendor arrival/load-in, serving window, and load-out/timeline clarity. Add lightweight setup-window / coordination prompts.

### 4. Deposits and payment schedule

FAQ says larger package deposit is $5,000 and smaller is $2,500; deposit secures the date; later payments are evenly spaced and due one month before event.

**Planner implication:** existing date/deposit note is right. Add language that deposit/payment deadlines may be tied to the event date and scope.

### 5. Event end time / guest departure

FAQ says Friday/Saturday receptions end at 10 p.m.; everyone off property by 11 p.m.

**Planner implication:** useful only as a general reminder: catering plan should know serving window and cleanup/load-out time. Do not add venue-curfew logic to a generic catering planner.

## Recommendation

Add only a small “Venue logistics” layer:

- venue support level: venue provides basics / partial support / blank space / not sure
- setup window: tight same-day / standard same-day / multi-day or early access / not sure
- parking/shuttle concern checkbox

Use these to change guidance, not to turn the app into wedding software.
