import Editor from "@/app/entry/[entryId]/Editor";
import { prismaSingleton } from "@/app/prismaSingleton";
import { notFound } from "next/navigation";

export default async function Entry({
  params,
}: {
  params: Promise<{ entryId: string }>;
}) {
  const { entryId } = await params;

  const entry = await prismaSingleton.entry
    .findUniqueOrThrow({
      where: { id: entryId },
    })
    .catch((reason) => {
      console.error(`Error fetching entry ${entryId}: ` + reason);
      notFound();
    });

  return <Editor entry={entry} />;
}
