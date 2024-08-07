import { Card, CardBody, CardHeader, Heading, HStack, Stack, StackDivider } from "@chakra-ui/react";
import { DataBox } from "@components/DataDisplay/DataBox";
import { getOne } from "@lib/actions/data.server";
import { RESOURCE_IDENTIFIER } from "@lib/constants/resource";
import { Show, TagField } from "@refinedev/chakra-ui";
import { UserProps } from "../schema/user.schema";

interface DynamicParams {
  params: {
    id: string;
  };
}

export default async function UserShowPage({ params }: DynamicParams) {
  const res = await getOne<UserProps>({ resource: RESOURCE_IDENTIFIER.USER, id: params.id });
  const user = res.data;

  return (
    <Show>
      <DataBox variant="text" value={user._id} label="Id" />

      <Heading as="h4" size="sm" mt={6}>
        Roles
      </Heading>
      <HStack mt={4}>
        {user.roles.map((role: string, index) => (
          <TagField key={index} value={role} />
        ))}
      </HStack>

      <Card mt={6}>
        <CardHeader>
          <Heading as="h4" size="sm">
            Identity
          </Heading>
        </CardHeader>
        <CardBody>
          <Stack divider={<StackDivider />} gap={4} display="flex" flexDirection="column">
            <DataBox variant="text" value={user.name} label="Name" headingProps={{ as: "h5" }} />
            <DataBox
              variant="text"
              value={user.firstname}
              label="First Name"
              headingProps={{ as: "h5" }}
            />
            <DataBox
              variant="text"
              value={user.lastname}
              label="Last Name"
              headingProps={{ as: "h5" }}
            />
            <DataBox variant="email" value={user.email} label="Email" headingProps={{ as: "h5" }} />
            <DataBox
              value={user.phone_number}
              variant="text"
              label="Phone Number"
              headingProps={{ as: "h5" }}
            />
            <DataBox
              variant="text"
              value={user.nationality}
              label="Nationality"
              headingProps={{ as: "h5" }}
            />
          </Stack>
        </CardBody>
      </Card>

      <DataBox variant="text" value={user.age || "Not specified"} label="Age" />
      <DataBox variant="text" value={user.address} label="Address" />
      <DataBox variant="text" value={user.city} label="City" />

      <DataBox
        variant="date"
        label="Created At"
        value={user.createdAt && new Date(user.createdAt)}
      />
      <DataBox
        variant="date"
        label="Updated At"
        value={user.updatedAt && new Date(user.updatedAt)}
      />
    </Show>
  );
}
