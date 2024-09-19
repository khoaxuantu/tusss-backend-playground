export class NumberHelper {
  static randomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  static randomArbitrary(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }
}
