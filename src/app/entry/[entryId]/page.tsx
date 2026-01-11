import { deleteEntry } from "@/app/deleteEntry";
import { prismaSingleton } from "@/app/prismaSingleton";
import Editor from "@/components/Editor";
import type { Entry } from "@/generated/prisma/client";
import { updateEntryDate } from "./updateEntryDate";
import { updateEntryText } from "./updateEntryText";

export default async function Entry({
  params,
}: {
  params: Promise<{ entryId: string }>;
}) {
  const { entryId } = await params;

  let entry: Entry | undefined | null;

  entry = await prismaSingleton.entry.findUniqueOrThrow({
    where: { id: entryId },
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100dvh" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <form action={updateEntryDate}>
          <input type="hidden" value={entry.id} name="entry-id" />
          <input
            type="date"
            name="date"
            defaultValue={entry.date.toISOString().substring(0, 10)}
          />
        </form>
        <form action={deleteEntry}>
          <input type="hidden" name="entry-id" value={entryId} />
          <button>Delete</button>
        </form>
      </div>
      <Editor
        initialContent={entry.text}
        onContentChange={updateEntryText}
        entryId={entry.id}
      />
    </div>
  );
}
