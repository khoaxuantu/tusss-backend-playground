import { HStack, IconButton, Input, Menu, MenuButton, MenuList, VStack } from "@chakra-ui/react";
import { IconCheck, IconFilter, IconX } from "@tabler/icons-react";
import { Column } from "@tanstack/react-table";
import { useState } from "react";

interface ColumnFilterProps<T> {
  column: Column<T>;
}

export function ColumnFilter<T>({ column }: ColumnFilterProps<T>) {
  const [value, setValue] = useState<{ value: any } | null>(null);

  if (!column.getCanFilter()) return null;

  const open = () => setValue({ value: column.getFilterValue() });
  const close = () => setValue(null);
  const change = (value: any) => setValue({ value });
  const clear = () => {
    column.setFilterValue(undefined);
    close();
  };
  const save = () => {
    if (!value) return;
    column.setFilterValue(value.value);
    close();
  };

  const renderFilterElement = () => {
    const FilterComponent = (column.columnDef?.meta as any)?.filterElement;

    if (!FilterComponent && !!value) {
      return (
        <Input
          borderRadius="md"
          size="sm"
          autoComplete="off"
          value={value?.value ?? ""}
          onChange={(e) => change(e.target.value)}
        />
      );
    }

    return <FilterComponent value={value?.value} onChange={(e: any) => change(e.target.value)} />;
  };

  return (
    <Menu isOpen={!!value} onClose={close}>
      <MenuButton
        onClick={open}
        as={IconButton}
        aria-label="Options"
        icon={<IconFilter size={16} />}
        variant="ghost"
        size="xs"
      />
      <MenuList p={2}>
        {!!value && (
          <VStack align="flex-start">
            {renderFilterElement()}
            <HStack spacing="1">
              <IconButton aria-label="Clear" size="sm" colorScheme="red" onClick={clear}>
                <IconX size={18} />
              </IconButton>
              <IconButton aria-label="Save" size="sm" onClick={save} colorScheme="green">
                <IconCheck size={18} />
              </IconButton>
            </HStack>
          </VStack>
        )}
      </MenuList>
    </Menu>
  );
}
