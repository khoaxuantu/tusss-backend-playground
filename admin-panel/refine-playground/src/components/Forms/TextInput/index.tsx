import { FormControl, FormErrorMessage, FormLabel, Input } from "@chakra-ui/react";
import { RESOURCE_MESSAGE } from "@lib/constants/resource";
import { FieldError, FieldValues, Path, UseFormRegister } from "react-hook-form";

export interface TextInputProps<T extends FieldValues> {
  field: Path<T>;
  required?: boolean;
  label: string;
  register: UseFormRegister<T>;
  error?: FieldError;
}

export const SPECIFIC_INPUT = ["email", "password"];

export function TextInput<T extends FieldValues>({
  field,
  required,
  label,
  register,
  error,
}: TextInputProps<T>) {
  return (
    <FormControl mb={3} isInvalid={!!error}>
      <FormLabel>{label}</FormLabel>
      <Input
        id={field}
        {...(SPECIFIC_INPUT.includes(field) && { type: field })}
        {...register(field, {
          required: required ? RESOURCE_MESSAGE.ERROR.REQUIRED_FIELD(field) : undefined,
        })}
      />
      {error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  );
}
