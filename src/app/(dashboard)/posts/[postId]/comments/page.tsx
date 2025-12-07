"use client";
import { Spinner } from "@heroui/react";
import CommentsTable from "@/components/posts/CommetnsTable";
import { COMMENTS_CONST } from "@/shared/constants/comments.constants";
import { I18nProvider } from "@react-aria/i18n";
import Modal from "@/components/ui/Modal";
import { useComments } from "@/hooks/useComments";
import { useUsers } from "@/hooks/useUsers";

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

  const postId  = Number(params.postId);

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
            <div className="flex justify-between">
              <p>{COMMENTS_CONST.backTitle}</p>
              <h1 className="text-3xl font-semibold">{COMMENTS_CONST.title}</h1>
              <Modal page="admins" />
            </div>
            {/* <p className="text-gray-700 text-lg">{posts?.posts.title}</p> */}
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
