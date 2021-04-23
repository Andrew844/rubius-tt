import { DefaultRootStateInterface } from "../../types/common/defaultRootState.interface";
import { initialState as initialUsersState } from "../../../pages/usersPage/store/initialState";
import { initialState as initialOrganisationsState } from "../organisationsStore/initialState";

export const initialState: DefaultRootStateInterface = {
  users: initialUsersState,
  organisations: initialOrganisationsState,
};
