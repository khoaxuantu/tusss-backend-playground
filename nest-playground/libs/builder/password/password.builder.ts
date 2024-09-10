import { PASSWORD_MAXLENGTH, PASSWORD_MINLENGTH } from '../../constant/constants';

export default class PasswordBuilder {
  static SPECIAL_CHAR = '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~';
  MIN_LENGTH = PASSWORD_MINLENGTH;
  MAX_LENGTH = PASSWORD_MAXLENGTH;

  private needHigherMaxLength: boolean = false;
  private needLowerMinLength: boolean = false;
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
      this.str +=
        PasswordBuilder.SPECIAL_CHAR[
          this.getRandomArbitrary(0, PasswordBuilder.SPECIAL_CHAR.length - 1)
        ];
    if (this.needLowerMinLength) {
      this.buildToMinLength();
      this.str = this.str.slice(0, -1);
      return;
    }
    this.buildToMaxLength();
    if (this.needHigherMaxLength) {
      this.str += this.selectSampleChar();
    }
  }

  withHigherMaxLength() {
    this.needHigherMaxLength = true;
    return this;
  }

  withLowerMinLength() {
    this.needLowerMinLength = true;
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

  private buildToMinLength() {
    this.str += this.selectSampleChar().repeat(this.MIN_LENGTH - this.str.length);
  }

  private buildToMaxLength() {
    this.str += this.selectSampleChar().repeat(this.MAX_LENGTH - this.str.length);
  }

  private selectSampleChar() {
    return this.needLowerCase ? 'a' : 'A';
  }
}
