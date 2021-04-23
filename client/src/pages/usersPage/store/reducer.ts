import { initialState } from "./initialState";
import { ActionInterface } from "../../../shared/types/common/action.interface";
import {
  CREATE_USER,
  CREATE_USER_FAILURE,
  DELETE_USER,
  DELETE_USER_FAILURE,
  DELETE_USER_SUCCESS,
  FETCH_USER,
  FETCH_USER_FAILURE,
  FETCH_USER_SUCCESS,
  FETCH_USERS,
  FETCH_USERS_FAILURE,
  FETCH_USERS_SUCCESS,
} from "./constants";
import { RegularStateInterface } from "../../../shared/types/common/regularState.interface";

export const usersReducer = (
  state: RegularStateInterface = initialState,
  action: ActionInterface
) => {
  switch (action.type) {
    case FETCH_USERS:
      return {
        data: null,
        loading: true,
        error: null,
        pagesCount: 1,
      };
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        pagesCount: action.payload.pagesCount,
        loading: false,
      };
    case FETCH_USERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CREATE_USER:
      return {
        ...state,
        error: null,
      };
    case CREATE_USER_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case FETCH_USER:
      return {
        ...state,
        loading: true,
        currentUser: null,
      };
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        currentUser: action.payload,
      };
    case FETCH_USER_FAILURE:
      return {
        ...state,
        loading: false,
        currentUserError: action.payload,
      };
    case DELETE_USER:
      return {
        ...state,
        data: null,
        loading: true,
        error: null,
      };
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        pagesCount: action.payload.pagesCount,
        loading: false,
      };
    case DELETE_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
