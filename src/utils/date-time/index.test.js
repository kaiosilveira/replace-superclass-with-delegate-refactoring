import { ManagedDateTime } from '.';

describe('ManagedDateTime', () => {
  describe('until', () => {
    it('should return the difference in days', () => {
      const date2 = new ManagedDateTime('2021-01-02');
      const managedDate = new ManagedDateTime('2021-01-01');
      expect(managedDate.until(date2, 'days')).toBe(1);
    });
  });
});
