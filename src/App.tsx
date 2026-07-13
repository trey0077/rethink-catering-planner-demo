import { Clipboard, ListChecks, MessageSquareText, Sparkles, TriangleAlert, Utensils } from 'lucide-react';
import { useMemo, useState } from 'react';
import {
  buildRecommendation,
  defaultInput,
  dietaryOptions,
  type BudgetPosture,
  type CrowdProfile,
  type DietaryNeed,
  type EventTime,
  type EventType,
  type MealRole,
  type PlannerInput,
  presets,
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
const serviceStyles: ServiceStyle[] = ['pickup', 'delivery/drop-off', 'full service/staffed', 'not sure'];
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
      return {
        ...current,
        dietaryNeeds: exists ? current.dietaryNeeds.filter((item) => item !== need) : [...current.dietaryNeeds, need],
      };
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
            A local, static demo showing how caterers can use their own menu knowledge, event rules, and intake
            questions to turn uncertainty into a consultation-ready request.
          </p>
          <div className="hero-points" aria-label="Demo positioning">
            <span>40-person minimum made visible</span>
            <span>Plain-English quote prep</span>
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

          <label className="field guest-field">
            <span>Guest count</span>
            <input
              type="number"
              min={1}
              value={input.guestCount}
              onChange={(event) => update('guestCount', Number(event.target.value) || 1)}
            />
            <small>Bay Gourmet research note: all orders listed a 40-person minimum.</small>
          </label>

          <div className="field-grid">
            <SelectField label="Event type" value={input.eventType} options={eventTypes} onChange={(value) => update('eventType', value)} />
            <SelectField label="Meal role" value={input.mealRole} options={mealRoles} onChange={(value) => update('mealRole', value)} />
            <SelectField label="Event time" value={input.eventTime} options={eventTimes} onChange={(value) => update('eventTime', value)} />
            <SelectField
              label="Service style"
              value={input.serviceStyle}
              options={serviceStyles}
              onChange={(value) => update('serviceStyle', value)}
            />
            <SelectField
              label="Budget posture"
              value={input.budgetPosture}
              options={budgetPostures}
              onChange={(value) => update('budgetPosture', value)}
            />
            <SelectField
              label="Crowd profile"
              value={input.crowdProfile}
              options={crowdProfiles}
              onChange={(value) => update('crowdProfile', value)}
            />
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

          <label className="field">
            <span>Notes or special requests</span>
            <textarea
              value={input.notes}
              onChange={(event) => update('notes', event.target.value)}
              placeholder="Example: guests will be standing, alcohol may be served, keep setup simple..."
            />
          </label>
        </div>

        <div className="results-view">
          <ResultPanel icon={<Utensils />} title="Best-fit catering direction">
            <p className="direction-label">{recommendation.shortLabel}</p>
            <p>{recommendation.direction}</p>
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
              Rethink can turn your real menu, service constraints, minimums, and quote questions into a guided planner
              that gives customers 80% of the decision before they call.
            </p>
          </section>
        </div>
      </section>
    </main>
  );
}

type SelectFieldProps<T extends string> = {
  label: string;
  value: T;
  options: T[];
  onChange: (value: T) => void;
};

function SelectField<T extends string>({ label, value, options, onChange }: SelectFieldProps<T>) {
  return (
    <label className="field">
      <span>{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value as T)}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

type ResultPanelProps = {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
};

function ResultPanel({ icon, title, children }: ResultPanelProps) {
  return (
    <section className="result-panel">
      <div className="panel-title">
        {icon}
        <h3>{title}</h3>
      </div>
      {children}
    </section>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}
