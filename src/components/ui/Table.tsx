import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from "@heroui/react";
import { Spinner } from "@heroui/react";
import React from "react";
import { useAsyncList } from "react-stately";
import type { DataTableType } from "@/types/posts";
import type { UserTableType } from "@/types/users";
import SelectPage from "./SelectPage";
import Pagination from "./Pagination";

export default function DataTable({
  posts,
  users,
}: {
  posts: DataTableType;
  users: UserTableType;
}) {
  const [page, setPage] = React.useState<number>(1);

  const rowsPerPage = 12;

  const pageCount = Math.ceil(posts.length / rowsPerPage);

  let list = useAsyncList({
    async load() {
      return { items: posts };
    },

    async sort({ items, sortDescriptor }) {
      const { column, direction } = sortDescriptor;

      const sorted = [...items].sort((a, b) => {
        let first: any;
        let second: any;

        switch (column) {
          case "likes":
            first = a.reactions.likes;
            second = b.reactions.likes;
            break;

          default:
            first = a[column as keyof typeof a];
            second = b[column as keyof typeof b];
            break;
        }

        if (first < second) return -1;
        if (first > second) return 1;
        return 0;
      });

      if (direction === "descending") {
        sorted.reverse();
      }

      return { items: sorted };
    },
  });

  const start = (page - 1) * rowsPerPage;
  const end = start + rowsPerPage;
  const pageItems = list.items.slice(start, end);

  return (
    <Table
      aria-label="Table"
      bottomContent={
        <div className="flex w-full justify-between ">
          <SelectPage
            pagesLength={posts.length}
            rowsPerPage={rowsPerPage}
            pageCount={pageCount}
            setPage={setPage}
          />

          <Pagination
            page={page}
            setPage={setPage}
            pageCount={pageCount}
          />
        </div>
      }
      bottomContentPlacement="outside"
      classNames={{ table: "min-h-[65dvh] text-gray-800" }}
      sortDescriptor={list.sortDescriptor}
      onSortChange={list.sort}
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn key={column.key} allowsSorting={column.sorting}>
            {column.label}
          </TableColumn>
        )}
      </TableHeader>

      <TableBody
        isLoading={list.isLoading}
        items={pageItems}
        loadingContent={<Spinner label="Loading..." />}
      >
        {(item) => (
          <TableRow className="border-t border-b border-gray-100" key={item.id}>
            {(columnKey) => {
              if (columnKey === "likes") {
                return <TableCell>{item.reactions.likes}</TableCell>;
              }
              if (columnKey === "title") {
                return (
                  <TableCell className="font-semibold">
                    {getKeyValue(item, columnKey)}
                  </TableCell>
                );
              }

              if (columnKey === "author") {
                const author = users.get(item.userId);
                return (
                  <TableCell>
                    {author
                      ? `${author.firstName} ${author.lastName}`
                      : "Unknown"}
                  </TableCell>
                );
              }

              return <TableCell>{getKeyValue(item, columnKey)}</TableCell>;
            }}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

const columns = [
  { key: "id", label: "ID", sorting: true },
  { key: "title", label: "Пост", sorting: false },
  { key: "author", label: "Автор", sorting: false },
  { key: "views", label: "Просмотры", sorting: true },
  { key: "likes", label: "Лайки", sorting: true },
  { key: "comments", label: "Коментарии", sorting: true },
];
