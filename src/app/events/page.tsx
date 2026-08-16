"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "../../lib/supabase/client";

type Event = {
  id: number;
  title: string;
  description: string;
  event_date: string;
};

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadEvents() {
      const supabase = createClient();

      const { data } = await supabase
        .from("events")
        .select("id, title, description, event_date")
        .order("event_date", {
          ascending: true,
        });

      setEvents(data || []);
      setLoading(false);
    }

    loadEvents();
  }, []);

  return (
    <main className="page-container">

      <div className="page-heading">
        <div className="eyebrow">
          DJSCE EVENTS
        </div>

        <h1>
          Upcoming Events
        </h1>

        <p>
          Discover workshops, competitions and activities
          happening across campus.
        </p>
      </div>

      {loading ? (

        <div className="empty-state">
          Loading events...
        </div>

      ) : events.length === 0 ? (

        <div className="empty-state">
          No upcoming events found.
        </div>

      ) : (

        <div className="events-grid">

          {events.map((event) => (

            <article
              className="event-card"
              key={event.id}
            >

              <div className="event-date">
                {new Date(event.event_date).toLocaleDateString(
                  "en-IN",
                  {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  }
                )}
              </div>

              <h3>
                {event.title}
              </h3>

              <p>
                {event.description}
              </p>

              <Link
                href={`/events/${event.id}`}
                className="event-card-link"
              >
                View Details →
              </Link>

            </article>

          ))}

        </div>

      )}

    </main>
  );
}