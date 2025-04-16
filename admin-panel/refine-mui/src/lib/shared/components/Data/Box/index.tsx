import { Box, BoxProps, Typography, TypographyProps } from "@mui/material";
import { DateField, EmailField, NumberField, TextFieldComponent } from "@refinedev/mui";
import React from "react";

interface DataBoxProps {
  boxProps?: BoxProps;
  labelProps?: TypographyProps;
  valueProps?: TypographyProps;
  label: string;
  value?: string | number;
  variant?: "text" | "email" | "number" | "date";
  children?: React.ReactNode;
}

export function DataBox({
  boxProps,
  labelProps,
  label,
  value,
  variant = "text",
  valueProps,
  children,
}: DataBoxProps) {
  return (
    <>
      {value && (
        <Box {...boxProps}>
          <Typography variant="h6" {...labelProps}>
            {label}
          </Typography>
          {children || <Field value={value} variant={variant} valueProps={valueProps} />}
        </Box>
      )}
    </>
  );
}

function Field({
  value,
  variant,
  valueProps,
}: Pick<DataBoxProps, "value" | "variant" | "valueProps">) {
  switch (variant) {
    case "text":
      return <TextFieldComponent value={value} {...valueProps} />;

    case "email":
      return <EmailField value={value} />;

    case "number":
      return <NumberField value={value} {...valueProps} />;

    case "date":
      return <DateField value={value} format="HH:mm:ss DD/MM/YYYY Z" {...valueProps} />;
  }
}
