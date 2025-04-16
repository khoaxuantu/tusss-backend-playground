import type { Meta, StoryObj } from "@storybook/react";

import { DataBox } from "./index";

const meta = {
  component: DataBox,
} satisfies Meta<typeof DataBox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Text: Story = {
  args: {
    label: "Text Label",
    variant: "text",
    value: "Lmao",
  },
};

export const Email: Story = {
  args: {
    label: "Email Label",
    variant: "email",
    value: "example@email.com",
  },
};

export const Number: Story = {
  args: {
    label: "Number Label",
    variant: "number",
    value: 200000333,
  },
};

export const DateField: Story = {
  args: {
    label: "Date Label",
    variant: "date",
    value: new Date().toString(),
  },
};

export const CustomChildren: Story = {
  args: {
    label: "Custom Children",
    children: (
      <span>
        <i>
          <b>Here is the custom children node</b>
        </i>
      </span>
    ),
    variant: "text",
    value: "true",
  },
};
