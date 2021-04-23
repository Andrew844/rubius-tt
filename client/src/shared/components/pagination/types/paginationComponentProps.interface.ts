export interface PaginationComponentPropsInterface {
  pagesCount: number;
  pageNumber: number;
  nextPageClick: () => void;
  prevPageClick: () => void;
}
