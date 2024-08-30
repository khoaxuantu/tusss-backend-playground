import { Constructor } from "../types/common";

interface TransformArrParamsProps<T> {
  cls: Constructor<T> | StringConstructor | NumberConstructor;
  value: any;
}

export class ClassTransformerHelper {
  static transformArrParams<T>({ cls, value }: TransformArrParamsProps<T>) {
    if (typeof value == "string") {
      const arr = value.trim().split(",");
      if (cls === String || cls === Number) return arr.map((val) => cls(val));
      return arr.map((val) => new cls(val));
    }

    return value;
  }
}
