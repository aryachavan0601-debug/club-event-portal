import Navbar from "./components/Navbar";
import { createClient } from "../lib/supabase/client";

export default async function Home() {
  const supabase = createClient();

  const { data: events, error } = await supabase
    .from("events")
    .select("*")
    .order("event_date", { ascending: true });

  if (error) {
    return (
      <main className="p-8">
        <h1 className="text-2xl font-bold">Unable to load events</h1>
        <p className="mt-2 text-red-600">{error.message}</p>
      </main>
    );
  }

  return (
  <main className="min-h-screen bg-gray-100">
    <Navbar />
      <div className="mx-auto max-w-6xl">
        <header className="mb-10">
          <h1 className="text-4xl font-bold">Club Event Portal</h1>
          <p className="mt-2 text-gray-600">
            Discover upcoming events and register to participate.
          </p>
        </header>

        {events.length === 0 ? (
          <p>No upcoming events found.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <div
                key={event.id}
                className="rounded-2xl bg-white p-6 shadow-md"
              >
                <h2 className="text-xl font-bold">{event.title}</h2>

                <p className="mt-3 text-gray-600">
                  {event.description}
                </p>

                <p className="mt-4 font-medium">
                  📅{" "}
                  {new Date(event.event_date).toLocaleString("en-IN", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </p>

                <p className="mt-2 text-gray-600">
                  📍 {event.location}
                </p>

                <a
                  href={`/events/${event.id}`}
                  className="mt-5 inline-block rounded-lg bg-black px-5 py-2 text-white"
                >
                  View Event
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}