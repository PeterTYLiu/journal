"use server";

import { prismaSingleton } from "@/app/prismaSingleton";

export async function updateEntryText(content: string, entryId: string) {
  await prismaSingleton.entry.update({
    where: {
      id: entryId,
    },
    data: {
      text: content,
    },
  });
}
