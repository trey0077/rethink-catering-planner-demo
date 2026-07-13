export const dietaryOptions = [
  'vegetarian',
  'vegan',
  'gluten-free',
  'dairy-free',
  'seafood/shellfish concern',
  'pork avoidance',
] as const;

export const rentalOptions = ['plates/glassware/silverware', 'linens', 'tables/chairs', 'tent or outdoor setup'] as const;

export type DietaryNeed = (typeof dietaryOptions)[number];
export type RentalNeed = (typeof rentalOptions)[number];

export type EventType =
  | 'Corporate event / open house'
  | 'Office lunch or training'
  | 'Cocktail party'
  | 'At-home party / holiday'
  | 'Wedding-related event'
  | 'Other';

export type MealRole =
  | 'light snacks'
  | 'heavy hors d’oeuvres'
  | 'full meal buffet'
  | 'boxed / grab-and-go'
  | 'take-home trays';

export type EventTime = 'breakfast/morning' | 'lunch' | 'afternoon' | 'evening';
export type ServiceStyle = 'drop-off catering' | 'food truck' | 'buffet style' | 'family style' | 'plated dinner' | 'full service/staffed' | 'not sure';
export type VenueSupport = 'venue provides basics' | 'some items included' | 'blank space / bring everything' | 'not sure';
export type SetupWindow = 'tight same-day' | 'standard same-day' | 'early access / multi-day' | 'not sure';
export type BudgetPosture = 'economical' | 'balanced' | 'elevated' | 'impress them without going insane';
export type CrowdProfile =
  | 'conservative eaters'
  | 'adventurous/coastal'
  | 'mixed corporate crowd'
  | 'kids/families'
  | 'older crowd';

export type PlannerInput = {
  guestCount: number;
  eventDate: string;
  eventType: EventType;
  mealRole: MealRole;
  eventTime: EventTime;
  serviceStyle: ServiceStyle;
  budgetPosture: BudgetPosture;
  crowdProfile: CrowdProfile;
  dietaryNeeds: DietaryNeed[];
  includeAlcohol: boolean;
  rentalNeeds: RentalNeed[];
  venueSupport: VenueSupport;
  setupWindow: SetupWindow;
  parkingShuttleConcern: boolean;
  notes: string;
};

export type CostEstimate = {
  perPersonRange: [number, number];
  foodSubtotalRange: [number, number];
  likelyTotalRange: [number, number];
  nationalAverageNote: string;
  serviceFeeNote: string;
  alcoholNote?: string;
  rentalNote?: string;
  travelTaxNote: string;
  dateNote: string;
};

export type Recommendation = {
  direction: string;
  shortLabel: string;
  spread: string[];
  reasons: string[];
  checklist: string[];
  riskFlags: string[];
  catererQuestions: string[];
  costEstimate: CostEstimate;
  summary: string;
};

export const defaultInput: PlannerInput = {
  guestCount: 40,
  eventDate: '',
  eventType: 'Corporate event / open house',
  mealRole: 'full meal buffet',
  eventTime: 'lunch',
  serviceStyle: 'buffet style',
  budgetPosture: 'balanced',
  crowdProfile: 'mixed corporate crowd',
  dietaryNeeds: ['vegetarian', 'gluten-free'],
  includeAlcohol: false,
  rentalNeeds: [],
  venueSupport: 'not sure',
  setupWindow: 'not sure',
  parkingShuttleConcern: false,
  notes: '',
};

