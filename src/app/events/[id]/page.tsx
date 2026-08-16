"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "../../../lib/supabase/client";
import { useParams, useRouter } from "next/navigation";

type Event = {
  id: number;
  title: string;
  description: string;
  event_date: string;
  location: string;
};

export default function EventDetailsPage() {
  const supabase = createClient();
  const params = useParams();
  const router = useRouter();

  const [event, setEvent] = useState<Event | null>(null);
  const [user, setUser] = useState<any>(null);
  const [registered, setRegistered] = useState(false);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadEvent() {
      const eventId = Number(params.id);

      const { data: eventData } = await supabase
        .from("events")
        .select("*")
        .eq("id", eventId)
        .single();

      const {
        data: { user },
      } = await supabase.auth.getUser();

      setEvent(eventData);
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

  async function handleRegister() {
    if (!user) {
      router.push("/login");
      return;
    }

    setMessage("");

    const { error } = await supabase.from("registrations").insert({
      user_id: user.id,
      event_id: event!.id,
    });

    if (error) {
      if (error.code === "23505") {
        setMessage("You are already registered for this event.");
      } else {
        setMessage(error.message);
      }
      return;
    }

    setRegistered(true);
    setMessage("Successfully registered for this event!");
  }

  if (loading) {
    return <main className="p-8">Loading...</main>;
  }

  if (!event) {
    return <main className="p-8">Event not found.</main>;
  }

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <Link
  href="/"
  className="mx-auto mb-4 block max-w-3xl text-sm font-medium text-gray-600 hover:text-black"
>
  ← Back to Events
</Link>
      <div className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="text-4xl font-bold">{event.title}</h1>

        <p className="mt-6 text-lg text-gray-600">
          {event.description}
        </p>

        <div className="mt-6 space-y-3">
          <p>
            <strong>📅 Date:</strong>{" "}
            {new Date(event.event_date).toLocaleString("en-IN", {
              dateStyle: "medium",
              timeStyle: "short",
            })}
          </p>

          <p>
            <strong>📍 Location:</strong> {event.location}
          </p>
        </div>

        <div className="mt-8">
          {registered ? (
            <button
              disabled
              className="rounded-lg bg-green-600 px-6 py-3 text-white"
            >
              ✓ Registered
            </button>
          ) : (
            <button
              onClick={handleRegister}
              className="rounded-lg bg-black px-6 py-3 text-white hover:bg-gray-800"
            >
              Register for Event
            </button>
          )}
        </div>

        {message && (
          <p className="mt-4 text-sm font-medium">{message}</p>
        )}
      </div>
    </main>
  );
}