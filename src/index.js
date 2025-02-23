import { loadScrollsFrom } from './data/loading/index.js';

const document = [
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

const scrolls = loadScrollsFrom(document);

console.log(scrolls);
