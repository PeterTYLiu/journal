import Link from "next/link";
import { createEntry } from "./createEntry";
import { prismaSingleton } from "./prismaSingleton";

export default async function Sidebar() {
  const entries = await prismaSingleton.entry.findMany({
    orderBy: { date: "desc" },
  });
  const groupedEntries = Object.groupBy(entries, (entry) =>
    entry.date.toDateString()
  );
  const todayDateString = new Date().toDateString();
  return (
    <div className="w-80 flex flex-col">
      <div className="flex justify-between p-4">
        <form action={createEntry}>
          <button>New</button>
        </form>
        <Link href="/">Home</Link>
      </div>
      <div
        className="p-4"
        style={{
          display: "flex",
          gap: "15px",
          flexDirection: "column",
          overflowY: "auto",
        }}
      >
        {Object.entries(groupedEntries).map(([dateString, entriesInGroup]) => {
          if (!entriesInGroup) return null; // This makes TS happy
          const isToday = dateString === todayDateString;
          return (
            <div key={dateString}>
              <h3 className="text-text-secondary">
                {dateString}
                {isToday && <span> (today)</span>}
              </h3>
              {entriesInGroup.map((entry) => {
                return (
                  <Link
                    href={"/entry/" + entry.id}
                    key={entry.id}
                    className="hover:bg-overlay p-2 block"
                  >
                    <p id={entry.id} className="line-clamp-2">
                      {entry.text || <i style={{ opacity: 0.4 }}>Empty</i>}
                    </p>
                  </Link>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
