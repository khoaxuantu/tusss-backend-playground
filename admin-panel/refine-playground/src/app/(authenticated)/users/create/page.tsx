"use client";

import { Checkbox, CheckboxGroup, FormControl, FormErrorMessage, FormLabel, Input, Stack } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { RESOURCE_MESSAGE } from "@lib/constants/resource";
import { capitalize } from "@lib/helpers/string.helper";
import { Create } from "@refinedev/chakra-ui";
import { HttpError } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import { Roles, UserProps, UserSchema } from "../schema/user.schema";

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

  return (
    <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
      <FormControl mb={3} isRequired isInvalid={!!errors.name}>
        <FormLabel>Name</FormLabel>
        <Input
          id="name"
          {...register("name", { required: RESOURCE_MESSAGE.ERROR.REQUIRED_FIELD("name") })}
        />
        {errors.name && <FormErrorMessage>{errors.name.message}</FormErrorMessage>}
      </FormControl>
      <FormControl mb={3}>
        <FormLabel>First Name</FormLabel>
        <Input id="firstname" {...register("firstname")} />
      </FormControl>
      <FormControl mb={3}>
        <FormLabel>Last Name</FormLabel>
        <Input id="lastname" {...register("lastname")} />
      </FormControl>
      <FormControl mb={3} isRequired isInvalid={!!errors.email}>
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          id="email"
          {...register("email", { required: RESOURCE_MESSAGE.ERROR.REQUIRED_FIELD("email") })}
        />
        {errors.email && <FormErrorMessage>{errors.email.message}</FormErrorMessage>}
      </FormControl>
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
    </Create>
  );
}
