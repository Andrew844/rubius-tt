import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, CircularProgress } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

import { deleteUser, getUsers } from "../../store/actions";
import { DefaultRootStateInterface } from "../../../../shared/types/common/defaultRootState.interface";
import { TableComponent } from "../../../../shared/components/table/table.component";
import { getOrganisations } from "../../../../shared/store/organisationsStore/actions";
import { UserInterface } from "../../types/user.interface";
import { TableMenuOptionInterface } from "../../../../shared/types/table/tableMenu/tableMenuOption.interface";
import { TableColInterface } from "../../../../shared/types/table/tableCol.interface";
import { PaginationComponent } from "../../../../shared/components/pagination/pagination.component";

import styles from "./usersPage.module.scss";

export const UsersPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const usersData = useSelector(
    (state: DefaultRootStateInterface) => state.users
  );
  const { organisations } = useSelector(
    (state: DefaultRootStateInterface) => state
  );

  const [users, setUsers]: any = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [selectedRows, setSelectedRows]: any = useState([]);

  useEffect(() => {
    dispatch(getUsers(pageNumber));
    dispatch(getOrganisations());
  }, [dispatch, pageNumber]);

  useEffect(() => {
    if (!usersData.loading && !organisations.loading) {
      const usersArr = usersData.data?.map((user) => ({
        ...user,
        organisation: organisations.data?.find(
          (org) => org.id === user.organisationId
        ).shortName
      }));

      setUsers(usersArr);
    }
  }, [
    usersData.data,
    usersData.loading,
    organisations.data,
    organisations.loading,
    dispatch,
    pageNumber
  ]);

  const cols: TableColInterface[] = [
    { title: "ФИО", param: "fullName" },
    { title: "Организация", param: "org" },
    { title: "email", param: "email" }
  ];

  const onUserDelete = useCallback(
    (many: boolean, id?: number) => {
      const confirmString =
        `Вы уверены, что хотите удалить ${many
          ? `пользователей ${selectedRows
            .map((row: UserInterface) => row.firstName)
            .join(", ")}?`
          : "этого пользователя?"}`;

      // eslint-disable-next-line no-restricted-globals
      const isDelete = confirm(confirmString);

      if (isDelete) {
        switch (many) {
          case true:
            setPageNumber(1);
            dispatch(
              deleteUser(
                10,
                pageNumber,
                null,
                selectedRows.map((row: UserInterface) => row.id)
              )
            );
            setSelectedRows([]);
            break;
          default:
            if (users?.length === 1) {
              setPageNumber((prevPageNumber: number) => --prevPageNumber);
            }
            dispatch(deleteUser(10, pageNumber, id));
            break;
        }
      }
    },
    [dispatch, pageNumber, selectedRows, users?.length]
  );

  const tableActionsMenu: TableMenuOptionInterface[] = [
    {
      title: "Удалить",
      action: (id: number) => {
        onUserDelete(false, id);
      }
    },
    {
      title: "Редактировать",
      action: (id: number) => {
        history.push(`/edit-user/${id}`);
      }
    }
  ];

  const nextPageClick = useCallback(() => {
    setPageNumber((prevNumber: number) =>
      prevNumber < usersData.pagesCount ? ++prevNumber : prevNumber
    );
  }, [usersData.pagesCount]);

  const prevPageClick = useCallback(() => {
    setPageNumber((prevNumber: number) =>
      prevNumber > 1 ? --prevNumber : prevNumber
    );
  }, []);

  const onSelectedRowsArrChange = useCallback(
    (selectedItems: UserInterface[]) => {
      setSelectedRows(selectedItems);
    },
    []
  );

  return (
    <div className={styles.mainPage}>
      <div className={styles.mainPage__content}>
        <div className={styles.mainPage__actionBtns}>
          <div className={styles.mainPage__btn}>
            <Button variant="contained" color="primary">
              <Link to={"/add-user"}>Добавить пользователя</Link>
            </Button>
          </div>
          <div className={styles.mainPage__btn}>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => onUserDelete(true)}
              disabled={!(selectedRows?.length >= 2)}
            >
              Удалить пользователей
            </Button>
          </div>
        </div>

        {!usersData.data && (pageNumber === 1 || pageNumber === 0) ? (
          <p>
            Пока что вы не добавили ни одного пользователя. Хотите{" "}
            <Link to={"/add-user"}>добавить пользователя</Link>?
          </p>
        ) : !usersData.loading && !organisations.loading ? (
          <>
            <TableComponent
              cols={cols}
              rows={users}
              actionsMenu={tableActionsMenu}
              selectRows={true}
              onSelectedRowsArrChange={onSelectedRowsArrChange}
            />
            <div className={styles.mainPage__pagination}>
              <PaginationComponent
                pageNumber={pageNumber}
                pagesCount={usersData.pagesCount}
                nextPageClick={nextPageClick}
                prevPageClick={prevPageClick}
              />
            </div>
          </>
        ) : (
          <CircularProgress />
        )}

        {usersData.error || organisations.error ? (
          <p className="error">{usersData.error}</p>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
