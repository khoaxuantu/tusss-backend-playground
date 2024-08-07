import { Box, Heading, HeadingProps } from "@chakra-ui/react";
import { DateField, EmailField, NumberField, TextField } from "@refinedev/chakra-ui";

interface DataBoxProps {
  label: string;
  value: any;
  variant: "text" | "number" | "date" | "email";
  headingProps?: HeadingProps;
}

export function DataBox({ label, value, variant, headingProps }: DataBoxProps) {
  return (
    <Box mt={6}>
      <Heading as="h4" size="sm" {...headingProps}>
        {label}
      </Heading>
      <Field value={value} variant={variant} />
    </Box>
  );
}

function Field({
  value,
  variant,
}: {
  value: DataBoxProps["value"];
  variant: DataBoxProps["variant"];
}) {
  switch (variant) {
    case "text":
      return <TextField value={value} />;
    case "date":
      return <DateField value={value} format="HH:mm DD/MM/YYYY" />;
    case "number":
      return <NumberField value={value} />;
    case "email":
      return <EmailField value={value} />

    default:
      break;
  }
}
