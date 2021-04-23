import {
  FETCH_ORGANISATIONS,
  FETCH_ORGANISATIONS_FAILURE,
  FETCH_ORGANISATIONS_SUCCESS,
} from "./constants";

export const getOrganisations = () => async (dispatch: any) => {
  dispatch({ type: FETCH_ORGANISATIONS });

  try {
    const response: any = await fetch(
      "http://localhost:5000/organisations"
    ).then((res) => res.json());

    dispatch({
      type: FETCH_ORGANISATIONS_SUCCESS,
      payload: response.data,
    });
  } catch (e) {
    dispatch({ type: FETCH_ORGANISATIONS_FAILURE, payload: e });
  }
};
