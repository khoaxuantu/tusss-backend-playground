export default class PasswordBuilder {
  SPECIAL_CHAR = "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";
  MIN_LENGTH = 8;
  MAX_LENGTH = 32;

  private needMaxLength: boolean = true;
  private needMinLength: boolean = true;
  private needUpperCase: boolean = true;
  private needLowerCase: boolean = true;
  private needNumeric: boolean = true;
  private needSpecialChar: boolean = true;
  private str: string;

  constructor() {
    this.create();
  }

  create() {
    this.str = '';
    if (this.needUpperCase) this.str += String.fromCharCode(this.getRandomArbitrary(65, 90));
    if (this.needLowerCase) this.str += String.fromCharCode(this.getRandomArbitrary(97, 122));
    if (this.needNumeric) this.str += this.getRandomArbitrary(0, 9);
    if (this.needSpecialChar)
      this.str += this.SPECIAL_CHAR[this.getRandomArbitrary(0, this.SPECIAL_CHAR.length - 1)];
    if (this.needMinLength) {
      this.str += 'a'.repeat(this.MIN_LENGTH - this.str.length);
      return;
    }
    if (this.needMaxLength) this.str += 'a'.repeat(this.MAX_LENGTH - this.str.length);
  }

  withoutMaxLength() {
    this.needMaxLength = false;
    return this;
  }

  withoutMinLength() {
    this.needMinLength = false;
    return this;
  }

  withoutUpperCase() {
    this.needUpperCase = false;
    return this;
  }

  withoutLowerCase() {
    this.needLowerCase = false;
    return this;
  }

  withoutNumeric() {
    this.needNumeric = false;
    return this;
  }

  withoutSpecialChar() {
    this.needSpecialChar = false;
    return this;
  }

  get product() {
    this.create();
    return this.str;
  }

  private getRandomArbitrary(min: number, max: number) {
    return Math.floor(Math.random() * (max - min) + min);
  }
}
