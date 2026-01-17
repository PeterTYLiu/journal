"use server";

import { prismaSingleton } from "@/app/prismaSingleton";
import { revalidatePath } from "next/cache";

export type UpdateEntryDateState = null | "failed" | "success";

export async function updateEntryDate(
  _: UpdateEntryDateState,
  formData: FormData
): Promise<UpdateEntryDateState> {
  const id = formData.get("entry-id") as string;
  const date = formData.get("date") as string;

  try {
    await prismaSingleton.entry.update({
      where: {
        id,
      },
      data: {
        date: new Date(date + "T00:00:00-05:00"),
      },
    });
    revalidatePath("/");
    return "success";
  } catch (e) {
    console.error(e);
    return "failed";
  }
}
