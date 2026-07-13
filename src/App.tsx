import { CalendarDays, Clipboard, DollarSign, ListChecks, MessageSquareText, Sparkles, TriangleAlert, Utensils } from 'lucide-react';
import { useMemo, useState } from 'react';
import {
  buildRecommendation,
  defaultInput,
  dietaryOptions,
  formatRange,
  rentalOptions,
  type BudgetPosture,
  type CrowdProfile,
  type DietaryNeed,
  type EventTime,
  type EventType,
  type MealRole,
  type PlannerInput,
  presets,
  type RentalNeed,
  type ServiceStyle,
} from './lib/recommendation';

const eventTypes: EventType[] = [
  'Corporate event / open house',
  'Office lunch or training',
  'Cocktail party',
  'At-home party / holiday',
  'Wedding-related event',
  'Other',
];

const mealRoles: MealRole[] = ['light snacks', 'heavy hors d’oeuvres', 'full meal buffet', 'boxed / grab-and-go', 'take-home trays'];
const eventTimes: EventTime[] = ['breakfast/morning', 'lunch', 'afternoon', 'evening'];
const serviceStyles: ServiceStyle[] = ['drop-off catering', 'food truck', 'buffet style', 'family style', 'plated dinner', 'full service/staffed', 'not sure'];
const budgetPostures: BudgetPosture[] = ['economical', 'balanced', 'elevated', 'impress them without going insane'];
const crowdProfiles: CrowdProfile[] = [
  'conservative eaters',
  'adventurous/coastal',
  'mixed corporate crowd',
  'kids/families',
  'older crowd',
];

const presetButtons = [
  ['40-person corporate lunch', presets.corporateLunch],
  ['75-person cocktail/open house', presets.cocktailOpenHouse],
  ['120-person wedding/full meal', presets.weddingFullMeal],
] as const;

