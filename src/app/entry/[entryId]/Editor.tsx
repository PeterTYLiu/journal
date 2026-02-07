"use client";

import { deleteEntry } from "@/app/deleteEntry";
import { Entry } from "@/generated/prisma/client";
import {
  type ChangeEventHandler,
  useActionState,
  useEffect,
  useRef,
  useState,
  ViewTransition,
} from "react";
import { updateEntryDate, type UpdateEntryDateState } from "./updateEntryDate";
import { updateEntryText } from "./updateEntryText";

export default function Editor({ entry }: { entry: Entry }) {
  const [content, setContent] = useState(entry.text);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const timeoutIdRef = useRef<number>(-1);
  const dateFormRef = useRef<HTMLFormElement>(null);
  const [updateDateState, updateDateAction, isUpdatingDate] = useActionState<
    UpdateEntryDateState,
    FormData
  >(updateEntryDate, null);

  const handleTextInput: ChangeEventHandler<HTMLTextAreaElement> = ({
    target: { value: newContent },
  }) => {
    clearTimeout(timeoutIdRef.current);
    setContent(newContent);
    const thisLinkText = document.getElementById(entry.id);
    if (thisLinkText) {
      if (newContent) {
        thisLinkText.innerText = newContent;
      } else {
        thisLinkText.innerHTML = "<i class='opacity-40'>Empty</i>";
      }
    }
    timeoutIdRef.current = window.setTimeout(() => {
      updateEntryText(newContent, entry.id);
    }, 900);
  };

  useEffect(() => {
    textAreaRef.current?.focus();
  }, []);

  useEffect(() => {
    if (
      updateDateState !== null &&
      !isUpdatingDate &&
      updateDateState === "failed"
    ) {
      alert("Failed to update date");
    }
  }, [isUpdatingDate, updateDateState]);

  return (
    <ViewTransition name="editor">
      <title>{entry.date.toDateString()}</title>
      <div className="flex flex-col h-dvh bg-editor gap-2">
        <div className="flex justify-between p-6 pb-0">
          <form action={updateDateAction} ref={dateFormRef}>
            <input type="hidden" value={entry.id} name="entry-id" />
            <input
              className="text-2xl w-40"
              onChange={() => dateFormRef.current?.requestSubmit()}
              type="date"
              name="date"
              defaultValue={entry.date.toLocaleString("en-CA", {
                timeZone: "America/New_York",
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })}
            />
          </form>
          <form action={deleteEntry}>
            <input type="hidden" name="entry-id" value={entry.id} />
            <button>Delete</button>
          </form>
        </div>
        <textarea
          name="editor"
          ref={textAreaRef}
          className="font-mono p-6 w-full resize-none grow border-0 outline-0"
          value={content}
          autoCorrect="off"
          autoCapitalize="off"
          placeholder="Write down what you did today"
          onChange={handleTextInput}
        />
      </div>
    </ViewTransition>
  );
}
