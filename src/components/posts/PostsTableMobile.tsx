"use client";

import { useMemo, useState } from "react";
import type { DataTableType, Post } from "@/types/posts";
import type { UserTableType } from "@/types/users";
import type { CommentTableType } from "@/types/comments";
import InputSearch from "../ui/Input";
import { useRouter } from "next/navigation";
import { EyeIcon, PostIcon, HeartIcon, ArrowIcon } from "../icons/Icons";
import { Select, SelectItem } from "@heroui/react";

type SortColumn = "title" | "author" | "views" | "likes" | "comments" | "id";
type SortDirection = "asc" | "desc";

export default function PostsTableMobile({
  posts,
  users,
  comments,
}: {
  posts: DataTableType;
  users: UserTableType;
  comments: CommentTableType;
}) {
  const [filterValue, setFilterValue] = useState("");
  const [sortColumn, setSortColumn] = useState<SortColumn>("id");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const router = useRouter();

  const filteredPosts = useMemo(() => {
    if (!filterValue.trim()) return posts;
    const search = filterValue.toLowerCase();

    return posts.filter((p) => p.title.toLowerCase().includes(search));
  }, [posts, filterValue]);

  const sortedPosts = useMemo(() => {
    const copy = [...filteredPosts];

    copy.sort((a, b) => {
      let x: any;
      let y: any;

      switch (sortColumn) {
        case "title":
          x = a.title;
          y = b.title;
          break;
        case "author": {
          const ax = users.get(a.userId);
          const ay = users.get(b.userId);
          x = ax ? `${ax.firstName} ${ax.lastName}` : "";
          y = ay ? `${ay.firstName} ${ay.lastName}` : "";
          break;
        }
        case "views":
          x = a.views;
          y = b.views;
          break;
        case "likes":
          x = a.reactions.likes;
          y = b.reactions.likes;
          break;
        case "comments":
          x = comments.get(a.id)?.comments.length ?? 0;
          y = comments.get(b.id)?.comments.length ?? 0;
          break;
        case "id":
        default:
          x = a.id;
          y = b.id;
      }

      if (x < y) return -1;
      if (x > y) return 1;
      return 0;
    });

    if (sortDirection === "desc") copy.reverse();
    return copy;
  }, [filteredPosts, sortColumn, sortDirection, users, comments]);

  return (
    <div className="flex flex-col pb-10">
      <div className=" mb-5 flex flex-col gap-3">
        <div className="mb-5 px-5">
        <InputSearch
          filterValue={filterValue}
          setFilterValue={setFilterValue}
          setPage={() => {}}
          placeholder="Поиск по публикациям"
        />
        </div>
        <Select
          aria-label="Выбор сортировки"
          selectedKeys={new Set([sortColumn])}
          onSelectionChange={(keys) =>
            setSortColumn(Array.from(keys)[0] as SortColumn)
          }
          className="max-w-xs px-5"
          classNames={{
            trigger: "bg-white",
            label: "text-gray-800",
          }}
          label="Сортировать по"
          labelPlacement="outside-left"
        >
          <SelectItem key="id">ID</SelectItem>
          <SelectItem key="author">Автор</SelectItem>
          <SelectItem key="views">Просмотры</SelectItem>
          <SelectItem key="likes">Лайки</SelectItem>
          <SelectItem key="comments">Комментарии</SelectItem>
        </Select>
      </div>

      {sortedPosts.length === 0 && (
        <p className="text-center text-sm text-gray-500 mt-4">
          Ничего не найдено
        </p>
      )}

      {sortedPosts.map((post: Post) => {
        const author = users.get(post.userId);
        const commentsCount = comments.get(post.id)?.comments.length ?? 0;

        return (
          <div
            key={post.id}
            className="bg-white border border-gray-200 p-4 shadow-sm flex flex-col "
          >
            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-5 mb-5">
                <p className="text-xs text-gray-500">{post.id}</p>
                <span className="flex items-center gap-2">
                  <img
                    src={author?.image ?? "/no-avatar-user.svg"}
                    alt="author"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="">
                    {author
                      ? `${author.firstName} ${author.lastName}`
                      : "Неизвестный автор"}
                  </span>
                </span>
                <h3 className="text-lg font-semibold leading-snug">
                  {post.title}
                </h3>
              </div>
              <div
                className="min-w-[22px] cursor-pointer "
                onClick={() => router.push(`/posts/${post.id}/comments`)}
              >
                <ArrowIcon />
              </div>
            </div>

            <div className="flex flex-wrap gap-3 text-sm text-gray-800">
              <span className="flex items-center gap-1 text-gray-600">
                <EyeIcon />
                {post.views}
              </span>
              <span className="flex items-center gap-1 text-gray-600">
                <HeartIcon />
                {post.reactions.likes}
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
