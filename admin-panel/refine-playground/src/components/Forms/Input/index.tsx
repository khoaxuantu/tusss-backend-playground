import { FormControl, FormErrorMessage, FormLabel, Input, InputProps } from "@chakra-ui/react";
import { FieldError, FieldValues, Path, UseFormRegister } from "react-hook-form";

export interface FormControlInputProps<T extends FieldValues> {
  field: Path<T>;
  required?: boolean;
  label: string;
  register: UseFormRegister<T>;
  error?: FieldError;
  inputProps?: InputProps;
}

export function FormControlInput<T extends FieldValues>({
  field,
  required,
  label,
  register,
  error,
  inputProps,
}: FormControlInputProps<T>) {
  return (
    <FormControl mb={3} isInvalid={!!error} isRequired={required}>
      <FormLabel>{label}</FormLabel>
      <Input
        id={field}
        type={field}
        variant="filled"
        {...register(field)}
        {...inputProps}
      />
      {error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  );
}
