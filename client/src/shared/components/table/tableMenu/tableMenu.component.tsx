import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { TableMenuPropsInterface } from "../../../types/table/tableMenu/tableMenuProps.interface";
import { TableMenuOptionInterface } from "../../../types/table/tableMenu/tableMenuOption.interface";

const ITEM_HEIGHT = 48;

export default function TableMenu(props: TableMenuPropsInterface) {
  const { options, currentRowId } = props;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <span className="material-icons">more_vert</span>
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "20ch",
          },
        }}
      >
        {options.map((option: TableMenuOptionInterface) => (
          <MenuItem
            key={option.title}
            onClick={() => option.action(currentRowId)}
          >
            {option.title}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