export const presets: Record<string, PlannerInput> = {
  corporateLunch: {
    guestCount: 40,
    eventDate: '',
    eventType: 'Office lunch or training',
    mealRole: 'boxed / grab-and-go',
    eventTime: 'lunch',
    serviceStyle: 'drop-off catering',
    budgetPosture: 'balanced',
    crowdProfile: 'mixed corporate crowd',
    dietaryNeeds: ['vegetarian', 'gluten-free'],
    includeAlcohol: false,
    rentalNeeds: [],
    venueSupport: 'some items included',
    setupWindow: 'standard same-day',
    parkingShuttleConcern: false,
    notes: 'Training day. Keep setup simple and avoid messy foods.',
  },
  cocktailOpenHouse: {
    guestCount: 75,
    eventDate: '',
    eventType: 'Corporate event / open house',
    mealRole: 'heavy hors d’oeuvres',
    eventTime: 'evening',
    serviceStyle: 'full service/staffed',
    budgetPosture: 'impress them without going insane',
    crowdProfile: 'adventurous/coastal',
    dietaryNeeds: ['vegetarian', 'seafood/shellfish concern'],
    includeAlcohol: true,
    rentalNeeds: ['plates/glassware/silverware', 'linens'],
    venueSupport: 'some items included',
    setupWindow: 'standard same-day',
    parkingShuttleConcern: true,
    notes: 'Guests will be standing and alcohol may be served.',
  },
  weddingFullMeal: {
    guestCount: 120,
    eventDate: '',
    eventType: 'Wedding-related event',
    mealRole: 'full meal buffet',
    eventTime: 'evening',
    serviceStyle: 'plated dinner',
    budgetPosture: 'elevated',
    crowdProfile: 'mixed corporate crowd',
    dietaryNeeds: ['vegetarian', 'gluten-free', 'dairy-free'],
    includeAlcohol: true,
    rentalNeeds: ['plates/glassware/silverware', 'linens', 'tables/chairs'],
    venueSupport: 'venue provides basics',
    setupWindow: 'early access / multi-day',
    parkingShuttleConcern: true,
    notes: 'Reception-style dinner after a short ceremony.',
  },
};

export function buildRecommendation(input: PlannerInput): Recommendation {
  const directionType = chooseDirection(input);
  const shortLabel = directionLabels[directionType];
  const direction = directionCopy[directionType](input);
  const spread = buildSpread(input, directionType);
  const reasons = buildReasons(input, directionType);
  const riskFlags = buildRiskFlags(input, directionType);
  const checklist = buildChecklist(input, directionType);
  const catererQuestions = buildQuestions(input, directionType);
  const costEstimate = buildCostEstimate(input);

  return {
    direction,
    shortLabel,
    spread,
    reasons,
    riskFlags,
    checklist,
    catererQuestions,
    costEstimate,
    summary: buildSummary(input, shortLabel, spread, riskFlags, costEstimate),
  };
}

type DirectionType = 'breakfast' | 'boxed' | 'horsDoeuvres' | 'holidayTrays' | 'buffet';

const directionLabels: Record<DirectionType, string> = {
  breakfast: 'Breakfast or morning meeting package',
  boxed: 'Boxed or grab-and-go lunch',
  horsDoeuvres: 'Heavy hors d’oeuvres reception',
  holidayTrays: 'At-home trays with simple finishing',
  buffet: 'Full buffet with service planning',
};

const directionCopy: Record<DirectionType, (input: PlannerInput) => string> = {
  breakfast: (input) =>
    `${input.guestCount} guests should start with a morning package: easy breakfast mains, fruit, coffee, and clear setup timing.`,
  boxed: (input) =>
    `${input.guestCount} guests point toward a low-mess boxed or grab-and-go lunch with a small set of diet-safe alternatives.`,
  horsDoeuvres: (input) =>
    `${input.guestCount} guests are a fit for heavy hors d’oeuvres built for mingling, with hot and cold choices and a service plan.`,
  holidayTrays: (input) =>
    `${input.guestCount} guests should use at-home trays that travel well, with reheating, serving, and pickup timing clarified.`,
  buffet: (input) =>
    `${input.guestCount} guests call for a full buffet direction with entree variety, sides, and service logistics discussed before quoting.`,
};

