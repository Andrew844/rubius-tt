import React, { useCallback, useState } from "react";

import { TablePropsInterface } from "../../types/table/tableProps.interface";
import { UserInterface } from "../../../pages/usersPage/types/user.interface";
import { TableColInterface } from "../../types/table/tableCol.interface";
import TableMenu from "./tableMenu/tableMenu.component";

import styles from "./table.component.module.scss";

export const TableComponent = (props: TablePropsInterface) => {
  const {
    cols,
    rows,
    actionsMenu,
    selectRows,
    selectedRows,
    onSelectedRowsArrChange,
  } = props;

  const [selectedItems, setSelectedItems]: [UserInterface[], any] = useState(
    []
  );

  const isRowSelected = useCallback(
    (id: number) => {
      return (
        !!selectedItems.find((row: UserInterface) => row.id === id) ||
        !!selectedRows?.find((row: UserInterface) => row.id === id)
      );
    },
    [selectedItems, selectedRows]
  );

  const onSelectedItemsChange = useCallback(
    (selectedItems: UserInterface[]) => {
      if (onSelectedRowsArrChange) {
        onSelectedRowsArrChange(selectedItems);
      }
    },
    [onSelectedRowsArrChange]
  );

  const onRowClick = useCallback(
    (id: number) => {
      if (selectRows) {
        if (isRowSelected(id)) {
          setSelectedItems((prevSelectedItems: UserInterface[]) => {
            const newSelectedItems = prevSelectedItems.filter(
              (row: UserInterface) => row.id !== id
            );
            onSelectedItemsChange(newSelectedItems);

            return newSelectedItems;
          });

          return;
        }

        setSelectedItems((prevSelectedItems: UserInterface[]) => {
          const newSelectedItems: any[] = [
            ...prevSelectedItems,
            rows?.find((row) => row.id === id),
          ];
          onSelectedItemsChange(newSelectedItems);

          return newSelectedItems;
        });
      }
    },
    [isRowSelected, onSelectedItemsChange, rows, selectRows]
  );

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          {actionsMenu ? <th /> : ""}
          {cols.map((col: TableColInterface) => (
            <th key={col.param}>{col.title}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {rows?.map((row: UserInterface) => (
          <tr
            key={row.id}
            onClick={() => onRowClick(row.id)}
            className={isRowSelected(row.id) ? styles.clickedRow : ""}
          >
            {actionsMenu ? (
              <td>
                <TableMenu options={actionsMenu} currentRowId={row.id} />
              </td>
            ) : (
              ""
            )}
            <td>{`${row.firstName} ${row.lastName} ${row.middleName}`}</td>
            <td>{row.organisation}</td>
            <td>{row.email}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
