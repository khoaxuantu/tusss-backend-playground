import { ExpandMore } from "@mui/icons-material";
import { Button, ButtonProps, MenuProps, Menu as MuiMenu } from "@mui/material";
import { PropsWithChildren, useState } from "react";

interface DropdownProps extends PropsWithChildren {
  label: string;
  buttonProps?: ButtonProps;
  menuProps?: MenuProps;
}

export default function Menu(props: DropdownProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = !!anchorEl;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        variant="contained"
        endIcon={<ExpandMore />}
        {...props.buttonProps}
      >
        {props.label}
      </Button>
      <MuiMenu
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        {...props.menuProps}
      >
        {props.children}
      </MuiMenu>
    </>
  );
}
