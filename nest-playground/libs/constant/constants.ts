export const PASSWORD_MINLENGTH = 8;
export const PASSWORD_MAXLENGTH = 32;
export const JWT = {
  secret: process.env.NODE_ENV == 'development' ? process.env.JWT_SECRET : 'LMAO',
};
export const AUTH_GUARD = 'AUTH_GUARD';

export const MESSAGE = {
  ERROR: {
    DUPLICATE_KEYS: (keys: string[]) => `Duplicated keys: ${keys.join(",")}.`,
    ARRAY_CANNOT_BLANK: (key: string) => `${key} cannot be blank array.`,
  }
}
