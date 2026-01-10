import type { Comment } from "@/app/(sections)/comments/types";

export const FALLBACK_COMMENTS: Comment[] = [
  {
    id: "1",
    name: "John Doe",
    message:
      "Great developer! Robby delivered the project on time and exceeded our expectations. His attention to detail and problem-solving skills are exceptional.",
    photo: "https://placehold.co/100x100/1f2937/e5e7eb?text=JD",
    createdAt: "2025-10-15T10:30:00Z",
  },
  {
    id: "2",
    name: "Sarah Smith",
    message:
      "Working with Robby was a pleasure. He understood our requirements quickly and implemented features that improved our workflow significantly.",
    photo: "https://placehold.co/100x100/1f2937/e5e7eb?text=SS",
    createdAt: "2025-09-20T14:45:00Z",
  },
  {
    id: "3",
    name: "Michael Chen",
    message:
      "Robby is a skilled full-stack developer with excellent communication skills. He kept us updated throughout the project and was always responsive to feedback.",
    photo: "https://placehold.co/100x100/1f2937/e5e7eb?text=MC",
    createdAt: "2025-08-05T09:15:00Z",
  },
];
