import { Scroll } from '.';
import { ManagedDateTime } from '../utils/date-time';
import { CatalogItem } from '../catalog/item';

const CATALOG_ITEMS = [
  new CatalogItem(1, 'Regular Scroll', []),
  new CatalogItem(2, 'Revered Scroll', ['revered']),
];

const catalog = { get: id => CATALOG_ITEMS.find(item => item.id === id) };

describe('Scroll', () => {
  const lastCleaningDate = new ManagedDateTime('2021-01-01');

  it('should have an id', () => {
    const scroll = new Scroll(1, 'Regular Scroll', [], lastCleaningDate, 1, catalog);
    expect(scroll.id).toBe(1);
  });

  it('should have a title', () => {
    const scroll = new Scroll(1, 'Regular Scroll', [], lastCleaningDate, 1, catalog);
    expect(scroll.title).toBe('Regular Scroll');
  });

  describe('hasTag', () => {
    const scroll = new Scroll(1, 'Regular Scroll', ['revered'], lastCleaningDate, 2, catalog);

    it('should return true if the tag is present', () => {
      expect(scroll.hasTag('revered')).toBe(true);
    });

    it('should return false if the tag is not present', () => {
      expect(scroll.hasTag('regular')).toBe(false);
    });
  });

  describe('daysSinceLastCleaning', () => {
    it('should return the difference in days between last cleaned date and target date', () => {
      const scroll = new Scroll(2, 'Revered Scroll', ['revered'], lastCleaningDate, 2, catalog);
      const targetDate = new ManagedDateTime('2021-01-02');
      expect(scroll.daysSinceLastCleaning(targetDate)).toBe(1);
    });
  });

  describe('needsCleaning', () => {
    describe('revered scrolls', () => {
      const sixHundredAndNinetyNineDaysLater = new ManagedDateTime('2022-11-31');
      const sevenHundredAndOneDaysLater = new ManagedDateTime('2022-12-03');
      const scroll = new Scroll(2, 'Revered Scroll', ['revered'], lastCleaningDate, 2, catalog);

      it('should return true if date last cleaned is greater than 700', () => {
        expect(scroll.needsCleaning(sevenHundredAndOneDaysLater)).toBe(true);
      });

      it('should return false if date last cleaned is less than 700', () => {
        expect(scroll.needsCleaning(sixHundredAndNinetyNineDaysLater)).toBe(false);
      });
    });

    describe('regular scrolls', () => {
      const fourteenHundredAndNinetyNineDaysLater = new ManagedDateTime('2025-02-08');
      const fifteenHundredAndOneDaysLater = new ManagedDateTime('2025-02-10');

      const scroll = new Scroll(1, 'Regular Scroll', [], lastCleaningDate, 1, catalog);

      it('should return true if date last cleaned is greater than 1500', () => {
        expect(scroll.needsCleaning(fifteenHundredAndOneDaysLater)).toBe(true);
      });

      it('should return false if date last cleaned is less than 1500', () => {
        expect(scroll.needsCleaning(fourteenHundredAndNinetyNineDaysLater)).toBe(false);
      });
    });
  });
});
