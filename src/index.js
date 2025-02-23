import { CatalogItem } from './catalog/item/index.js';
import { loadScrollsFrom } from './data/loading/index.js';

const document = [
  {
    id: 1,
    catalogData: { id: 3, title: 'Revered Scroll', tags: ['revered'] },
    lastCleaned: '2021-01-01',
  },
  {
    id: 2,
    catalogData: { id: 4, title: 'Regular Scroll', tags: [] },
    lastCleaned: '2021-01-01',
  },
];

const catalog = {
  get: id => {
    const r = document.find(record => record.catalogData.id === id);
    return new CatalogItem(r.catalogData.id, r.catalogData.title, r.catalogData.tags);
  },
};

const scrolls = loadScrollsFrom(document, catalog);

console.log(scrolls);
