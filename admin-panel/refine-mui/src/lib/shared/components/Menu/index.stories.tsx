import { MenuItem } from "@mui/material";
import { Meta, StoryObj } from "@storybook/react";
import Menu from ".";

const meta: Meta<typeof Menu> = {
  title: "Shared/Menu",
  component: Menu,
  tags: ["autodocs"],
}

export default meta;

type Story = StoryObj<typeof meta>;


export const Default: Story = {
  args: {
    label: "Dropdown",
    children: (
      <div>
        <MenuItem>One</MenuItem>
        <MenuItem>Two</MenuItem>
        <MenuItem>Three</MenuItem>
      </div>
    ),
  },
}
