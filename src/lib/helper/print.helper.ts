import util from "util";

export function printDeepObject(obj: any) {
  console.log(util.inspect(obj, false, null, true))
}
