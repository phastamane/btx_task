export interface CommentUser {
  id: number;
  username: string;
  fullName: string;
}

export interface CommentItem {
  id: number;
  body: string;
  postId: number;
  likes: number;
  user: CommentUser;
}

export interface CommentsResponse {
  comments: CommentItem[];
}
export type CommentTableType = Map<number,  {comments: object[]}>
