export interface Comment {
  id: string | number;
  name: string;
  message: string;
  photo?: string;
  createdAt: string;
}

export interface CommentInput {
  name: string;
  message: string;
  photo?: File;
}
