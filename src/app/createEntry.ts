"use server";

import { prismaSingleton } from "@/app/prismaSingleton";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createEntry() {
  const newEntry = await prismaSingleton.entry.create({
    data: { text: "", user: { connect: { id: "testuserid" } } },
  });
  revalidatePath("/");
  redirect("/entry/" + newEntry.id);
}
