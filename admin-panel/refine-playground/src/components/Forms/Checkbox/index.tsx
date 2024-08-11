import { CheckboxGroup, FormControl, FormErrorMessage, FormLabel, Stack } from "@chakra-ui/react";
import React from "react";
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";

interface FormControlCheckBoxProps {
  children: React.ReactNode;
  error?:
    | Merge<FieldError, (FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined)[]>
    | undefined;
}

export function FormControlCheckBox({ children, error }: FormControlCheckBoxProps) {
  return (
    <FormControl mb={3} isInvalid={!!error}>
      <FormLabel>Roles</FormLabel>
      <CheckboxGroup>
        <Stack spacing={[1, 5]} direction={["column", "row"]}>
          {children}
        </Stack>
      </CheckboxGroup>
      {error?.root && <FormErrorMessage>{error.root.message}</FormErrorMessage>}
    </FormControl>
  );
}
