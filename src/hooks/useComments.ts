import { useQuery } from "@tanstack/react-query";
import { CommentsServise } from "@/services/comments.servise";
import { useMemo } from "react";
import { CommentItem } from "@/types/comments";

export function useComments() {
  const {
    isLoading,
    isError,
    data,
    error,
  } = useQuery({
    queryKey: ["comments"],
    queryFn: CommentsServise.getAll,
  });

  const commentsMap = useMemo(() => {
    const map = new Map<number, { comments: CommentItem[] }>();

    data?.comments?.forEach((el: CommentItem) => {
      if (!map.has(el.postId)) map.set(el.postId, { comments: [] });

      map.get(el.postId)!.comments.push(el);
    });

    return map;
  }, [data]);

  return {
    isLoading,
    isError,
    comments: data?.comments,
    commentsMap,
    error,
  };
}
