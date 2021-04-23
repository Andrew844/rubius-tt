import React from "react";
import { PaginationComponentPropsInterface } from "./types/paginationComponentProps.interface";

import styles from "./pagination.component.module.scss";

export const PaginationComponent = (
  props: PaginationComponentPropsInterface
) => {
  const { pagesCount, pageNumber, prevPageClick, nextPageClick } = props;

  return (
    <div className={styles.pagination}>
      <p>Страница</p>

      <p className={styles.pagination_arrows}>
        <span
          className={styles.pagination_arrow + " material-icons"}
          onClick={prevPageClick}
        >
          chevron_left
        </span>
        <span>{pageNumber}</span>
        <span
          className={styles.pagination_arrow + " material-icons"}
          onClick={nextPageClick}
        >
          chevron_right
        </span>
      </p>

      <p>из {pagesCount}</p>
    </div>
  );
};
