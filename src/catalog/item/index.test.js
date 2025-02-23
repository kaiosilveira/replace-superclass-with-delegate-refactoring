import { CatalogItem } from '.';

describe('CatalogItem', () => {
  it('should have an id', () => {
    const item = new CatalogItem(1, 'Regular Scroll', []);
    expect(item.id).toBe(1);
  });

  it('should have a title', () => {
    const item = new CatalogItem(1, 'Regular Scroll', []);
    expect(item.title).toBe('Regular Scroll');
  });

  describe('hasTag', () => {
    it('should return true if the tag is present', () => {
      const item = new CatalogItem(1, 'Regular Scroll', ['revered']);
      expect(item.hasTag('revered')).toBe(true);
    });

    it('should return false if the tag is not present', () => {
      const item = new CatalogItem(1, 'Regular Scroll', ['revered']);
      expect(item.hasTag('regular')).toBe(false);
    });
  });
});
