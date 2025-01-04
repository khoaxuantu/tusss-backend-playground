import * as yup from "yup";

declare module "yup" {
  interface StringSchema {
    stripEmpty(): StringSchema;
  }
};

yup.addMethod(yup.string, "stripEmpty", function () {
  return this.transform((value) => {
    if (value == "") return undefined;
    return value;
  });
});

export default yup;
