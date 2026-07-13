# Catering Planner App Spec

## Working name

**Plan Food for 40+ Guests**

## Core thesis

Caterers already have valuable data: menus, event types, guest-count minimums, service constraints, popular combinations, dietary accommodations, and the questions they repeatedly ask on quote calls. A decision tool can convert that data into a guided pre-consultation experience.

## Primary user

Someone planning food for a group who does not know how to translate event context into catering menu choices.

Examples:
- office manager planning a corporate lunch/open house
- homeowner hosting a holiday/at-home party
- wedding-adjacent event planner
- sales/customer appreciation event host
- church/school/group event organizer

## App flow

### 1. Landing / framing

Message:

> Have 40+ people coming? Don’t start with a menu. Start with the event.

Subtext:

> Answer a few questions and get a catering direction you can send to a caterer.

### 2. Inputs

Collect:

- guest count: number, default 40, min display note “many caterers set 40-person minimums”
- event type:
  - Corporate event / open house
  - Office lunch or training
  - Cocktail party
  - At-home party / holiday
  - Wedding-related event
  - Other
- meal role:
  - light snacks
  - heavy hors d’oeuvres
  - full meal buffet
  - boxed / grab-and-go
  - take-home trays
- event time:
  - breakfast/morning
  - lunch
  - afternoon
  - evening
- service style:
  - pickup
  - delivery/drop-off
  - full service/staffed
  - not sure
- budget posture:
  - economical
  - balanced
  - elevated
  - impress them without going insane
- crowd profile:
  - conservative eaters
  - adventurous/coastal
  - mixed corporate crowd
  - kids/families
  - older crowd
- dietary needs:
  - vegetarian
  - vegan
  - gluten-free
  - dairy-free
  - seafood/shellfish concern
  - pork avoidance
- notes / special requests free text

### 3. Recommendation logic

Determine a recommended format:

- boxed/grab-and-go if office/training/lunch + low mess/pickup/delivery
- heavy hors d’oeuvres if cocktail/evening/open house/light-meal and standing/mingling
- full buffet if full meal, evening, wedding-related, elevated, or 60+ guests
- at-home/holiday trays if at-home + pickup + take-home trays
- breakfast/morning package if morning

Generate:

- recommended catering format
- suggested spread structure, not exact vendor-specific order
- item count guidance:
  - appetizer selection count
  - hot/cold balance
  - vegetarian/gluten-free safety coverage
  - drink/dessert/add-on prompts
- guest-count adjusted guidance:
  - 40–59: simple menu, 4–6 app selections or 2 entrees/2 sides
  - 60–99: add variety and service clarity
  - 100+: recommend staffed/full-service conversation
- risk flags:
  - seafood concern
  - dietary coverage missing
  - full meal ambiguity
  - pickup may be too much for large guest count
- consultation questions:
  - standing or seated?
  - is this replacing a meal?
  - alcohol served?
  - staff/setup/utensils needed?
  - kitchen/reheating space?
  - firm dietary restrictions?

### 4. Output sections

- “Best-fit catering direction”
- “Suggested spread”
- “Why this makes sense”
- “Don’t forget” checklist
- “Questions to ask the caterer”
- “Copy/paste consultation summary”
- “This demo could be adapted to your menu” Rethink CTA

## Visual direction

Clean, modern, warm. Use catering/food-friendly colors without becoming cheesy. Avoid stock-photo overload. Should look like a strategy/build demo from Rethink, not a restaurant website clone.

Suggested style:
- ivory/off-white background
- deep green/charcoal text
- warm orange or tomato accent
- cards with clear hierarchy
- visible progress/sections

## Acceptance checks

- A non-technical user can understand in 10 seconds that the tool starts with the event, not menu browsing.
- For 40 corporate guests, lunch, balanced budget, mixed crowd: output recommends boxed/grab-and-go or buffet with practical variety and dietary prompts.
- For 75 evening cocktail guests with alcohol: output recommends heavy hors d’oeuvres with hot/cold variety, piece-count caution, and service questions.
- For 120 wedding/evening/full meal: output recommends full buffet/staffed consultation and warns about service/logistics.
- Copyable summary contains the form inputs plus recommendation in human language.
