import { UsersStateInterface } from "../types/usersState.interface";

export const initialState: UsersStateInterface = {
  data: null,
  error: null,
  loading: false,
  currentUser: null,
  currentUserError: null,
  pagesCount: 1,
};
