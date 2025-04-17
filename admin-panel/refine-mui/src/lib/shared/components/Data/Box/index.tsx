import { Box, BoxProps, Typography, TypographyProps } from "@mui/material";
import {
  BooleanField,
  DateField,
  EmailField,
  NumberField,
  TagField,
  TextFieldComponent,
  UrlField,
} from "@refinedev/mui";
import React from "react";

interface DataBoxProps {
  boxProps?: BoxProps;
  labelProps?: TypographyProps;
  valueProps?: TypographyProps;
  label: string;
  value?: string | number | boolean;
  variant?: "text" | "email" | "number" | "date" | "tag" | "boolean" | "url";
  children?: React.ReactNode;
}

export default function DataBox({
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
      {(value || variant == "boolean") && (
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
      if (typeof value == "boolean") return <TextFieldComponent value="Invalid Date" />;
      return <DateField value={value} format="HH:mm:ss DD/MM/YYYY Z" {...valueProps} />;

    case "tag":
      return <TagField value={value} size="small" />;

    case "boolean":
      return <BooleanField value={!!value} valueLabelTrue="True" valueLabelFalse="False" />;

    case "url":
      if (typeof value == "string")
        return <UrlField value={value} target="_blank" rel="noopener noreferrer">Link</UrlField>;
  }
}
