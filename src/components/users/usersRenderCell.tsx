import { UserInterface } from "@/types/users";
import { formatDateRu, pluralAge } from "@/utils/formatDate";
import DropDown from "../ui/DropDown";
import { Post } from "@/types/posts";
import { CommentItem } from "@/types/comments";
import { Key } from "@react-types/shared";
import { Chip } from "@heroui/react";

export function usersRenderCell(
  user: UserInterface,
  columnKey: Key,
  usersPosts: Map<number, { post: Post[], likes: number }>,
  userComments: Map<number, { comments: CommentItem[] }>
) {
  switch (columnKey) {
    case "fullName":
      return (
        <div className="flex gap-2 items-center min-h-6">
          <img
            className="w-6 h-6 rounded-full object-cover"
            src={user.image ?? "/no-avatar-user.svg"}
            alt="User avatar"
          />
          <p className="font-semibold">{`${user.firstName} ${user.maidenName} ${user.lastName}`}</p>
        </div>
      );

    case "birthInfo":
      return (
        <div className="flex gap-1">
          <p>{formatDateRu(user.birthDate)}</p>
          <p className="text-gray-600">({pluralAge(user.age)})</p>
        </div>
      );

    case "gender":
      return user.gender === "male" ? "Мужской" : "Женский";

    case "posts":
      return usersPosts.get(user.id)?.post.length ?? 0;

    case "likes":
      return usersPosts.get(user.id)?.likes ?? 0;

    case "comments":
      return userComments.get(user.id)?.comments.length ?? 0;
    
    case "role":{
        switch (user.role){
            case "admin":
                return <Chip color="warning">Администратор</Chip>
            case "moderator":
                return <Chip color="success">Модератор</Chip>
            default:
                return <Chip>Автор</Chip>        
        }}
            
        

    case "actions":
      return <DropDown />;

    default:
      return user[columnKey as keyof UserInterface];
  }
}
