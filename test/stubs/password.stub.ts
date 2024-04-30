import PasswordBuilder from "@/lib/builder/password/password.builder";

export enum InvalidPasswordCase {
  MAX_LENGTH,
  MIN_LENGTH,
  NO_LOWER_CASE,
  NO_UPPER_CASE,
  NO_NUMERIC,
  NO_SPECIAL_CHAR,
}

export class InvalidPasswordStub {
  static create(pwType: InvalidPasswordCase) {
    switch (pwType) {
      case InvalidPasswordCase.MAX_LENGTH:
        return new PasswordBuilder().withoutMinLength().product;
      case InvalidPasswordCase.MIN_LENGTH:
        return new PasswordBuilder().withoutMaxLength().product;
      case InvalidPasswordCase.NO_UPPER_CASE:
        return new PasswordBuilder().withoutUpperCase().product;
      case InvalidPasswordCase.NO_LOWER_CASE:
        return new PasswordBuilder().withoutLowerCase().product;
      case InvalidPasswordCase.NO_NUMERIC:
        return new PasswordBuilder().withoutNumeric().product;
      case InvalidPasswordCase.NO_SPECIAL_CHAR:
        return new PasswordBuilder().withoutSpecialChar().product;
    }
  }
}
