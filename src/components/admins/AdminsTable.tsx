"use client";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/react";

import type { UserInterface } from "@/types/users";
import InputSearch from "../ui/Input";
import Pagination from "../ui/Pagination";
import SelectPage from "../ui/SelectPage";
import { ADMINS_COLUMNS } from "@/shared/constants/admins.constants";
import { adminsRenderCell } from "./adminsRenderCell";
import { useAdminsTable } from "@/hooks/useAdminsTable";

export default function AdminsTable({ admins }: { admins: UserInterface[] }) {
  const {
    items,
    page,
    pageCount,
    rowsPerPage,
    filterValue,
    sortDescriptor,
    setPage,
    setRowsPerPage,
    setFilterValue,
    setSortDescriptor,
  } = useAdminsTable(admins);

  return (
    <Table
      aria-label="Admins table"
      sortDescriptor={sortDescriptor}
      onSortChange={setSortDescriptor}
      classNames={{
        table: "text-gray-800",
        base: "max-h-full",
        th: "text-gray-500 bg-white font-sm",
        tr: "h-[54px] border-b-1 border-gray-200 last:border-b-0",
        wrapper: "pt-0",
      }}
      topContent={
        <InputSearch
          filterValue={filterValue}
          setFilterValue={setFilterValue}
          setPage={setPage}
          placeholder="Поиск по администраторам"
        />
      }
      topContentPlacement="outside"
      bottomContent={
        <div className="flex w-full justify-between">
          <SelectPage
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
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
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>
                {adminsRenderCell(item, columnKey)}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
