import { api } from "@/app/lib/api";
import type { ContactFormData } from "./types";

export const sendContactMessage = (data: ContactFormData) =>
  api.post<{ success: boolean; message?: string }>("/contact", data);