function chooseDirection(input: PlannerInput): DirectionType {
  if (input.eventTime === 'breakfast/morning') return 'breakfast';
  if (input.eventType === 'At-home party / holiday' && input.mealRole === 'take-home trays') return 'holidayTrays';
  if (
    input.mealRole === 'boxed / grab-and-go' ||
    (input.eventType === 'Office lunch or training' && input.eventTime === 'lunch' && input.serviceStyle === 'drop-off catering')
  ) return 'boxed';
  if (
    input.mealRole === 'heavy hors d’oeuvres' ||
    input.eventType === 'Cocktail party' ||
    (input.eventType === 'Corporate event / open house' && input.eventTime === 'evening') ||
    (input.mealRole === 'light snacks' && input.guestCount < 100)
  ) return 'horsDoeuvres';
  return 'buffet';
}

function buildSpread(input: PlannerInput, directionType: DirectionType): string[] {
  const countGuidance = getCountGuidance(input.guestCount, directionType);
  const dietaryGuidance = getDietaryGuidance(input);
  const crowdGuidance = getCrowdGuidance(input);

  const base: Record<DirectionType, string[]> = {
    breakfast: [
      'One simple breakfast anchor such as breakfast sandwiches, casserole, or pastry assortment.',
      'Fruit, coffee, water, and a small protein-forward option so it feels like a meal.',
    ],
    boxed: [
      'Two or three box types: familiar sandwich or entree, one lighter option, and a vegetarian default.',
      'Label gluten-free or dairy-free boxes separately and keep sauces or dressings on the side.',
    ],
    horsDoeuvres: [
      countGuidance,
      'Balance passed or stationed bites with at least one substantial item if this replaces dinner.',
      'Mix hot, cold, vegetarian, and easy one-handed pieces for standing guests.',
    ],
    holidayTrays: [
      'Choose trays that hold well: one main, two sides, salad or vegetable, and dessert if the host wants a complete table.',
      'Ask for reheating, serving utensil, and pickup-window instructions in writing.',
    ],
    buffet: [
      countGuidance,
      'Plan two entree paths with two sides, salad or vegetable, bread if appropriate, and clear buffet flow.',
      'Separate a few diet-safe portions before service if restrictions are firm.',
    ],
  };

  return [...base[directionType], dietaryGuidance, crowdGuidance, getBudgetGuidance(input)];
}

function getCountGuidance(guestCount: number, directionType: DirectionType): string {
  if (directionType === 'horsDoeuvres') {
    if (guestCount >= 100) return 'Use 7-9 appetizer selections and confirm piece counts, replenishment, and staffing.';
    if (guestCount >= 60) return 'Use 6-8 appetizer selections with a hot/cold split and a clear plan for replenishment.';
    return 'Use 4-6 appetizer selections so the menu feels complete without getting scattered.';
  }
  if (guestCount >= 100) return 'For 100+ guests, make staffing, line flow, and replenishment part of the first quote conversation.';
  if (guestCount >= 60) return 'For 60-99 guests, add enough variety to prevent bottlenecks and repeated identical plates.';
  return 'For 40-59 guests, keep the menu tight: usually two entrees and two sides are enough.';
}

function getDietaryGuidance(input: PlannerInput): string {
  if (input.dietaryNeeds.length === 0) return 'Ask guests about vegetarian, gluten-free, dairy-free, and allergy needs before locking the quote.';
  return `Build in visible coverage for ${input.dietaryNeeds.join(', ')}; ask the caterer which items can be safely separated and labeled.`;
}

function getCrowdGuidance(input: PlannerInput): string {
  const map: Record<CrowdProfile, string> = {
    'conservative eaters': 'Keep most choices familiar and use one optional bolder item for variety.',
    'adventurous/coastal': 'Include one or two more distinctive coastal or seasonal choices, but keep a reliable anchor.',
    'mixed corporate crowd': 'Favor broad-appeal choices, clean labeling, and foods that are easy to eat during conversation.',
    'kids/families': 'Include simple items, modest spice, and portions that work for both adults and children.',
    'older crowd': 'Prioritize easy-to-serve portions, moderate seasoning, and comfortable seating or plate handling.',
  };
  return map[input.crowdProfile];
}

