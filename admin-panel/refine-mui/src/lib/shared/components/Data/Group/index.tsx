import { Box, BoxProps, Paper, Typography, TypographyProps } from "@mui/material";
import { PropsWithChildren } from "react";

interface DataGroupProps extends PropsWithChildren {
  label: string;
  labelProps?: TypographyProps;
  boxProps?: BoxProps;
}

export default function DataGroup({ label, children, boxProps, labelProps }: DataGroupProps) {
  return (
    <Box {...boxProps}>
      <Typography variant="h6" mb={1} {...labelProps}>
        {label}
      </Typography>
      <Paper variant="outlined" sx={{ padding: 2, "& > .MuiBox-root": { mb: 2 } }}>
        {children}
      </Paper>
    </Box>
  );
}
