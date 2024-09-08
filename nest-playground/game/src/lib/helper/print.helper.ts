import util from "util";

export function printDeepObject(obj: any, prefix?: string) {
  console.log(prefix ? `[${prefix}] ~ ` : "", util.inspect(obj, false, null, true), "\n")
}
