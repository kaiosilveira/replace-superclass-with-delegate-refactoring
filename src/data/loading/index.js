import { Scroll } from '../../scroll/index.js';
import { ManagedDateTime } from '../../utils/date-time/index.js';

export function loadScrollsFrom(aDocument) {
  const scrolls = aDocument.map(
    record =>
      new Scroll(
        record.id,
        record.catalogData.title,
        record.catalogData.tags,
        new ManagedDateTime(record.lastCleaned)
      )
  );

  return scrolls;
}
