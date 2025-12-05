import { useQuery } from "@tanstack/react-query";
import { CommentsServise } from "@/services/comments.servise";
import { useMemo } from "react";
import { CommentItem } from "@/types/comments";

export function useComments() {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["comments"],
    queryFn: CommentsServise.getAll,
  });

  const { commentsMap, userCommentsMap } = useMemo(() => {
    const commentsMap = new Map<number, { comments: CommentItem[] }>();
    const userCommentsMap = new Map<number, { comments: CommentItem[] }>();

    data?.comments?.forEach((el: CommentItem) => {
      //находим кол-во комментариев к посту
      if (!commentsMap.has(el.postId)) {
        commentsMap.set(el.postId, { comments: [] });
      } else {
        commentsMap.get(el.postId)!.comments.push(el);
      }

      //находим кол-во комментариев к юзеру
      if (!userCommentsMap.has(el.user.id)) {
        userCommentsMap.set(el.user.id, { comments: [] });
      } else {
        userCommentsMap.get(el.user.id)!.comments.push(el);
      }
    });

    return {
      commentsMap,
      userCommentsMap,
    };
  }, [data]);

  return {
    isLoading,
    isError,
    comments: data?.comments,
    commentsMap,
    userCommentsMap,
    error,
  };
}
