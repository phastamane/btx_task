"use client";

import { Key } from "@react-types/shared";
import type { UserInterface } from "@/types/users";
import { formatDateRu, pluralAge } from "@/utils/formatDate";
import DropDown from "../ui/DropDown";

export function adminsRenderCell(
  admin: UserInterface,
  columnKey: Key
) {
  switch (columnKey) {
    case "fullName":
      return (
        <div className="flex gap-2 items-center min-h-6">
          <img
            className="w-6 h-6 rounded-full object-cover"
            src={admin.image ?? "/no-avatar-user.svg"}
            alt="User avatar"
          />
          <p className="font-semibold">
            {admin.firstName} {admin.lastName}
          </p>
        </div>
      );

    case "birthInfo":
      return (
        <div className="flex gap-1">
          <p>{formatDateRu(admin.birthDate)}</p>
          <p className="text-gray-600">({pluralAge(admin.age)})</p>
        </div>
      );

    case "gender":
      return admin.gender === "male" ? "Мужской" : "Женский";

    case "actions":
      return <DropDown user={admin} />;

    default: {
      const value = admin[columnKey as keyof UserInterface];

      if (typeof value === "string" || typeof value === "number") {
        return value;
      }

      return null;
    }
  }
}
