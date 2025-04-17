import { Button } from "@mui/material";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Button> = {
  title: "MUI/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      options: ["text", "outlined", "contained"],
      control: {
        type: "select",
      },
    },
    color: {
      options: ["inherit", "primary", "secondary", "success", "error", "info", "warning"],
      control: {
        type: "select",
      },
    },
    size: {
      options: ["small", "medium", "large"],
      control: {
        type: "select",
      },
    },
    disabled: {
      type: "boolean",
    },
    loading: {
      type: "boolean",
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: "contained",
    color: "primary",
    children: "Primary",
    size: "medimum",
  },
};

export const Secondary: Story = {
  args: {
    variant: "contained",
    color: "secondary",
    children: "Secondary",
  },
};

export const Outlined: Story = {
  args: {
    variant: "outlined",
    children: "Outlined",
  },
};

export const Large: Story = {
  args: {
    variant: "contained",
    children: "Large",
    size: "large",
  },
};

export const Small: Story = {
  args: {
    variant: "contained",
    children: "Small",
    size: "small",
  },
};

export const Disabled: Story = {
  args: {
    variant: "contained",
    children: "Disabled",
    disabled: true,
  },
};

export const Loading: Story = {
  args: {
    variant: "contained",
    children: "Loading",
    loading: true,
  },
};
