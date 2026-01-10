import { useMutation } from "@tanstack/react-query";
import { sendContactMessage } from "./lib";
import { ContactFormData } from "./types";

export function useSendContact() {
  return useMutation({
    mutationFn: (data: ContactFormData) => sendContactMessage(data),
  });
}
