import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof DatePicker> = {
  title: "MUI/Form/Inputs/DatePicker",
  tags: ["autodocs"],
  render: (args) => {
    return (
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker {...args} />
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
