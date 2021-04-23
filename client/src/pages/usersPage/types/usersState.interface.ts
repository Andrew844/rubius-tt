import { UserInterface } from "./user.interface";
import { RegularStateInterface } from "../../../shared/types/common/regularState.interface";

export interface UsersStateInterface extends RegularStateInterface {
  currentUser: null | UserInterface;
  currentUserError: null | string;
  pagesCount: number;
}
