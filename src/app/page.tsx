import Link from "next/link";
import { createClient } from "../lib/supabase/client";

type Event = {
  id: number;
  title: string;
  description: string;
  event_date: string;
};

export default async function Home() {
  const supabase = createClient();

  const { data } = await supabase
    .from("events")
    .select("id, title, description, event_date")
    .order("event_date", { ascending: true })
    .limit(3);

  const events: Event[] = data || [];

  return (
    <main className="home-container">

      <section className="hero">

        <div className="hero-badge">
          DJSCE STUDENT COMMUNITY
        </div>

        <h1>
          Discover. Connect. <span>Experience.</span>
        </h1>

        <p>
          Discover upcoming college events, connect with student
          clubs, and register for experiences that matter to you.
        </p>

        <div className="hero-actions">
          <Link href="/events" className="primary-btn">
            Explore Events →
          </Link>

          <Link
            href="/my-registrations"
            className="secondary-btn"
          >
            My Registrations
          </Link>
        </div>

      </section>

      <section className="stats">

        <div className="stat-card">
          <div className="stat-number">
            {events.length}+
          </div>
          <div className="stat-label">
            Upcoming Events
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-number">
            8+
          </div>
          <div className="stat-label">
            Student Clubs
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-number">
            24/7
          </div>
          <div className="stat-label">
            Easy Access
          </div>
        </div>

      </section>

      <section>

        <div className="section-header">

          <div>
            <p className="section-label">
              WHAT'S HAPPENING
            </p>

            <h2>
              Upcoming Events
            </h2>
          </div>

          <Link
            href="/events"
            className="secondary-btn"
          >
            View All →
          </Link>

        </div>

        {events.length === 0 ? (

          <div className="empty-state">
            No upcoming events available.
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
                  View Event →
                </Link>

              </article>

            ))}

          </div>

        )}

      </section>

    </main>
  );
}