function getBudgetGuidance(input: PlannerInput): string {
  const map: Record<BudgetPosture, string> = {
    economical: 'Keep the spread focused and ask which add-ons create the most value per guest.',
    balanced: 'Use the budget on the core meal first, then add dessert, beverages, or a signature item if room allows.',
    elevated: 'Spend on presentation, better entree variety, and service polish before adding too many extra items.',
    'impress them without going insane': 'Choose one memorable feature and keep the rest operationally simple.',
  };
  return map[input.budgetPosture];
}

function buildReasons(input: PlannerInput, directionType: DirectionType): string[] {
  const reasons = [
    `${input.eventType.toLowerCase()} plus ${input.eventTime} timing shapes how formal and filling the food needs to be.`,
    `${input.serviceStyle} changes the likely per-person range and which hidden fees need to be discussed.`,
  ];
  if (directionType === 'boxed') reasons.unshift('The event sounds time-boxed and low-mess, so individual portions reduce decision friction.');
  if (directionType === 'horsDoeuvres') reasons.unshift('Guests are likely moving around, so variety and one-handed foods matter more than plated structure.');
  if (directionType === 'buffet') reasons.unshift('A full meal and larger headcount need variety, line flow, and replenishment planning.');
  if (directionType === 'holidayTrays') reasons.unshift('Pickup or at-home hosting makes transport, reheating, and serving instructions part of the product.');
  if (directionType === 'breakfast') reasons.unshift('Morning events work best when caffeine, timing, and simple setup are solved first.');
  if (input.includeAlcohol) reasons.push('Alcohol can materially change the quote; open bars often add a separate per-person range.');
  if (input.rentalNeeds.length > 0) reasons.push('Rentals move the estimate beyond food cost; plates, linens, tables, and tents can be their own line items.');
  if (input.venueSupport !== 'not sure') reasons.push(`Venue support is marked as ${input.venueSupport}, so the quote should separate what the venue provides from what the caterer must bring.`);
  if (input.setupWindow !== 'not sure') reasons.push(`Setup window is ${input.setupWindow}; this changes vendor arrival, buffet setup, and cleanup pressure.`);
  if (input.parkingShuttleConcern || input.guestCount > 65) reasons.push('Parking or shuttle flow can affect guest arrival timing and service start, especially above roughly 65 guests.');
  if (input.guestCount >= 100) reasons.push('At 100+ guests, logistics can affect the experience as much as menu selection.');
  if (input.guestCount >= 40) reasons.push('The plan starts at 40 guests, matching the common minimum noted in the research brief.');
  return reasons;
}

function buildRiskFlags(input: PlannerInput, directionType: DirectionType): string[] {
  const flags: string[] = [];
  if (input.dietaryNeeds.length === 0) flags.push('Dietary coverage is unknown; confirm restrictions before treating the plan as quote-ready.');
  if (input.dietaryNeeds.includes('seafood/shellfish concern')) flags.push('Shellfish or seafood concern needs separation and labeling, especially for coastal menus.');
  if (input.mealRole === 'light snacks' && (input.eventTime === 'lunch' || input.eventTime === 'evening')) flags.push('Light snacks may be read as a meal replacement at this time of day; confirm guest expectations.');
  if ((input.serviceStyle === 'drop-off catering' || input.serviceStyle === 'food truck') && input.guestCount >= 100) flags.push('Very large casual-service events still need line-flow, replenishment, and backup timing plans.');
  if ((directionType === 'buffet' || input.guestCount >= 100) && input.serviceStyle !== 'full service/staffed' && input.serviceStyle !== 'plated dinner') flags.push('Large buffet service should include a staffing or setup conversation before the caterer prices it.');
  if (input.venueSupport === 'blank space / bring everything') flags.push('Blank-space venues can turn rentals, bars, service tables, trash, ice, and power into separate budget lines.');
  if (input.venueSupport === 'not sure') flags.push('Venue-provided items are unknown; confirm tables, chairs, linens, bars, service tables, kitchen access, A/V, and trash before renting duplicates.');
  if (input.setupWindow === 'tight same-day') flags.push('Tight same-day setup can create rush fees, limited menu flexibility, or staffing pressure.');
  if (input.parkingShuttleConcern || input.guestCount > 65) flags.push('Parking, valet, or shuttle planning may be needed for this headcount before finalizing arrival and service timing.');
  if (input.budgetPosture === 'economical' && input.eventType === 'Wedding-related event') flags.push('Wedding-related events often need more service detail than an economical menu alone can solve.');
  return flags.length > 0 ? flags : ['No major red flags from the inputs; still confirm availability, staffing, and dietary details with the caterer.'];
}

