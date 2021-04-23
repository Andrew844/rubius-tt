import { initialState } from "./initialState";
import { RegularStateInterface } from "../../types/common/regularState.interface";
import { ActionInterface } from "../../types/common/action.interface";
import {
  FETCH_ORGANISATIONS,
  FETCH_ORGANISATIONS_FAILURE,
  FETCH_ORGANISATIONS_SUCCESS,
} from "./constants";

export const organisationsReducer = (
  state: RegularStateInterface = initialState,
  action: ActionInterface
) => {
  switch (action.type) {
    case FETCH_ORGANISATIONS:
      return {
        data: null,
        loading: true,
        error: null,
      };
    case FETCH_ORGANISATIONS_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    case FETCH_ORGANISATIONS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
