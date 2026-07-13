import { describe, expect, it } from 'vitest';
import { buildRecommendation, presets } from './recommendation';

describe('buildRecommendation', () => {
  it('recommends boxed or grab-and-go for a 40-person corporate lunch', () => {
    const result = buildRecommendation(presets.corporateLunch);

    expect(result.shortLabel).toBe('Boxed or grab-and-go lunch');
    expect(result.summary).toContain('40 guests');
    expect(result.spread.join(' ')).toContain('vegetarian');
  });

  it('recommends heavy hors d’oeuvres for a 75-person evening open house', () => {
    const result = buildRecommendation(presets.cocktailOpenHouse);

    expect(result.shortLabel).toBe('Heavy hors d’oeuvres reception');
    expect(result.spread.join(' ')).toContain('6-8 appetizer selections');
    expect(result.riskFlags.join(' ')).toContain('Shellfish');
  });

  it('recommends full buffet and logistics warnings for a 120-person wedding meal', () => {
    const result = buildRecommendation(presets.weddingFullMeal);

    expect(result.shortLabel).toBe('Full buffet with service planning');
    expect(result.reasons.join(' ')).toContain('100+ guests');
    expect(result.riskFlags.join(' ')).toContain('staffing');
  });
});
