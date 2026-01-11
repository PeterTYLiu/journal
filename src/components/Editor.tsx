"use client";

import { useEffect, useRef, useState, ViewTransition } from "react";

interface EditorProps {
  initialContent: string;
  entryId: string;
  onContentChange: (content: string, entryId: string) => void;
}

export default function Editor({
  initialContent,
  onContentChange,
  entryId,
}: EditorProps) {
  const [content, setContent] = useState(initialContent);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      console.warn("The timer triggered");
      onContentChange(content, entryId);
      const thisLinkText = document.getElementById(entryId);
      if (thisLinkText) {
        if (content) {
          thisLinkText.innerText = content;
        } else {
          thisLinkText.innerHTML = "<i style='opacity: 0.4;'>Empty</i>";
        }
      }
    }, 900);

    return () => clearTimeout(timer);
  }, [content, onContentChange]);

  useEffect(() => {
    textAreaRef.current?.focus();
  }, []);

  return (
    <ViewTransition name="editor">
      <textarea
        name="editor"
        ref={textAreaRef}
        className="font-mono p-6 bg-editor-bg-inactive focus:bg-editor-bg-active"
        style={{
          width: "100%",
          resize: "none",
          flexGrow: "1",
          border: "none",
          outline: "none",
        }}
        value={content}
        autoCorrect="off"
        autoCapitalize="off"
        placeholder="Write down what you did today"
        onChange={(e) => setContent(e.target.value)}
      />
    </ViewTransition>
  );
}
