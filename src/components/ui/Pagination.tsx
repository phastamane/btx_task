import { Pagination as HeroUIPagination } from "@heroui/react";
import { PaginationProps } from "@/types/pagination";

export default function Pagination({page, setPage, pageCount}:PaginationProps) {
  return (
    <HeroUIPagination
            isCompact
            showControls
            color="primary"
            page={page}
            total={pageCount}
            onChange={setPage}
            classNames={{
              item: "text-blue-500 bg-transparent rounded-none border-l cursor-pointer",
              wrapper: "border-2 border-blue-600  ",
              next: "bg-transparent text-blue-500 cursor-pointer",
              prev: "bg-transparent text-blue-500 cursor-pointer",
              cursor: "rounded-none",
              
            }}
    />
  )
}
