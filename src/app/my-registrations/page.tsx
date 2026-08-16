"use client";

import { useEffect, useState } from "react";
import { createClient } from "../../lib/supabase/client";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Registration = {
  id: number;
  registered_at: string;
  events: {
    id: number;
    title: string;
    description: string;
    event_date: string;
    location: string;
  };
};

export default function MyRegistrationsPage() {
  const supabase = createClient();
  const router = useRouter();

  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadRegistrations() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      const { data, error } = await supabase
        .from("registrations")
        .select(`
          id,
          registered_at,
          events (
            id,
            title,
            description,
            event_date,
            location
          )
        `)
        .eq("user_id", user.id)
        .order("registered_at", { ascending: false });

      if (!error && data) {
        setRegistrations(data as unknown as Registration[]);
      }

      setLoading(false);
    }

    loadRegistrations();
  }, []);

  if (loading) {
    return <main className="p-8">Loading...</main>;
  }

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-3xl font-bold">My Registrations</h1>

        <p className="mt-2 mb-8 text-gray-600">
          Events you have registered for.
        </p>

        {registrations.length === 0 ? (
          <div className="rounded-xl bg-white p-8 text-center shadow">
            <p className="text-gray-500">
              You haven't registered for any events yet.
            </p>

            <Link
              href="/"
              className="mt-4 inline-block rounded-lg bg-black px-5 py-2 text-white"
            >
              Browse Events
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {registrations.map((registration) => (
              <div
                key={registration.id}
                className="rounded-xl bg-white p-6 shadow"
              >
                <h2 className="text-xl font-bold">
                  {registration.events.title}
                </h2>

                <p className="mt-2 text-gray-600">
                  {registration.events.description}
                </p>

                <p className="mt-4">
                  📅{" "}
                  {new Date(
                    registration.events.event_date
                  ).toLocaleString("en-IN")}
                </p>

                <p className="mt-2">
                  📍 {registration.events.location}
                </p>

                <p className="mt-4 text-sm text-green-600">
                  ✓ Registered
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}