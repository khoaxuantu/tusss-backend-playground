"use client";

import {
  Roles,
  UserProps,
  UserPropsForTextInput,
} from "@app/(authenticated)/users/schema/user.schema";
import {
  Checkbox,
  CheckboxGroup,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Stack,
} from "@chakra-ui/react";
import { FormControlInput, FormControlInputProps } from "@components/Forms/Input";
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
        onClick: () => onFinish(parseDirtyValues(dirtyFields, getValues(), user)),
      }}
    >
      <FormControlText field="name" label="Name" />
      <FormControlText field="firstname" label="First Name" />
      <FormControlText field="lastname" label="Last Name" />
      <FormControlText field="email" label="Email" />
      <FormControlText field="password" label="Password" />
      <FormControlText field="phone_number" label="Phone Number" />
      <FormControlText field="address" label="Address" />
      <FormControlText field="city" label="City" />
      <FormControlText field="nationality" label="Nationality" />

      <FormControl mb={3} isInvalid={!!errors.roles}>
        <FormLabel>Roles</FormLabel>
        <CheckboxGroup>
          <Stack spacing={[1, 5]} direction={["column", "row"]}>
            {Roles.map((role, index) => (
              <Checkbox
                key={role}
                value={role}
                defaultChecked={user?.roles?.includes(role)}
                {...register(`roles.${index}`)}
              >
                {capitalize(role)}
              </Checkbox>
            ))}
          </Stack>
        </CheckboxGroup>
        {errors.roles?.root && <FormErrorMessage>{errors.roles.root.message}</FormErrorMessage>}
      </FormControl>
    </Edit>
  );
}
