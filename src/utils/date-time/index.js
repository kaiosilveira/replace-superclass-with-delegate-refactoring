export class ManagedDateTime extends Date {
  constructor(date) {
    super(date);
  }

  until(anotherDate, _measurement) {
    const self = this.getTime();
    const target = anotherDate.getTime();

    const differenceMs = Math.abs(target - self);

    return Math.ceil(differenceMs / (1000 * 60 * 60 * 24));
  }
}
