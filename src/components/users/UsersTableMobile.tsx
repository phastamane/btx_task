"use client";

import { useMemo, useState } from "react";
import type { UserInterface } from "@/types/users";
import type { Post } from "@/types/posts";
import type { CommentItem } from "@/types/comments";
import InputSearch from "../ui/Input";
import { formatDateRu, pluralAge } from "@/utils/formatDate";
import DropDown from "../ui/DropDown";
import { ROLE_COLORS, ROLE_LABELS } from "@/shared/constants/roles.constants";
import { EyeIcon, HeartIcon, PostIcon } from "../icons/Icons";
import { truncateText } from "@/utils/truncrcateText";

export default function UsersTableMobile({
  users,
  admins = [],
  usersPosts,
  userComments,
}: {
  users: UserInterface[];
  admins?: UserInterface[];
  usersPosts: Map<number, { post: Post[]; likes: number }>;
  userComments: Map<number, { comments: CommentItem[] }>;
}) {
  const [filterValue, setFilterValue] = useState("");

  const combined = useMemo(() => {
    const map = new Map<number, UserInterface>();

    [...admins, ...users].forEach((user) => {
      map.set(user.id, user);
    });

    return Array.from(map.values());
  }, [admins, users]);

  const filteredUsers = useMemo(() => {
    if (!filterValue.trim()) return combined;

    return combined.filter((user) => {
      const expression =
        `${user.firstName} ${user.lastName} ${user.email}`.toLowerCase();
      return expression.includes(filterValue.toLowerCase());
    });
  }, [filterValue, combined]);

  return (
    <div className="flex flex-col pb-10">
      <div className="mx-auto mb-5 px-5 w-full">
        <InputSearch
          filterValue={filterValue}
          setFilterValue={setFilterValue}
          setPage={() => {}}
          placeholder="Поиск по пользователям"
        />
      </div>

      {filteredUsers.length === 0 && (
        <p className="text-center text-sm text-gray-500 mt-4">
          Ничего не найдено
        </p>
      )}

      {filteredUsers.map((user) => {
        const postsCount = usersPosts.get(user.id)?.post.length ?? 0;
        const likesCount = usersPosts.get(user.id)?.likes ?? 0;
        const commentsCount = userComments.get(user.id)?.comments.length ?? 0;
        const roleKey = user.role as keyof typeof ROLE_COLORS;

        return (
          <div
            key={`${user.id}-${user.firstName} ${user.lastName} ${user.email}`}
            className="bg-white border border-gray-200 p-4 shadow-sm flex flex-col"
          >
            <div className="flex justify-between items-start gap-3">
              <div className="flex flex-col gap-2">
                <p className="text-base font-semibold">
                  {user.firstName} {user.maidenName} {user.lastName}
                </p>
                <span
                  className="text-xs text-white px-2 py-1 rounded-md w-fit"
                  style={{ backgroundColor: ROLE_COLORS[roleKey] }}
                >
                  {ROLE_LABELS[roleKey]}
                </span>
                <a
                  href={`mailto:${user.email}`}
                  className="text-sm text-blue-600 break-all hover:underline"
                >
                  {truncateText(user.email, 20)}
                </a>

                <div className="text-sm text-gray-700">
                  <p className="text-xs text-gray-500">Дата рождения</p>
                  <p>
                    {formatDateRu(String(user.birthDate))} (
                    {pluralAge(user.age)})
                  </p>
                </div>
                <div className="text-sm text-gray-700">
                  <p className="text-xs text-gray-500">Пол</p>
                  <p>{user.gender === "male" ? "Мужской" : "Женский"}</p>
                </div>
              </div>

              <DropDown user={user} />
            </div>

            <div className="flex gap-4 text-sm text-gray-700">
              <span className="flex items-center gap-1 text-gray-600">
                <EyeIcon />
                {likesCount}
              </span>
              <span className="flex items-center gap-1 text-gray-600">
                <HeartIcon />
                {postsCount}
              </span>
              <span className="flex items-center gap-1 text-gray-600">
                <PostIcon />
                {commentsCount}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
