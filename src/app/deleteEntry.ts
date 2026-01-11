"use server";

import { prismaSingleton } from "@/app/prismaSingleton";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function deleteEntry(formData: FormData) {
  const id = formData.get("entry-id") as string;

  await prismaSingleton.entry.delete({
    where: {
      id,
    },
  });
  revalidatePath("/");
  redirect("/");
}
