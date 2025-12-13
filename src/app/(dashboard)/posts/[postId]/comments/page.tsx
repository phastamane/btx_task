"use client";
import { Spinner } from "@heroui/react";
import CommentsTable from "@/components/posts/CommetnsTable";
import { COMMENTS_CONST } from "@/shared/constants/comments.constants";
import { I18nProvider } from "@react-aria/i18n";
import { useRouter } from "next/navigation";
import { useComments } from "@/hooks/useComments";
import { useUsers } from "@/hooks/useUsers";
import { usePosts } from "@/hooks/usePosts";
import CommentsTableMobile from "@/components/posts/CommentsTableMobile";
import { SimpleArrow } from "@/components/icons/Icons";
import { Post } from "@/types/posts";

function CommentsPage({ params }: { params: { postId: string } }) {
  const {
    commentsMap,
    isLoading: commentsLoading,
    isError: commentsError,
    error: commentsErrorData,
  } = useComments();
  const {
    userMap,
    isLoading: usersLoading,
    isError: usersError,
    error: usersErrorData,
  } = useUsers();

  const {
    posts,
    isError: postsError,
    error: postsErrorData,
  } = usePosts();

  const router = useRouter();

  const postId = Number(params.postId);

  if (commentsLoading) {
    return (
      <div className="flex justify-center pt-40">
        <Spinner size="lg" label="Загрузка данных..." />
      </div>
    );
  }

  if (commentsError || postsError || usersError) {
    return (
      <div className="text-red-600 text-xl p-10">
        Ошибка загрузки данных:
        <pre>{commentsErrorData?.message}</pre>
        <pre>{postsErrorData?.message}</pre>
        <pre>{usersErrorData?.message}</pre>
      </div>
    );
  }
  return (
    <>
      <I18nProvider locale="ru-RU">
        <div>
          <div className="grid gap-3 mb-5 max-lg:px-5">
            <div className="flex flex-col gap-8 max-xl:px-0 max-lg:pt-10">
              <button
                onClick={() => router.back()}
                className="hover:underline w-fit cursor-pointer flex gap-2 max-sm:text-sm items-center text-gray-700"
              >
                <div ><SimpleArrow/></div>
                {COMMENTS_CONST.backTitle}
              </button>

              <h1 className="text-3xl font-semibold max-sm:text-xl  max-sm:mr-auto">{COMMENTS_CONST.title}</h1>
            </div>
            <p className="text-gray-600 text-lg max-xl:px-0 max-sm:text-sm">
              {posts?.posts.find((p: Post) => p.id === postId)?.title ?? ""}
            </p>
          </div>
          {commentsMap && userMap && (
            <>
              <div className="hidden xl:block">
                <CommentsTable
                  commentsMap={commentsMap}
                  users={userMap}
                  postId={postId}
                />
              </div>
              <div className="xl:hidden">
                <CommentsTableMobile
                  comments={commentsMap.get(postId)?.comments ?? []}
                  users={userMap}
                />
              </div>
            </>
          )}
        </div>
      </I18nProvider>
    </>
  );
}

export default CommentsPage;
