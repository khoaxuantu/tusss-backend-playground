"use client";

import {
  Checkbox,
  CheckboxGroup,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Stack
} from "@chakra-ui/react";
import { FormControlNumber } from "@components/Forms/NumberInput";
import { TextInput, TextInputProps } from "@components/Forms/TextInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { capitalize } from "@lib/helpers/string.helper";
import { Create } from "@refinedev/chakra-ui";
import { HttpError } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import { Roles, UserProps, UserPropsForTextInput, UserSchema } from "../schema/user.schema";

export default function UsersCreate() {
  const {
    saveButtonProps,
    register,
    refineCore: { formLoading },
    formState: { errors },
  } = useForm<UserProps, HttpError, UserProps>({
    resolver: yupResolver(UserSchema),
    refineCoreProps: { redirect: false },
  });

  const FormControlText = (
    props: Pick<TextInputProps<UserProps>, "label" | "required"> & { field: UserPropsForTextInput }
  ) => {
    return <TextInput<UserProps> register={register} error={errors[props.field]} {...props} />;
  };

  return (
    <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
      <FormControlText field="name" label="Name" required />
      <FormControlText field="firstname" label="First Name" />
      <FormControlText field="lastname" label="Last Name" />
      <FormControlText field="email" label="Email" required />
      <FormControlText field="password" label="Password" required />

      <FormControl mb={3} isRequired isInvalid={!!errors.roles}>
        <FormLabel>Roles</FormLabel>
        <CheckboxGroup>
          <Stack spacing={[1, 5]} direction={["column", "row"]}>
            {Roles.map((role, index) => (
              <Checkbox key={role} value={role} {...register(`roles.${index}`)}>
                {capitalize(role)}
              </Checkbox>
            ))}
          </Stack>
        </CheckboxGroup>
        {errors.roles?.root && <FormErrorMessage>{errors.roles.root.message}</FormErrorMessage>}
      </FormControl>

      <FormControlText field="phone_number" label="Phone Number" />

      <FormControlNumber<UserProps>
        field="age"
        label="Age"
        register={register}
        error={errors.phone_number}
        numberInputProps={{ defaultValue: 18, min: 1, max: 200 }}
      />

      <FormControlText field="address" label="Address" />
      <FormControlText field="city" label="City" />
      <FormControlText field="nationality" label="Nationality" />
    </Create>
  );
}
