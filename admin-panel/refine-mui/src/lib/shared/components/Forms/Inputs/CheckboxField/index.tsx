import { Checkbox, FormControlLabel, FormControlLabelProps } from "@mui/material";

export default function CheckboxField(props: FormControlLabelProps) {
  return <FormControlLabel {...props} control={<Checkbox />} />;
}
