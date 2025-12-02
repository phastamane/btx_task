export interface SelectProps {
  pagesLength: number;
  rowsPerPage: number;

  pageCount: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;


}
