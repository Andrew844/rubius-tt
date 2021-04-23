import {
  CREATE_USER,
  CREATE_USER_FAILURE,
  DELETE_USER,
  DELETE_USER_FAILURE,
  DELETE_USER_SUCCESS,
  EDIT_USER,
  EDIT_USER_FAILURE,
  FETCH_USER,
  FETCH_USER_FAILURE,
  FETCH_USER_SUCCESS,
  FETCH_USERS,
  FETCH_USERS_FAILURE,
  FETCH_USERS_SUCCESS,
} from "./constants";
import { UserInterface } from "../types/user.interface";

export const getUsers = (
  pageNumber: number = 1,
  pageSize: number = 10
) => async (dispatch: any) => {
  dispatch({ type: FETCH_USERS });

  try {
    const response: any = await fetch(
      `http://localhost:5000/users?pageSize=${pageSize}&pageNumber=${pageNumber}`
    ).then((res) => res.json());

    dispatch({
      type: FETCH_USERS_SUCCESS,
      payload: {
        data: response.data,
        pagesCount: response.pagesCount,
      },
    });
  } catch (e) {
    dispatch({ type: FETCH_USERS_FAILURE, payload: e });
  }
};

export const getUser = (uid: number) => async (dispatch: any) => {
  dispatch({ type: FETCH_USER });

  try {
    const response: any = await fetch(
      `http://localhost:5000/users?userId=${uid}`
    ).then((res) => res.json());

    dispatch({
      type: FETCH_USER_SUCCESS,
      payload: response.data,
    });
  } catch (e) {
    dispatch({ type: FETCH_USER_FAILURE, payload: e });
  }
};

export const createUser = (user: UserInterface) => async (dispatch: any) => {
  dispatch({ type: CREATE_USER });
  try {
    await fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: user,
      }),
    }).then((res) => res.json());
  } catch (e) {
    dispatch({ type: CREATE_USER_FAILURE, payload: e });
  }
};

export const deleteUser = (
  pageSize: number,
  pageNumber: number,
  uid?: number | null,
  userIds?: number[] | undefined
) => async (dispatch: any) => {
  dispatch({ type: DELETE_USER });
  try {
    const queryParams = `${uid ? `uid=${uid}` : ""}${
      userIds ? userIds.map((uid: number) => `userIds[]=${uid}`).join("&") : ""
    }&pageSize=${pageSize}&pageNumber=${pageNumber}`;

    const response: any = await fetch(
      `http://localhost:5000/users?${queryParams}`,
      {
        method: "DELETE",
      }
    ).then((res) => res.json());

    dispatch({
      type: DELETE_USER_SUCCESS,
      payload: { data: response.data, pagesCount: response.pagesCount },
    });
  } catch (e) {
    dispatch({ type: DELETE_USER_FAILURE, payload: e });
  }
};

export const editUser = (user: UserInterface) => async (dispatch: any) => {
  dispatch({ type: EDIT_USER });
  try {
    await fetch("http://localhost:5000/users", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: user,
      }),
    }).then((res) => res.json());
  } catch (e) {
    dispatch({ type: EDIT_USER_FAILURE, payload: e });
  }
};
