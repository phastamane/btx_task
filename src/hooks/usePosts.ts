import { useQuery } from "@tanstack/react-query";
import { PostService } from "@/services/post.servise";

export function usePosts() {
  const {
    isLoading,
    isError,
    data,
    error,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: PostService.getAll,
  });

  return {
    isLoading,
    isError,
    posts: data,
    error,
  };
}
