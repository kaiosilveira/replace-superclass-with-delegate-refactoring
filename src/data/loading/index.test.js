import { loadScrollsFrom } from '.';
import { CatalogItem } from '../../catalog/item';

describe('loadScrollsFrom', () => {
  it('should load a list of scrolls and map their data', () => {
    const aDocument = [
      {
        id: 1,
        catalogData: { id: 1, title: 'Revered Scroll', tags: ['revered'] },
        lastCleaned: '2021-01-01',
      },
      {
        id: 2,
        catalogData: { id: 2, title: 'Regular Scroll', tags: [] },
        lastCleaned: '2021-01-01',
      },
    ];

    const catalog = {
      get: id => {
        const r = aDocument.find(record => record.id === id);
        return new CatalogItem(r.id, r.catalogData.title, r.catalogData.tags);
      },
    };

    const scrolls = loadScrollsFrom(aDocument, catalog);

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
