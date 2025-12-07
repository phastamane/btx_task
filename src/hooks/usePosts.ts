import { useQuery } from "@tanstack/react-query";
import { PostService } from "@/services/post.servise";
import { Post } from "@/types/posts";
import { useMemo } from "react";

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

const usersPostsMap = useMemo(() => {  
   const map = new Map<number, {post: Post[], likes: number}>() 
      
   data?.posts?.forEach((post: Post) => {
    const userId = post.userId
    if(map.has(userId)){ 
      
      map.get(userId)!.post.push(post)
      const item = map.get(userId)
      map.set(userId, {post: item!.post, likes: item!.likes + post.reactions.likes} )
      
    }
      else map.set(userId, {post:[post], likes: post.reactions.likes})
})
    return map
  }, [data])


  return {
    usersPostsMap,
    isLoading,
    isError,
    posts: data,
    error,
  };
}
