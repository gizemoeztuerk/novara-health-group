import { describe, expect, it } from 'vitest';
import { navigation, products, coverageOptions, homepageContent } from '@/data/mockData';

describe('NOVARA demo content integrity', () => {
  it('contains unique, nonempty primary navigation links', () => {
    const links = navigation.main;
    expect(links.length).toBeGreaterThan(0);
    expect(new Set(links.map((item) => item.id)).size).toBe(links.length);
    for (const link of links) {
      expect(link.href).toMatch(/^\//);
      expect(link.label.trim()).not.toBe('');
      expect(link.labelDe.trim()).not.toBe('');
    }
  });

  it('gives product cards stable slugs and bilingual descriptions', () => {
    const all = [...products.primary, ...products.supplementary, ...products.lifeStages];
    expect(all.length).toBeGreaterThan(0);
    expect(new Set(all.map((product) => product.slug)).size).toBe(all.length);
    for (const product of all) {
      expect(product.name.trim()).not.toBe('');
      expect(product.nameDe.trim()).not.toBe('');
      expect(product.shortDescription.trim()).not.toBe('');
      expect(product.shortDescriptionDe.trim()).not.toBe('');
      expect(product.features.length).toBeGreaterThan(0);
      expect(product.featuresDe.length).toBeGreaterThan(0);
    }
  });

  it('keeps dog insurance coverage options uniquely identifiable', () => {
    expect(new Set(coverageOptions.map((option) => option.id)).size).toBe(coverageOptions.length);
    expect(coverageOptions.map((option) => option.id)).toEqual(expect.arrayContaining(['basic', 'comfort', 'premium']));
  });

  it('provides hero text for both languages', () => {
    expect(homepageContent.hero.headline.trim()).not.toBe('');
    expect(homepageContent.hero.headlineDe.trim()).not.toBe('');
  });
});
