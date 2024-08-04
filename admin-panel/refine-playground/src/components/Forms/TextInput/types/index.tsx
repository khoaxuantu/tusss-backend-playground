import { Path } from "react-hook-form";

export type FieldUseTextInput<TBase, TPick extends keyof TBase> = Path<Pick<TBase, TPick>>;
