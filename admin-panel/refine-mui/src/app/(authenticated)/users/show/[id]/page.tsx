import { getOne } from "@lib/resource/actions";
import { RESOURCE_IDENTIFIER } from "@lib/resource/constants";
import { ResourceParams } from "@lib/resource/types/params.type";
import { DataBox } from "@lib/shared/components/Data/Box";
import { UserShowProps } from "@lib/user/schemas";
import { Chip, Stack, Typography } from "@mui/material";
import { Show } from "@refinedev/mui";
import { notFound } from "next/navigation";

export default async function Page({ params }: ResourceParams) {
  const id = (await params).id;
  const res = await getOne<UserShowProps>({ id, resource: RESOURCE_IDENTIFIER.USER });

  if (!res.ok) return notFound();

  const data = res.data as UserShowProps;

  return (
    <Show title={<Typography variant="h2">Detail</Typography>} wrapperProps={{ elevation: 0 }}>
      <Stack spacing={2}>
        <DataBox label="Id" value={data._id} />
        <DataBox label="Email" value={data.email} variant="email" />
        <Stack direction="row" gap={6} flexWrap="wrap">
          <DataBox label="Name" value={data.name} />
          <DataBox label="First Name" value={data.firstname} />
          <DataBox label="Last Name" value={data.lastname} />
        </Stack>
        <DataBox label="Age" value={data.age} variant="number" />
        <DataBox label="Phone Number" value={data.phone_number} />
        <DataBox label="Nationality" value={data.nationality} />
        <Stack direction="row" gap={6} flexWrap="wrap">
          <DataBox label="Address" value={data.address} />
          <DataBox label="City" value={data.city} />
        </Stack>
        <DataBox label="Roles">
          <Stack direction="row" gap={2} flexWrap="wrap" mt={1}>
            {data.roles.map((role, index) => (
              <Chip key={index} label={role} />
            ))}
          </Stack>
        </DataBox>
        <DataBox label="Updated At" value={data.updatedAt} variant="date" />
        <DataBox label="Created At" value={data.createdAt} variant="date" />
      </Stack>
    </Show>
  );
}
