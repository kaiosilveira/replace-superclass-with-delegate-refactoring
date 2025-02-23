import { loadScrollsFrom } from '.';

describe('loadScrollsFrom', () => {
  it('should load a list of scrolls and map their data', () => {
    const aDocument = [
      {
        id: 1,
        catalogData: { title: 'Revered Scroll', tags: ['revered'] },
        lastCleaned: '2021-01-01',
      },
      {
        id: 2,
        catalogData: { title: 'Regular Scroll', tags: [] },
        lastCleaned: '2021-01-01',
      },
    ];

    const scrolls = loadScrollsFrom(aDocument);

    expect(scrolls.length).toBe(2);

    const [reveredScroll, regularScroll] = scrolls;

    expect(reveredScroll.id).toBe(1);
    expect(reveredScroll.title).toBe('Revered Scroll');
    expect(reveredScroll.hasTag('revered')).toBe(true);

    expect(regularScroll.id).toBe(2);
    expect(regularScroll.title).toBe('Regular Scroll');
    expect(regularScroll.hasTag('revered')).toBe(false);
  });
});
