import { Meta, StoryObj } from "@storybook/react";
import SwitchField from ".";

const meta: Meta<typeof SwitchField> = {
  title: "Shared/Form/Inputs/SwitchField",
  component: SwitchField,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Default Label",
    checked: false,
  },
};

export const Checked: Story = {
  args: {
    label: "Checked Label",
    checked: true,
  },
};

export const Required: Story = {
  args: {
    label: "Required Label",
    checked: false,
    required: true,
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled Label",
    checked: false,
    disabled: true,
  },
};
