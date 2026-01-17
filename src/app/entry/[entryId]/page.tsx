import Editor from "@/app/entry/[entryId]/Editor";
import { prismaSingleton } from "@/app/prismaSingleton";

export default async function Entry({
  params,
}: {
  params: Promise<{ entryId: string }>;
}) {
  const { entryId } = await params;

  const entry = await prismaSingleton.entry.findUniqueOrThrow({
    where: { id: entryId },
  });

  return <Editor entry={entry} />;
}
