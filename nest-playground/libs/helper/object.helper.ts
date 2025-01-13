export class ObjectHelper {
  static sanitize(obj: any) {
    if (obj instanceof RegExp) return obj;
    if (typeof obj != "object" || obj === null) return obj;

    if (Array.isArray(obj)) {
      return obj.filter((item) => item !== undefined).map((item) => ObjectHelper.sanitize(item));
    }

    const sanitized = {};

    if (typeof obj == "object") {
      for (const key in obj) {
        const value = obj[key];
        if (value !== undefined && !(value instanceof Function)) {
          sanitized[key] = ObjectHelper.sanitize(value);
        }
      }
    }

    return sanitized;
  }
}