function buildChecklist(input: PlannerInput, directionType: DirectionType): string[] {
  const checklist = [
    'Confirm event date, location, start time, and serving window.',
    'Ask what serving utensils, plates, napkins, cups, ice, and trash handling are included.',
    'Clarify whether this is quote-prep guidance, not a final order or binding price.',
  ];
  if (directionType === 'horsDoeuvres') checklist.unshift('Confirm whether alcohol will be served and whether food needs to replace dinner.');
  if (directionType === 'boxed') checklist.unshift('Collect names or counts for special boxes before the final headcount deadline.');
  if (directionType === 'buffet') checklist.unshift('Map where the buffet line, drinks, and trash will go before service.');
  if (directionType === 'breakfast') checklist.unshift('Lock coffee quantity, drop-off time, and whether guests arrive all at once.');
  if (input.includeAlcohol) checklist.push('Ask whether bar service is open bar, beer/wine only, consumption-based, or BYOB-compatible.');
  if (input.rentalNeeds.length > 0) checklist.push(`Confirm rental responsibility for: ${input.rentalNeeds.join(', ')}.`);
  checklist.push('Confirm which items the venue already includes before paying for rentals: tables, chairs, linens, bars, food-service tables, A/V, fans, ice, trash, and power.');
  checklist.push('Confirm vendor load-in, setup, serving window, and load-out timing; these are BEO-level details, not day-of guesses.');
  if (input.parkingShuttleConcern || input.guestCount > 65) checklist.push('Ask whether parking, valet, or shuttle timing affects guest arrival and food service start.');
  if (input.guestCount >= 100) checklist.push('Discuss staffing, replenishment, and whether multiple serving stations are needed.');
  return checklist;
}

function buildQuestions(input: PlannerInput, directionType: DirectionType): string[] {
  const questions = [
    'Will guests be standing, seated, or moving between rooms?',
    'Is the food replacing a meal or supporting a shorter event?',
    'Are alcohol, desserts, drinks, ice, or coffee expected?',
    'What kitchen, refrigeration, or reheating space is available?',
    'Which dietary restrictions are firm requirements versus preferences?',
  ];
  if (directionType === 'holidayTrays') questions.push('Can the host safely transport and reheat the trays at the needed time?');
  if (directionType === 'boxed') questions.push('Should boxes be labeled by guest name, dietary need, or entree type?');
  if (input.serviceStyle === 'not sure') questions.push('Would drop-off work, or does the caterer recommend staffed setup for this guest count?');
  if (input.rentalNeeds.length > 0) questions.push('Are rentals handled by the caterer, the venue, or a separate rental vendor?');
  questions.push('Who owns the final floor plan, vendor load-in timeline, and day-of coordination handoff?');
  if (input.parkingShuttleConcern || input.guestCount > 65) questions.push('Will parking, valet, or shuttle timing change when food should be ready?');
  return questions;
}

const serviceStyleRanges: Record<ServiceStyle, [number, number]> = {
  'drop-off catering': [10, 30],
  'food truck': [15, 40],
  'buffet style': [25, 70],
  'family style': [35, 85],
  'plated dinner': [50, 150],
  'full service/staffed': [35, 95],
  'not sure': [20, 80],
};

