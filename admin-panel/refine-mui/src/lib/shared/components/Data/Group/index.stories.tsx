import { List, ListItem } from "@mui/material";
import { Meta, StoryObj } from "@storybook/react";
import DataGroup from ".";
import DataBox from "../Box";

const meta: Meta<typeof DataGroup> = {
  title: "Shared/Data/Group",
  component: DataGroup,
  tags: ["autodocs"],
}

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Group Label",
    children: (
      <>
        <DataBox label="First" value="First value" />
        <DataBox label="Second" value="Second value" />
        <DataBox label="Third" value="Third value" />
      </>
    ),
  },
};

export const WithList: Story = {
  args: {
    label: "List in Data Group",
    children: (
      <List>
        <ListItem>One</ListItem>
        <ListItem>Two</ListItem>
        <ListItem>Three</ListItem>
      </List>
    )
  },
};
