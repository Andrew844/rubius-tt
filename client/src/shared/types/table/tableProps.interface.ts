import { UserInterface } from "../../../pages/usersPage/types/user.interface";
import { TableColInterface } from "./tableCol.interface";
import { TableMenuOptionInterface } from "./tableMenu/tableMenuOption.interface";

export interface TablePropsInterface {
  rows: null | UserInterface[];
  cols: TableColInterface[];
  actionsMenu?: null | TableMenuOptionInterface[];
  selectRows?: boolean;
  selectedRows?: UserInterface[];
  onSelectedRowsArrChange?: (rows: UserInterface[]) => void;
}
