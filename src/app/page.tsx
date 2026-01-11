import { ViewTransition } from "react";
import { createEntry } from "./createEntry";

export default function Home() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1>Hello friend</h1>
      <form action={createEntry} style={{ width: "50%" }}>
        <ViewTransition name="editor">
          <button
            className="p-8 bg-editor-bg-inactive hover:bg-editor-bg-active font-mono"
            style={{ width: "100%" }}
          >
            What did I do today..?
          </button>
        </ViewTransition>
      </form>
    </div>
  );
}
