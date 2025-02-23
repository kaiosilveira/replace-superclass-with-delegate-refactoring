import { CatalogItem } from '../catalog/item/index.js';

export class Scroll extends CatalogItem {
  constructor(id, title, tags, dateLastCleaned) {
    super(id, title, tags);
    this._catalogItem = new CatalogItem(id, title, tags);
    this._lastCleaned = dateLastCleaned;
  }

  get id() {
    return this._catalogItem.id;
  }

  get title() {
    return this._catalogItem.title;
  }

  needsCleaning(targetDate) {
    const threshold = this.hasTag('revered') ? 700 : 1500;
    return this.daysSinceLastCleaning(targetDate) > threshold;
  }

  daysSinceLastCleaning(targetDate) {
    return this._lastCleaned.until(targetDate, 'days');
  }
}
