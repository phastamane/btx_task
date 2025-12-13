"use client";

import DataTable from "@/components/posts/PostsTable";
import { POSTS_CONST } from "@/shared/constants/posts.constants";
import PostsTableMobile from "@/components/posts/PostsTableMobile";

import { useUsers } from "@/hooks/useUsers";
import { usePosts } from "@/hooks/usePosts";
import { useComments } from "@/hooks/useComments";
import { Spinner } from "@heroui/react";

function UserPage() {
  const {
    posts,
    isLoading: postsLoading,
    isError: postsError,
    error: postsErrorData,
  } = usePosts();
  const {
    users,
    userMap,
    isLoading: usersLoading,
    isError: usersError,
    error: usersErrorData,
  } = useUsers();
  const {
    comments,
    commentsMap,
    isLoading: commentsLoading,
    isError: commentsError,
    error: commentsErrorData,
  } = useComments();

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
    <div>
      <div className="flex flex-col gap-5 mb-10 max-xl:items-center max-xl:gap-5 max-xl:pt-5 max-sm:px-5 max-sm:mb-5">
        <h1 className="text-3xl font-semibold max-sm:text-xl  max-sm:mr-auto">
          {POSTS_CONST.title}
        </h1>
        <p className="max-lg:hidden text-gray-700 text-lg max-sm:text-sm max-sm:mr-auto">
          {POSTS_CONST.subTitle}
        </p>
      </div>
      {posts?.posts && users && comments && (
        <>
          <div className="hidden xl:block">
            <DataTable
              posts={posts.posts}
              users={userMap}
              comments={commentsMap}
            />
          </div>
          <div className="xl:hidden">
            <PostsTableMobile
              posts={posts.posts}
              users={userMap}
              comments={commentsMap}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default UserPage;
