import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { DefaultRootStateInterface } from "../../../../shared/types/common/defaultRootState.interface";
import { getOrganisations } from "../../../../shared/store/organisationsStore/actions";
import { createUser } from "../../store/actions";
import { UsersPageFormComponent } from "../../../../shared/components/forms/usersPageForm/usersPageForm.component";

import styles from "./usersAddPage.module.scss";
import { CircularProgress } from "@material-ui/core";
import { UserInterface } from "../../types/user.interface";

export const UsersAddPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { data, loading } = useSelector(
    (state: DefaultRootStateInterface) => state.organisations
  );
  const [isLoading, setIsLoading] = useState(false);

  const initialValues: UserInterface = {
    firstName: "",
    lastName: "",
    middleName: "",
    organisationId: 0,
    email: "",
    id: 0,
  };

  useEffect(() => {
    dispatch(getOrganisations());
  }, [dispatch]);

  const onSubmit = useCallback(
    (values) => {
      setIsLoading(true);
      dispatch(createUser(values));
      setIsLoading(false);
    },
    [dispatch]
  );

  const onCancel = useCallback(() => {
    history.push("/");
  }, [history]);

  return (
    <div className={styles.usersAddPage}>
      {loading || isLoading ? (
        <CircularProgress />
      ) : (
        <UsersPageFormComponent
          onSubmit={onSubmit}
          onCancel={onCancel}
          organisations={data}
          initialValues={initialValues}
        />
      )}
    </div>
  );
};
