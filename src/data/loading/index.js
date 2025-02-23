import { Scroll } from '../../scroll/index.js';
import { ManagedDateTime } from '../../utils/date-time/index.js';

export function loadScrollsFrom(aDocument, catalog) {
  const scrolls = aDocument.map(
    record =>
      new Scroll(record.id, new ManagedDateTime(record.lastCleaned), record.catalogData.id, catalog)
  );

  return scrolls;
}
