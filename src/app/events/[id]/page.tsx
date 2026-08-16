"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { createClient } from "../../../lib/supabase/client";

type Event = {
  id: number;
  title: string;
  description: string;
  event_date: string;
  location?: string;
};

export default function EventDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const [event, setEvent] = useState<Event | null>(null);
  const [user, setUser] = useState<any>(null);
  const [registered, setRegistered] = useState(false);
  const [loading, setLoading] = useState(true);
  const [registering, setRegistering] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadEvent() {
      const supabase = createClient();

      const eventId = Number(params.id);

      const { data: eventData } = await supabase
        .from("events")
        .select("*")
        .eq("id", eventId)
        .single();

      setEvent(eventData);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);

      if (user) {
        const { data: registration } = await supabase
          .from("registrations")
          .select("id")
          .eq("event_id", eventId)
          .eq("user_id", user.id)
          .maybeSingle();

        setRegistered(!!registration);
      }

      setLoading(false);
    }

    loadEvent();
  }, [params.id]);

  async function registerForEvent() {
    if (!user) {
      router.push("/login");
      return;
    }

    setRegistering(true);
    setMessage("");

    const supabase = createClient();

    const { error } = await supabase
      .from("registrations")
      .insert({
        event_id: Number(params.id),
        user_id: user.id,
      });

    if (error) {
      setMessage(error.message);
    } else {
      setRegistered(true);
      setMessage("You are successfully registered!");
    }

    setRegistering(false);
  }

  if (loading) {
    return (
      <main className="page-container">
        <div className="empty-state">
          Loading event...
        </div>
      </main>
    );
  }

  if (!event) {
    return (
      <main className="page-container">
        <div className="empty-state">
          <h2>Event not found</h2>

          <p>
            This event may have been removed or does not exist.
          </p>

          <Link
            href="/events"
            className="primary-btn"
          >
            Back to Events
          </Link>
        </div>
      </main>
    );
  }

  const formattedDate = new Date(
    event.event_date
  ).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

  return (
    <main className="page-container">

      <Link
        href="/events"
        className="back-link"
      >
        ← Back to Events
      </Link>

      <div className="detail-card">

        <div className="event-date">
          UPCOMING EVENT
        </div>

        <h1>
          {event.title}
        </h1>

        <p className="detail-description">
          {event.description}
        </p>

        <div className="detail-info">

          <div className="info-item">
            <strong>📅 Date & Time</strong>
            {formattedDate}
          </div>

          {event.location && (
            <div className="info-item">
              <strong>📍 Location</strong>
              {event.location}
            </div>
          )}

        </div>

        {!user ? (

          <button
            className="primary-btn"
            onClick={() => router.push("/login")}
          >
            Login to Register →
          </button>

        ) : registered ? (

          <button
            className="secondary-btn"
            disabled
          >
            ✓ Registered
          </button>

        ) : (

          <button
            className="primary-btn"
            onClick={registerForEvent}
            disabled={registering}
          >
            {registering
              ? "Registering..."
              : "Register for Event →"}
          </button>

        )}

        {message && (
          <p
            style={{
              marginTop: "18px",
              color: message.includes("success")
                ? "#16a34a"
                : "#dc2626",
              fontWeight: 600,
            }}
          >
            {message}
          </p>
        )}

      </div>

    </main>
  );
}