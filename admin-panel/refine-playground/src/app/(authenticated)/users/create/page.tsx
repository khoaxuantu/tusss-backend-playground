"use client";

import { Checkbox } from "@chakra-ui/react";
import { FormControlCheckBox } from "@components/Forms/Checkbox";
import { FormControlInput, FormControlInputProps } from "@components/Forms/Input";
import { FormControlNumber } from "@components/Forms/NumberInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { capitalize } from "@lib/helpers/string.helper";
import { Create } from "@refinedev/chakra-ui";
import { HttpError } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import { UseFormRegister } from "react-hook-form";
import { Roles, UserProps, UserPropsForTextInput, UserSchema } from "../schema/user.schema";

export default function UsersCreate() {
  const {
    saveButtonProps,
    register,
    refineCore: { formLoading },
    formState: { errors },
  } = useForm<UserProps, HttpError, UserProps>({
    resolver: yupResolver(UserSchema),
    refineCoreProps: { redirect: "show" },
  });

  const FormControlText = (
    props: Pick<FormControlInputProps<UserProps>, "label" | "required" | "inputProps"> & {
      field: UserPropsForTextInput;
    },
  ) => {
    return (
      <FormControlInput<UserProps>
        register={register as UseFormRegister<UserProps>}
        error={errors[props.field]}
        {...props}
      />
    );
  };

  return (
    <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
      <FormControlText field="name" label="Name" required />
      <FormControlText field="firstname" label="First Name" />
      <FormControlText field="lastname" label="Last Name" />
      <FormControlText field="email" label="Email" required inputProps={{ type: "email" }} />
      <FormControlText
        field="password"
        label="Password"
        required
        inputProps={{ type: "password" }}
      />

      <FormControlCheckBox error={errors.roles}>
        {Roles.map((role, index) => (
          <Checkbox key={role} value={role} {...register(`roles.${index}`)}>
            {capitalize(role)}
          </Checkbox>
        ))}
      </FormControlCheckBox>

      <FormControlText field="phone_number" label="Phone Number" />

      <FormControlNumber<UserProps>
        field="age"
        label="Age"
        register={register as UseFormRegister<UserProps>}
        error={errors.age}
        numberInputProps={{ defaultValue: 18, min: 1, max: 200 }}
      />

      <FormControlText field="address" label="Address" />
      <FormControlText field="city" label="City" />
      <FormControlText field="nationality" label="Nationality" />
    </Create>
  );
}
