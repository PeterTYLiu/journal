"use server";

import { prismaSingleton } from "@/app/prismaSingleton";

export async function updateEntryDate(formData: FormData) {
  const id = formData.get("entry-id") as string;
  const date = formData.get("date") as string;

  console.log({ id, date });

  await prismaSingleton.entry.update({
    where: {
      id,
    },
    data: {
      date,
    },
  });
}
