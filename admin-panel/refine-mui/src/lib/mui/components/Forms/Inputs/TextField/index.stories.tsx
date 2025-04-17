import { TextField } from "@mui/material";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof TextField> = {
  title: "MUI/Form/Inputs/TextField",
  component: TextField,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Default",
    placeholder: "Type something...",
    value: "",
  },
};