function buildCostEstimate(input: PlannerInput): CostEstimate {
  const perPersonRange = serviceStyleRanges[input.serviceStyle];
  const foodSubtotalRange: [number, number] = [perPersonRange[0] * input.guestCount, perPersonRange[1] * input.guestCount];
  const serviceFee: [number, number] = [foodSubtotalRange[0] * 0.15, foodSubtotalRange[1] * 0.22];
  const alcohol: [number, number] = input.includeAlcohol ? [25 * input.guestCount, 60 * input.guestCount] : [0, 0];
  const rentals: [number, number] = input.rentalNeeds.length > 0 ? [10 * input.guestCount, 30 * input.guestCount] : [0, 0];
  const likelyTotalRange: [number, number] = [
    Math.round(foodSubtotalRange[0] + serviceFee[0] + alcohol[0] + rentals[0]),
    Math.round(foodSubtotalRange[1] + serviceFee[1] + alcohol[1] + rentals[1] + 600),
  ];

  return {
    perPersonRange,
    foodSubtotalRange,
    likelyTotalRange,
    nationalAverageNote: 'General catering benchmarks often land around $20–$80 per person, but service style drives the real range.',
    serviceFeeNote: 'Service fees or gratuity commonly add about 15%–22% when staff/coordinators are involved.',
    alcoholNote: input.includeAlcohol ? 'Open bar or beer/wine service can add roughly $25–$60+ per person.' : undefined,
    rentalNote: input.rentalNeeds.length > 0 ? 'Rentals such as plates, glassware, linens, tables, chairs, or tents can add roughly $10–$30+ per person.' : undefined,
    travelTaxNote: 'Taxes and travel can add local tax plus roughly $100–$600+ depending on distance and venue needs.',
    dateNote: getDateNote(input.eventDate),
  };
}

function getDateNote(eventDate: string): string {
  if (!eventDate) return 'No date entered yet; the caterer still needs the date to confirm availability and deposits.';
  const date = new Date(`${eventDate}T12:00:00`);
  if (Number.isNaN(date.getTime())) return 'Date could not be read; confirm it directly with the caterer.';
  const days = Math.ceil((date.getTime() - Date.now()) / 86_400_000);
  if (days < 0) return 'This date appears to be in the past; double-check the event date.';
  if (days <= 14) return 'This is a tight timeline; availability, rush fees, and menu flexibility may be limited.';
  if (days <= 45) return 'This is close enough that availability, deposits, and staffing should be confirmed quickly.';
  return 'This date gives more room for menu planning, deposits, staffing, and rental coordination.';
}

function money(value: number): string {
  return value.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
}

export function formatRange(range: [number, number]): string {
  return `${money(range[0])}–${money(range[1])}`;
}

function buildSummary(input: PlannerInput, shortLabel: string, spread: string[], riskFlags: string[], cost: CostEstimate): string {
  const dietary = input.dietaryNeeds.length > 0 ? input.dietaryNeeds.join(', ') : 'not yet confirmed';
  const rentals = input.rentalNeeds.length > 0 ? input.rentalNeeds.join(', ') : 'not requested yet';
  const notes = input.notes.trim() ? ` Notes: ${input.notes.trim()}` : '';
  return [
    `I am planning catering for about ${input.guestCount} guests${input.eventDate ? ` on ${input.eventDate}` : ''}.`,
    `Event context: ${input.eventType}, ${input.eventTime}, meal role is ${input.mealRole}.`,
    `Preferred service: ${input.serviceStyle}. Budget posture: ${input.budgetPosture}. Crowd: ${input.crowdProfile}.`,
    `Dietary needs: ${dietary}. Alcohol: ${input.includeAlcohol ? 'yes/possibly' : 'not currently planned'}. Rentals: ${rentals}.${notes}`,
    `Venue/logistics: ${input.venueSupport}; setup window: ${input.setupWindow}; parking/shuttle concern: ${input.parkingShuttleConcern || input.guestCount > 65 ? 'yes/check it' : 'not flagged'}.`,
    `Recommended direction: ${shortLabel}.`,
    `Early planning estimate: food ${formatRange(cost.foodSubtotalRange)}, likely all-in ${formatRange(cost.likelyTotalRange)} before exact menu/tax/venue details.`,
    `Suggested structure: ${spread.slice(0, 3).join(' ')}`,
    `Items to clarify before quoting: ${riskFlags.join(' ')}`,
  ].join('\n');
}
