"use client";

import {
  Roles,
  UserProps,
  UserPropsForTextInput,
} from "@app/(authenticated)/users/schema/user.schema";
import {
  Checkbox
} from "@chakra-ui/react";
import { FormControlCheckBox } from "@components/Forms/Checkbox";
import { FormControlInput, FormControlInputProps } from "@components/Forms/Input";
import { FormControlNumber } from "@components/Forms/NumberInput";
import { parseDirtyValues } from "@lib/helpers/params.helper";
import { capitalize } from "@lib/helpers/string.helper";
import { Edit } from "@refinedev/chakra-ui";
import { HttpError } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";

export default function UserEditPage() {
  const {
    register,
    refineCore: { formLoading, onFinish, query },
    formState: { errors, dirtyFields },
    getValues,
  } = useForm<Partial<UserProps>, HttpError, Partial<UserProps>>({
    refineCoreProps: {
      redirect: "show",
    },
  });

  const user = query?.data?.data;

  const FormControlText = (
    props: Pick<FormControlInputProps<UserProps>, "label" | "required" | "inputProps"> & {
      field: UserPropsForTextInput;
    },
  ) => {
    return (
      <FormControlInput<Partial<UserProps>>
        register={register}
        error={errors[props.field]}
        {...props}
      />
    );
  };

  return (
    <Edit
      isLoading={formLoading}
      saveButtonProps={{
        onClick: () => onFinish(parseDirtyValues(dirtyFields, getValues(), user) || {}),
      }}
      goBack={null}
    >
      <FormControlText field="name" label="Name" />
      <FormControlText field="firstname" label="First Name" />
      <FormControlText field="lastname" label="Last Name" />
      <FormControlText field="email" label="Email" />
      <FormControlText field="password" label="Password" />

      <FormControlNumber<Partial<UserProps>>
        field="age"
        label="Age"
        register={register}
        error={errors.age}
        numberInputProps={{ min: 1, max: 200 }}
      />

      <FormControlText field="phone_number" label="Phone Number" />
      <FormControlText field="address" label="Address" />
      <FormControlText field="city" label="City" />
      <FormControlText field="nationality" label="Nationality" />

      <FormControlCheckBox error={errors.roles}>
        {Roles.map((role) => (
          <Checkbox
            key={role}
            value={role}
            defaultChecked={user?.roles?.includes(role)}
            {...register(`roles`)}
          >
            {capitalize(role)}
          </Checkbox>
        ))}
      </FormControlCheckBox>
    </Edit>
  );
}
