import { PASSWORD_MAXLENGTH, PASSWORD_MINLENGTH } from '@/lib/constant/constants';
import PasswordBuilder from './password.builder';

describe('PasswordBuilder', () => {
  describe('default', () => {
    it('should return max length string', () => {
      let password = new PasswordBuilder().product;
      expect(password.length).toEqual(PASSWORD_MAXLENGTH);
    });
  });

  describe('with lower min length', () => {
    it('should return string shorter than min length', () => {
      let password = new PasswordBuilder().withLowerMinLength().product;
      expect(password.length).toBeLessThan(PASSWORD_MINLENGTH);
    });
  });

  describe('with higher max length', () => {
    it('should return string higher than max length', () => {
      let password = new PasswordBuilder().withHigherMaxLength().product;
      expect(password.length).toBeGreaterThan(PASSWORD_MAXLENGTH);
    });
  });

  describe('without numerice character', () => {
    it('shoul return string with no numeric char', () => {
      let password = new PasswordBuilder().withoutNumeric().product;
      expect(password).not.toMatch(/[0~9]/g);
    });
  });

  describe('without uppercase letter', () => {
    it('should return string with no uppercase', () => {
      let password = new PasswordBuilder().withoutUpperCase().product;
      expect(password).not.toMatch(/[A~Z]/g);
    });
  });

  describe('without lowercase letter', () => {
    it('should return string with no lowercase', () => {
      let password = new PasswordBuilder().withoutLowerCase().product;
      expect(password).not.toMatch(/[a~z]/g);
    });
  });

  describe('without special character', () => {
    it('should return string with no special char', () => {
      let password = new PasswordBuilder().withoutSpecialChar().product;
      expect(password).not.toMatch(new RegExp(`[${PasswordBuilder.SPECIAL_CHAR}]`));
    });
  });
});
