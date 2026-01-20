import { ViewTransition } from "react";
import { createEntry } from "./createEntry";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <h1>Hello friend</h1>
      <form action={createEntry} className="w-[50%]">
        <ViewTransition name="editor">
          <button className="p-8 bg-editor font-mono w-full">
            What did I do today..?
          </button>
        </ViewTransition>
      </form>
    </div>
  );
}
