"use client";

import DataTable from "@/components/posts/PostsTable";
import { POSTS_CONST } from "@/shared/constants/posts.constants";

import { useUsers } from "@/hooks/useUsers";
import { usePosts } from "@/hooks/usePosts";
import { useComments } from "@/hooks/useComments";
import { Spinner } from "@heroui/react";

function UserPage() {
  const { posts, isLoading: postsLoading, isError: postsError, error: postsErrorData } = usePosts();
  const { users, userMap, isLoading: usersLoading, isError: usersError, error: usersErrorData } = useUsers();
  const { comments, commentsMap, isLoading: commentsLoading, isError: commentsError, error: commentsErrorData } = useComments();

  if (postsLoading || usersLoading || commentsLoading) {
    return (
      <div className="flex justify-center pt-40">
        <Spinner size="lg" label="Загрузка данных..." />
      </div>
    );
  }

  if (postsError || usersError || commentsError) {
    return (
      <div className="text-red-600 text-xl p-10">
        Ошибка загрузки данных:
        <pre>
          {postsErrorData?.message ||
            usersErrorData?.message ||
            commentsErrorData?.message}
        </pre>
      </div>
    );
  }
  return (
    <div className="px-20 pt-20">
      <div className="grid gap-3 mb-10">
        <h1 className="text-3xl font-semibold">{POSTS_CONST.title}</h1>
        <p className="text-gray-700 text-lg">{POSTS_CONST.subTitle}</p>
      </div>

    {posts?.posts && users && comments && (
  <DataTable posts={posts.posts} users={userMap} comments={commentsMap}/>
)}

    </div>
  );
}

export default UserPage;
