import chalk from "chalk";
import { InspectOptions, inspect } from "util";

interface PrintDeepObjectOpts extends InspectOptions {
  prefix?: string[];
  pdo?: boolean;
  breakLine?: boolean;
}

const DEFAULT_PREFIX = chalk.green("Print Deep Object");

export function printDeepObject(obj: any, props?: PrintDeepObjectOpts) {
  const { prefix = [], pdo = true, breakLine = true, ...rest } = props || {};
  if (pdo) prefix.push(DEFAULT_PREFIX);
  if (!prefix.length) prefix.push(obj?.name || DEFAULT_PREFIX);

  const prefixStr = prefix.map((str) => `[${str}]`).join("");
  console.log(
    prefixStr,
    inspect(obj, {
      colors: true,
      depth: 5,
      sorted: true,
      breakLength: 175,
      showHidden: true,
      numericSeparator: true,
      ...rest,
    }),
    breakLine ? "\n" : "",
  );
}
