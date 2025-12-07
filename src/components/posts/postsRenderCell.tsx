'use client'
import { Key } from "@react-types/shared";
import type { Post } from "@/types/posts";
import type { UserTableType } from "@/types/users";
import type { CommentTableType } from "@/types/comments";
import { useRouter } from "next/navigation";

export function postsRenderCell(
  post: Post,
  columnKey: Key,
  users: UserTableType,
  comments: CommentTableType,
) {
 
  switch (columnKey) {
    case "title":
      return <p className="font-semibold">{post.title}</p>;

    case "likes":
      return post.reactions.likes;

    case "author": {
      const author = users.get(post.userId);

      return (
        <div className="flex gap-2 items-center min-h-6">
          
            <img
              className="w-6 h-6 rounded-full object-cover"
              src={author?.image ?? "/no-avatar-user.svg"}
              alt="User avatar"
              
            />
          
          {author ? `${author.firstName} ${author.lastName}` : "Unknown"}
        </div>
      );
    }

    case "comments":
      return comments.get(post.id)?.comments.length ?? 0;

    default: {
      const value = post[columnKey as keyof Post];

      if (typeof value === "string" || typeof value === "number") return value;

      return null; // защищает от объектов
    }
  }
}
