import { api } from "@/app/lib/api";
import { FALLBACK_COMMENTS } from "@/app/lib/fallback";
import type { Comment, CommentInput } from "./types";

export const getComments = () =>
  api.get<Comment[]>(
    "/comments",
    { tags: ["comments"], revalidate: 60 },
    FALLBACK_COMMENTS
  );

export const postComment = async (data: CommentInput): Promise<Comment> => {
  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("message", data.message);
  if (data.photo) formData.append("photo", data.photo);

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/comments`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) throw new Error("Failed to post comment");
  return res.json();
};
