import { plainToInstance } from "class-transformer";
import { MESSAGE } from "../constant/constants";
import { InvalidParamsException } from "../exception/invalid-param.exception";
import { Constructor } from "../types/common";
import { printDeepObject } from "./print.helper";

interface TransformArrParamsProps<T> {
  cls: Constructor<T> | StringConstructor | NumberConstructor | ArrayConstructor;
  value: any;
  key?: string;
}

export class ClassTransformerHelper {
  static transformArrParams<T>({ cls, value, key }: TransformArrParamsProps<T>) {
    if (typeof value == "string") {
      const arr = value.trim().split(",");
      if (cls === String || cls === Number) return arr.map((val) => cls(val));
      return arr.map((val) => {
        if (cls === Array) return new cls(val);
        return plainToInstance(cls as Constructor<T>, val);
      });
    }

    if (Array.isArray(value)) {
      if (!value.length)
        throw new InvalidParamsException({
          params: [key],
          message: MESSAGE.ERROR.ARRAY_CANNOT_BLANK(key || ""),
          where: "ClasstransformerHelper.transformArrParams",
        });
      if (cls === String || cls === Number) return value.map((val) => cls(val));
      return value.map((val) => {
        if (cls === Array) return new cls(val);
        return plainToInstance(cls as Constructor<T>, val);
      });
    }

    return [plainToInstance(cls as Constructor<T>, value)];
  }
}
