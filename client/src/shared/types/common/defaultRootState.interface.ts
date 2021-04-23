import { RegularStateInterface } from "./regularState.interface";
import { UsersStateInterface } from "../../../pages/usersPage/types/usersState.interface";

export interface DefaultRootStateInterface {
  users: UsersStateInterface;
  organisations: RegularStateInterface;
}
