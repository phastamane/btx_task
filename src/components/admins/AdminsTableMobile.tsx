"use client";

import { useMemo, useState } from "react";
import { UserInterface } from "@/types/users";
import { formatDateRu, pluralAge } from "@/utils/formatDate";
import DropDown from "../ui/DropDown";
import InputSearch from "../ui/Input";

export default function AdminsTableMobile({
  admins,
}: {
  admins: UserInterface[];
}) {
  const [filterValue, setFilterValue] = useState("");

  const filteredAdmins = useMemo(() => {
    if (!filterValue.trim()) return admins;

    return admins.filter((admin) => {
      const expression =
        `${admin.firstName} ${admin.lastName} ${admin.email}`.toLowerCase();

      return expression.includes(filterValue.toLowerCase());
    });
  }, [admins, filterValue]);

  return (
  <div className="flex flex-col pb-24">
    <div className="mb-5 px-5">
      <InputSearch
        filterValue={filterValue}
        setFilterValue={setFilterValue}
        setPage={() => {}}
        placeholder="Поиск по администраторам"
      />
    </div>

      {/* Список */}
      {filteredAdmins.length === 0 && (
        <p className="text-center text-sm text-gray-500 mt-6">
          Ничего не найдено
        </p>
      )}

      {filteredAdmins.map((item) => (
        <div
          key={item.id}
          className="bg-white border border-gray-200 p-4 shadow-sm"
        >
          {/* Header */}
          <div className="flex justify-between items-start">
            <div className="flex gap-3">
              

              <div className="flex flex-col gap-2">
                <img
                src={item.image ?? "/no-avatar-user.svg"}
                className="w-10 h-10 rounded-full object-cover"
                alt=""
              />
                <p className="font-semibold text-base">
                  {item.firstName} {item.lastName}
                </p>
                <p className="text-sm text-blue-500">{item.email}</p>
              </div>
            </div>

            <DropDown user={item} />
          </div>

          {/* Meta */}
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-900">
            <span>
               <p className="text-xs text-gray-600" >Дата рождения</p>
              {formatDateRu(item.birthDate)} ({pluralAge(item.age)})
            </span>
            <span>
                <p className="text-xs text-gray-600">Пол</p>
              {item.gender === "male" ? "Мужской" : "Женский"}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
