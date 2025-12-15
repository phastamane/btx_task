"use client";

import { useMemo, useState } from "react";
import type { CommentItem } from "@/types/comments";
import type { UserInterface } from "@/types/users";
import InputSearch from "../ui/Input";

export default function CommentsTableMobile({
  comments,
  users,
}: {
  comments: CommentItem[];
  users: Map<number, UserInterface>;
}) {
  const [filterValue, setFilterValue] = useState("");

  const filtered = useMemo(() => {
    if (!filterValue.trim()) return comments;

    return comments.filter((c) =>
      c.body.toLowerCase().includes(filterValue.toLowerCase())
    );
  }, [comments, filterValue]);

  return (
    <div className="flex flex-col pb-10">
      <div className="mx-auto w-full mb-5 px-5">
        <InputSearch
          filterValue={filterValue}
          setFilterValue={setFilterValue}
          setPage={() => {}}
          placeholder="Поиск по комментариям"
        />
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-sm text-gray-500 mt-4">
          Ничего не найдено
        </p>
      )}

      {filtered.map((item) => {
        const userItem = users.get(item.user.id);
        return (
          <div
            key={item.id}
            className="bg-white border border-gray-200 p-4 gap-5 shadow-sm flex flex-col"
          >
            <div className="flex justify-between items-start gap-5">
              <div className="flex items-center gap-3">
                <img
                  className="w-10 h-10 rounded-full object-cover"
                  src={userItem?.image ?? "/no-avatar-user.svg"}
                  alt="User avatar"
                />
                <div>
                  <p className="text-sm">
                    {userItem
                      ? `${userItem.firstName} ${userItem.lastName[0]}.`
                      : "Неизвестный"}
                  </p>
                </div>
              </div>
            </div>

            <p className="text-sm text-gray-800 leading-snug">{item.body}</p>
          </div>
        );
      })}
    </div>
  );
}
