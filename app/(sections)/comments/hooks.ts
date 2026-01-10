import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getComments, postComment } from "./lib";
import { CommentInput } from "./types";

export function useComments() {
  return useQuery({
    queryKey: ["comments"],
    queryFn: getComments,
    staleTime: 1000 * 60,
  });
}

export function usePostComment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CommentInput) => postComment(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
  });
}
