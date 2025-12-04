"use client";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Spinner,
  SortDescriptor,
  getKeyValue,
} from "@heroui/react";

import React from "react";
import type { DataTableType, Post } from "@/types/posts";
import type { UserInterface } from "@/types/users";
import type { CommentTableType } from "@/types/comments";
import type { SortableColumn } from "@/types/sortableColumn";
import InputSearch from "../ui/Input";
import Pagination from "../ui/Pagination";
import SelectPage from "../ui/SelectPage";
import { ADMINS_COLUMNS } from "@/shared/constants/admins.constants";
import { SortableColumnAdmins } from "@/types/sortableColumnAdmins";
import { formatDateRu, pluralAge } from "@/utils/formatDate";
import DropDown from "../ui/DropDown";

export default function AdminsTable({ admins }: { admins: UserInterface[] }) {
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "id",
    direction: "ascending",
  });

  const [page, setPage] = React.useState(1);
  const rowsPerPage = 12;

  const [filterValue, setFilterValue] = React.useState("");

  const filteredPosts = React.useMemo(() => {
    if (!filterValue.trim()) return admins;

    return admins.filter((admin) => {
      const expression =
        `${admin.firstName} ${admin.lastName} ${admin.email}`.toLowerCase();
      return expression.includes(filterValue.toLowerCase());
    });
  }, [filterValue, admins]);

  const sortedPosts = React.useMemo(() => {
    const sorted = [...filteredPosts];

    sorted.sort((a, b) => {
      const col = sortDescriptor.column as SortableColumnAdmins;

      const x = a[col];
      const y = b[col];

      if (x < y) return -1;
      if (x > y) return 1;
      return 0;
    });

    if (sortDescriptor.direction === "descending") sorted.reverse();

    return sorted;
  }, [filteredPosts, sortDescriptor]);
  const pageCount = Math.ceil(filteredPosts.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return sortedPosts.slice(start, start + rowsPerPage);
  }, [sortedPosts, page]);

  return (
    <Table
      aria-label="Table"
      sortDescriptor={sortDescriptor}
      onSortChange={setSortDescriptor}
      classNames={{ table: "min-h-auto text-gray-800" }}
      topContent={
        <InputSearch
          filterValue={filterValue}
          setFilterValue={setFilterValue}
          setPage={setPage}
        />
      }
      topContentPlacement="outside"
      bottomContent={
        <div className="flex w-full justify-between ">
          <SelectPage
            pagesLength={filteredPosts.length}
            rowsPerPage={rowsPerPage}
            pageCount={pageCount}
            setPage={setPage}
          />

          <Pagination page={page} setPage={setPage} pageCount={pageCount} />
        </div>
      }
      bottomContentPlacement="outside"
    >
      <TableHeader columns={ADMINS_COLUMNS}>
        {(column) => (
          <TableColumn key={column.key} allowsSorting={column.sorting}>
            {column.label}
          </TableColumn>
        )}
      </TableHeader>

      <TableBody items={items} emptyContent="Ничего не найдено">
        {(item: UserInterface) => (
          <TableRow key={item.id}>
            {(columnKey) => {
              switch (columnKey) {
                case "fullName":
                  return (
                     <TableCell>
                         <div className="flex gap-2 items-center min-h-6">
                          {item?.image ? (
                            <img
                              className="max-w-6"
                              src={item.image}
                              alt="User avatar"
                            />
                          ) : (
                            <img
                              className="max-w-6"
                              src="/no-avatar-user.svg"
                              alt="Cant such user avatar"
                            />
                          )}
                          
                            <p className="font-semibold">{`${item.firstName} ${item.lastName}`}</p>
                            
                        </div>
                     </TableCell>
                  );
                case "birthInfo":
                  return <TableCell><div className="flex gap-1"><p>{formatDateRu(item.birthDate)}</p><p className="text-gray-600">({pluralAge(item.age)})</p></div></TableCell>;
                case "actions":
                  return (
                    <TableCell>
                      <DropDown></DropDown>
                    </TableCell>
                  );
                case "gender":
                    return(
                        <TableCell>
                      {item.gender === 'male' ? 'Мужской' : "Женский"}
                    </TableCell>
                    )

                default:
                  return <TableCell>{getKeyValue(item, columnKey)}</TableCell>;
              }
            }}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
