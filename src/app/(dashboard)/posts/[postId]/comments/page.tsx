"use client";
import { use } from "react";
import { Spinner } from "@heroui/react";
import CommentsTable from "@/components/posts/CommetnsTable";
import { COMMENTS_CONST } from "@/shared/constants/comments.constants";
import { I18nProvider } from "@react-aria/i18n";
import { useRouter } from "next/navigation";
import { useComments } from "@/hooks/useComments";
import { useUsers } from "@/hooks/useUsers";
import { usePosts } from "@/hooks/usePosts";

function CommentsPage(props: { params: Promise<{ postId: string }> }) {
  const params = use(props.params);
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

  const { posts } = usePosts();

  const router = useRouter();

  const postId = Number(params.postId);

  if (commentsLoading) {
    return (
      <div className="flex justify-center pt-40">
        <Spinner size="lg" label="Загрузка данных..." />
      </div>
    );
  }

  if (commentsError) {
    return (
      <div className="text-red-600 text-xl p-10">
        Ошибка загрузки данных:
        <pre>{commentsErrorData?.message}</pre>
      </div>
    );
  }
  return (
    <>
      <I18nProvider locale="ru-RU">
        <div className="px-20 pt-20">
          <div className="grid gap-3 mb-10">
            <div className="flex flex-col gap-8">
              <button
                onClick={() => router.back()}
                className="hover:underline w-fit cursor-pointer"
              >
                {COMMENTS_CONST.backTitle}
              </button>

              <h1 className="text-3xl font-semibold">{COMMENTS_CONST.title}</h1>
            </div>
            <p className="text-gray-700 text-lg">
              {posts?.posts[postId].title}
            </p>
          </div>
          {commentsMap && userMap && (
            <CommentsTable
              commentsMap={commentsMap}
              users={userMap}
              postId={postId}
            />
          )}
        </div>
      </I18nProvider>
    </>
  );
}

export default CommentsPage;
