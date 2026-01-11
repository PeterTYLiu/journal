import Link from "next/link";
import { createEntry } from "./createEntry";
import { prismaSingleton } from "./prismaSingleton";

export default async function Sidebar() {
  const entries = await prismaSingleton.entry.findMany({
    orderBy: { date: "desc" },
  });
  return (
    <div className="p-4" style={{ width: "350px", overflowY: "auto" }}>
      <div className="flex">
        <form action={createEntry}>
          <button>New</button>
        </form>
      </div>
      <div style={{ display: "flex", gap: "15px", flexDirection: "column" }}>
        {entries.map((entry) => {
          const isToday = entry.date.getDate() === new Date().getDate();
          return (
            <Link
              href={"/entry/" + entry.id}
              key={entry.id}
              className="hover:bg-overlay p-2"
            >
              <h3>
                {entry.date.toDateString()}
                {isToday && <span> (today)</span>}
              </h3>
              <p id={entry.id} className="line-clamp-2">
                {entry.text || <i style={{ opacity: 0.4 }}>Empty</i>}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
