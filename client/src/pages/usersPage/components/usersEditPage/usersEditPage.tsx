import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { editUser, getUser } from "../../store/actions";
import { DefaultRootStateInterface } from "../../../../shared/types/common/defaultRootState.interface";
import { CircularProgress } from "@material-ui/core";
import { UsersPageFormComponent } from "../../../../shared/components/forms/usersPageForm/usersPageForm.component";
import { getOrganisations } from "../../../../shared/store/organisationsStore/actions";
import styles from "./usersEditPage.component.module.scss";

export const UsersEditPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { loading, currentUser }: any = useSelector(
    (state: DefaultRootStateInterface) => state.users
  );
  const organisations: any = useSelector(
    (state: DefaultRootStateInterface) => state.organisations
  );

  useEffect(() => {
    dispatch(getUser(+history.location.pathname.split("/")[2]));
    dispatch(getOrganisations());
  }, [dispatch, history]);

  const onSubmit = useCallback(
    (values: any) => {
      dispatch(editUser(values));
    },
    [dispatch]
  );

  const onCancel = useCallback(() => {
    history.push("/");
  }, [history]);

  return (
    <div className={styles.usersEditPage}>
      {(!loading || !organisations.loading) && currentUser ? (
        <UsersPageFormComponent
          onSubmit={onSubmit}
          onCancel={onCancel}
          organisations={organisations.data}
          initialValues={currentUser}
        />
      ) : (
        <CircularProgress />
      )}
    </div>
  );
};
