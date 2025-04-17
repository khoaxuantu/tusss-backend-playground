import { FormControlLabel, FormControlLabelProps, Switch } from "@mui/material";

export default function SwitchField(props: FormControlLabelProps) {
  return <FormControlLabel {...props} control={<Switch />} />;
}
