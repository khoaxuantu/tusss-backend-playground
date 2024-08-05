import { HStack, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { getList } from "@lib/actions/data.server";
import { RESOURCE_IDENTIFIER } from "@lib/constants/resource";
import { capitalize } from "@lib/helpers/string.helper";
import { DateField, EditButton, List, ShowButton, TagField, TextField } from "@refinedev/chakra-ui";
import { LIST_PROPS_AS_TEXT, UserProps } from "./schema/user.schema";

export default async function UsersPage() {
  const { data, total } = await getList<UserProps>({
    resource: RESOURCE_IDENTIFIER.USER,
  });

  return (
    <List>
      <p>Total: {total}</p>
      <TableContainer marginTop={12}>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>ID</Th>
              {LIST_PROPS_AS_TEXT.map((prop) => (
                <Th key={prop}>{capitalize(prop)}</Th>
              ))}
              <Th>Roles</Th>
              <Th>Created At</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((user) => (
              <UserRow user={user} />
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </List>
  );
}

function UserRow({ user }: { user: UserProps }) {
  return (
    <Tr>
      <Td>
        <TextField value={user._id}/>
      </Td>
      {LIST_PROPS_AS_TEXT.map((prop) => {
        return (
          <Td key={prop} isNumeric={typeof user[prop] == "number"}>
            {user[prop]}
          </Td>
        );
      })}
      <Td>
        <HStack>
          {user.roles.map((role: string, index) => (
            <TagField key={index} value={role} />
          ))}
        </HStack>
      </Td>
      <Td>
        <DateField value={user.createdAt} format="HH:mm DD/MM/YYYY" />
      </Td>
      <Td>
        <HStack>
          <EditButton recordItemId={user._id} />
          <ShowButton recordItemId={user._id} />
        </HStack>
      </Td>
    </Tr>
  );
}
