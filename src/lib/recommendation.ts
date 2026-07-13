export const dietaryOptions = [
  'vegetarian',
  'vegan',
  'gluten-free',
  'dairy-free',
  'seafood/shellfish concern',
  'pork avoidance',
] as const;

export type DietaryNeed = (typeof dietaryOptions)[number];

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
export type ServiceStyle = 'pickup' | 'delivery/drop-off' | 'full service/staffed' | 'not sure';
export type BudgetPosture = 'economical' | 'balanced' | 'elevated' | 'impress them without going insane';
export type CrowdProfile =
  | 'conservative eaters'
  | 'adventurous/coastal'
  | 'mixed corporate crowd'
  | 'kids/families'
  | 'older crowd';

export type PlannerInput = {
  guestCount: number;
  eventType: EventType;
  mealRole: MealRole;
  eventTime: EventTime;
  serviceStyle: ServiceStyle;
  budgetPosture: BudgetPosture;
  crowdProfile: CrowdProfile;
  dietaryNeeds: DietaryNeed[];
  notes: string;
};

export type Recommendation = {
  direction: string;
  shortLabel: string;
  spread: string[];
  reasons: string[];
  checklist: string[];
  riskFlags: string[];
  catererQuestions: string[];
  summary: string;
};

export const defaultInput: PlannerInput = {
  guestCount: 40,
  eventType: 'Corporate event / open house',
  mealRole: 'full meal buffet',
  eventTime: 'lunch',
  serviceStyle: 'delivery/drop-off',
  budgetPosture: 'balanced',
  crowdProfile: 'mixed corporate crowd',
  dietaryNeeds: ['vegetarian', 'gluten-free'],
  notes: '',
};

export const presets: Record<string, PlannerInput> = {
  corporateLunch: {
    guestCount: 40,
    eventType: 'Office lunch or training',
    mealRole: 'boxed / grab-and-go',
    eventTime: 'lunch',
    serviceStyle: 'delivery/drop-off',
    budgetPosture: 'balanced',
    crowdProfile: 'mixed corporate crowd',
    dietaryNeeds: ['vegetarian', 'gluten-free'],
    notes: 'Training day. Keep setup simple and avoid messy foods.',
  },
  cocktailOpenHouse: {
    guestCount: 75,
    eventType: 'Corporate event / open house',
    mealRole: 'heavy hors d’oeuvres',
    eventTime: 'evening',
    serviceStyle: 'full service/staffed',
    budgetPosture: 'impress them without going insane',
    crowdProfile: 'adventurous/coastal',
    dietaryNeeds: ['vegetarian', 'seafood/shellfish concern'],
    notes: 'Guests will be standing and alcohol may be served.',
  },
  weddingFullMeal: {
    guestCount: 120,
    eventType: 'Wedding-related event',
    mealRole: 'full meal buffet',
    eventTime: 'evening',
    serviceStyle: 'not sure',
    budgetPosture: 'elevated',
    crowdProfile: 'mixed corporate crowd',
    dietaryNeeds: ['vegetarian', 'gluten-free', 'dairy-free'],
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

  return {
    direction,
    shortLabel,
    spread,
    reasons,
    riskFlags,
    checklist,
    catererQuestions,
    summary: buildSummary(input, shortLabel, spread, riskFlags),
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
  if (input.eventType === 'At-home party / holiday' && (input.mealRole === 'take-home trays' || input.serviceStyle === 'pickup')) {
    return 'holidayTrays';
  }
  if (
    input.mealRole === 'boxed / grab-and-go' ||
    (input.eventType === 'Office lunch or training' &&
      input.eventTime === 'lunch' &&
      (input.serviceStyle === 'pickup' || input.serviceStyle === 'delivery/drop-off'))
  ) {
    return 'boxed';
  }
  if (
    input.mealRole === 'heavy hors d’oeuvres' ||
    input.eventType === 'Cocktail party' ||
    (input.eventType === 'Corporate event / open house' && input.eventTime === 'evening') ||
    (input.mealRole === 'light snacks' && input.guestCount < 100)
  ) {
    return 'horsDoeuvres';
  }
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
  if (input.dietaryNeeds.length === 0) {
    return 'Ask guests about vegetarian, gluten-free, dairy-free, and allergy needs before locking the quote.';
  }

  const needs = input.dietaryNeeds.join(', ');
  return `Build in visible coverage for ${needs}; ask the caterer which items can be safely separated and labeled.`;
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
    `${input.serviceStyle} service changes how much setup, labeling, staffing, and cleanup should be discussed before a quote.`,
  ];

  if (directionType === 'boxed') reasons.unshift('The event sounds time-boxed and low-mess, so individual portions reduce decision friction.');
  if (directionType === 'horsDoeuvres') reasons.unshift('Guests are likely moving around, so variety and one-handed foods matter more than plated structure.');
  if (directionType === 'buffet') reasons.unshift('A full meal and larger headcount need variety, line flow, and replenishment planning.');
  if (directionType === 'holidayTrays') reasons.unshift('Pickup or at-home hosting makes transport, reheating, and serving instructions part of the product.');
  if (directionType === 'breakfast') reasons.unshift('Morning events work best when caffeine, timing, and simple setup are solved first.');

  if (input.guestCount >= 100) reasons.push('At 100+ guests, logistics can affect the experience as much as menu selection.');
  if (input.guestCount >= 40) reasons.push('The plan starts at 40 guests, matching the common minimum noted in the research brief.');

  return reasons;
}

function buildRiskFlags(input: PlannerInput, directionType: DirectionType): string[] {
  const flags: string[] = [];

  if (input.dietaryNeeds.length === 0) flags.push('Dietary coverage is unknown; confirm restrictions before treating the plan as quote-ready.');
  if (input.dietaryNeeds.includes('seafood/shellfish concern')) flags.push('Shellfish or seafood concern needs separation and labeling, especially for coastal menus.');
  if (input.mealRole === 'light snacks' && (input.eventTime === 'lunch' || input.eventTime === 'evening')) {
    flags.push('Light snacks may be read as a meal replacement at this time of day; confirm guest expectations.');
  }
  if (input.serviceStyle === 'pickup' && input.guestCount >= 60) {
    flags.push('Pickup for 60+ guests can create transport, temperature, and setup strain for the host.');
  }
  if ((directionType === 'buffet' || input.guestCount >= 100) && input.serviceStyle !== 'full service/staffed') {
    flags.push('Large buffet service should include a staffing or setup conversation before the caterer prices it.');
  }
  if (input.budgetPosture === 'economical' && input.eventType === 'Wedding-related event') {
    flags.push('Wedding-related events often need more service detail than an economical menu alone can solve.');
  }

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

  return questions;
}

function buildSummary(input: PlannerInput, shortLabel: string, spread: string[], riskFlags: string[]): string {
  const dietary = input.dietaryNeeds.length > 0 ? input.dietaryNeeds.join(', ') : 'not yet confirmed';
  const notes = input.notes.trim() ? ` Notes: ${input.notes.trim()}` : '';

  return [
    `I am planning catering for about ${input.guestCount} guests.`,
    `Event context: ${input.eventType}, ${input.eventTime}, meal role is ${input.mealRole}.`,
    `Preferred service: ${input.serviceStyle}. Budget posture: ${input.budgetPosture}. Crowd: ${input.crowdProfile}.`,
    `Dietary needs to plan for: ${dietary}.${notes}`,
    `Recommended direction: ${shortLabel}.`,
    `Suggested structure: ${spread.slice(0, 3).join(' ')}`,
    `Items to clarify before quoting: ${riskFlags.join(' ')}`,
  ].join('\n');
}