export function App() {
  const [input, setInput] = useState<PlannerInput>(defaultInput);
  const [copied, setCopied] = useState(false);
  const recommendation = useMemo(() => buildRecommendation(input), [input]);

  function update<K extends keyof PlannerInput>(key: K, value: PlannerInput[K]) {
    setInput((current) => ({ ...current, [key]: value }));
  }

  function toggleDietaryNeed(need: DietaryNeed) {
    setInput((current) => {
      const exists = current.dietaryNeeds.includes(need);
      return { ...current, dietaryNeeds: exists ? current.dietaryNeeds.filter((item) => item !== need) : [...current.dietaryNeeds, need] };
    });
  }

  function toggleRentalNeed(need: RentalNeed) {
    setInput((current) => {
      const exists = current.rentalNeeds.includes(need);
      return { ...current, rentalNeeds: exists ? current.rentalNeeds.filter((item) => item !== need) : [...current.rentalNeeds, need] };
    });
  }

  async function copySummary() {
    await navigator.clipboard.writeText(recommendation.summary);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <main>
      <section className="hero-section">
        <div className="hero-copy">
          <p className="eyebrow">Rethink Strategy buyer-decision-tool demo</p>
          <h1>Have 40+ people coming? Don’t start with a menu. Start with the event.</h1>
          <p className="hero-text">
            A local, static demo showing how caterers can use their own menu knowledge, event rules, date constraints,
            pricing ranges, rentals, and intake questions to turn uncertainty into a consultation-ready request.
          </p>
          <div className="hero-points" aria-label="Demo positioning">
            <span>40-person minimum made visible</span>
            <span>Estimated cost ranges</span>
            <span>Hidden-fee prompts</span>
            <span>No live pricing or availability claims</span>
          </div>
        </div>
        <aside className="minimum-panel" aria-label="Default guest count">
          <span className="small-label">Default planning floor</span>
          <strong>40 guests</strong>
          <p>Many caterers set minimums. This demo starts where a real quote conversation often begins.</p>
        </aside>
      </section>

      <section className="planner-shell" aria-label="Catering planner">
        <div className="planner-form">
          <div className="section-heading">
            <p className="eyebrow">Event context</p>
            <h2>Plan Food for 40+ Guests</h2>
          </div>

          <div className="presets" aria-label="Demo presets">
            {presetButtons.map(([label, preset]) => (
              <button key={label} type="button" onClick={() => setInput(preset)} className="preset-button">
                {label}
              </button>
            ))}
          </div>

          <div className="field-grid">
            <label className="field guest-field">
              <span>Guest count</span>
              <input type="number" min={1} value={input.guestCount} onChange={(event) => update('guestCount', Number(event.target.value) || 1)} />
              <small>Bay Gourmet research note: all orders listed a 40-person minimum.</small>
            </label>
            <label className="field">
              <span>Event date</span>
              <input type="date" value={input.eventDate} onChange={(event) => update('eventDate', event.target.value)} />
              <small>Used to flag availability, deposit, and rush-timeline issues.</small>
            </label>
          </div>

          <div className="field-grid">
            <SelectField label="Event type" value={input.eventType} options={eventTypes} onChange={(value) => update('eventType', value)} />
            <SelectField label="Meal role" value={input.mealRole} options={mealRoles} onChange={(value) => update('mealRole', value)} />
            <SelectField label="Event time" value={input.eventTime} options={eventTimes} onChange={(value) => update('eventTime', value)} />
            <SelectField label="Service / pricing style" value={input.serviceStyle} options={serviceStyles} onChange={(value) => update('serviceStyle', value)} />
            <SelectField label="Budget posture" value={input.budgetPosture} options={budgetPostures} onChange={(value) => update('budgetPosture', value)} />
            <SelectField label="Crowd profile" value={input.crowdProfile} options={crowdProfiles} onChange={(value) => update('crowdProfile', value)} />
          </div>

          <fieldset className="dietary-field">
            <legend>Dietary needs</legend>
            <div className="checkbox-grid">
              {dietaryOptions.map((need) => (
                <label key={need} className="checkbox-pill">
                  <input type="checkbox" checked={input.dietaryNeeds.includes(need)} onChange={() => toggleDietaryNeed(need)} />
                  <span>{need}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset className="dietary-field">
            <legend>Likely add-ons / rentals</legend>
            <div className="checkbox-grid">
              <label className="checkbox-pill">
                <input type="checkbox" checked={input.includeAlcohol} onChange={(event) => update('includeAlcohol', event.target.checked)} />
                <span>bar / alcohol service</span>
              </label>
              {rentalOptions.map((need) => (
                <label key={need} className="checkbox-pill">
                  <input type="checkbox" checked={input.rentalNeeds.includes(need)} onChange={() => toggleRentalNeed(need)} />
                  <span>{need}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <label className="field">
            <span>Notes or special requests</span>
            <textarea value={input.notes} onChange={(event) => update('notes', event.target.value)} placeholder="Example: guests will be standing, alcohol may be served, keep setup simple..." />
          </label>
        </div>

        <div className="results-view">
          <ResultPanel icon={<Utensils />} title="Best-fit catering direction">
            <p className="direction-label">{recommendation.shortLabel}</p>
            <p>{recommendation.direction}</p>
          </ResultPanel>

          <ResultPanel icon={<DollarSign />} title="Early cost range">
            <div className="estimate-grid">
              <Metric label="Per person food/service style" value={formatRange(recommendation.costEstimate.perPersonRange)} />
              <Metric label="Food subtotal" value={formatRange(recommendation.costEstimate.foodSubtotalRange)} />
              <Metric label="Likely planning range" value={formatRange(recommendation.costEstimate.likelyTotalRange)} highlight />
            </div>
            <Bullets
              items={[
                recommendation.costEstimate.nationalAverageNote,
                recommendation.costEstimate.serviceFeeNote,
                ...(recommendation.costEstimate.alcoholNote ? [recommendation.costEstimate.alcoholNote] : []),
                ...(recommendation.costEstimate.rentalNote ? [recommendation.costEstimate.rentalNote] : []),
                recommendation.costEstimate.travelTaxNote,
              ]}
            />
          </ResultPanel>

          <ResultPanel icon={<CalendarDays />} title="Date and availability note">
            <p>{recommendation.costEstimate.dateNote}</p>
          </ResultPanel>

          <ResultPanel icon={<Sparkles />} title="Suggested spread">
            <Bullets items={recommendation.spread} />
          </ResultPanel>

          <ResultPanel icon={<MessageSquareText />} title="Why this makes sense">
            <Bullets items={recommendation.reasons} />
          </ResultPanel>

          <ResultPanel icon={<TriangleAlert />} title="Don’t forget">
            <Bullets items={[...recommendation.riskFlags, ...recommendation.checklist]} />
          </ResultPanel>

          <ResultPanel icon={<ListChecks />} title="Questions to ask the caterer">
            <Bullets items={recommendation.catererQuestions} />
          </ResultPanel>

          <section className="summary-panel" aria-label="Copy paste consultation summary">
            <div>
              <p className="eyebrow">Copy/paste consultation summary</p>
              <h3>Ready for a contact form or email</h3>
            </div>
            <textarea readOnly value={recommendation.summary} />
            <button type="button" className="copy-button" onClick={copySummary}>
              <Clipboard size={18} aria-hidden="true" />
              {copied ? 'Copied' : 'Copy summary'}
            </button>
          </section>

          <section className="cta-panel">
            <p className="eyebrow">Small tools for complicated buying decisions</p>
            <h3>Want this adapted to your catering menu?</h3>
            <p>
              Rethink can turn your real menu, service constraints, minimums, pricing ranges, rental rules, deposits, and
              quote questions into a guided planner that gives customers 80% of the decision before they call.
            </p>
          </section>
        </div>
      </section>
    </main>
  );
}

type SelectFieldProps<T extends string> = { label: string; value: T; options: T[]; onChange: (value: T) => void };
function SelectField<T extends string>({ label, value, options, onChange }: SelectFieldProps<T>) {
  return (
    <label className="field">
      <span>{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value as T)}>
        {options.map((option) => <option key={option} value={option}>{option}</option>)}
      </select>
    </label>
  );
}

type ResultPanelProps = { icon: React.ReactNode; title: string; children: React.ReactNode };
function ResultPanel({ icon, title, children }: ResultPanelProps) {
  return <section className="result-panel"><div className="panel-title">{icon}<h3>{title}</h3></div>{children}</section>;
}

function Metric({ label, value, highlight = false }: { label: string; value: string; highlight?: boolean }) {
  return <div className={highlight ? 'metric-card highlight' : 'metric-card'}><span>{label}</span><strong>{value}</strong></div>;
}

function Bullets({ items }: { items: string[] }) {
  return <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>;
}
