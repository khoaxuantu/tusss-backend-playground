import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof DateTimePicker> = {
  title: "MUI/Form/Inputs/DateTimePicker",
  tags: ["autodocs"],
  render: (args) => {
    return (
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DateTimePicker {...args} />
      </LocalizationProvider>
    );
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Date",
    defaultValue: new Date(),
  },
};
