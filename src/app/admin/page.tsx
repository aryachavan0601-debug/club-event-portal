"use client";

import { useEffect, useState } from "react";
import { createClient } from "../../lib/supabase/client";
import { useRouter } from "next/navigation";

type Registration = {
  id: number;
  registered_at: string;
  profiles: {
    full_name: string;
  };
  events: {
    title: string;
    event_date: string;
  };
};

export default function AdminPage() {
  const supabase = createClient();
  const router = useRouter();

  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    async function loadAdminData() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      if (profile?.role !== "admin") {
        router.push("/");
        return;
      }

      setAuthorized(true);

      const { data, error } = await supabase
        .from("registrations")
        .select(`
          id,
          registered_at,
          profiles (
            full_name
          ),
          events (
            title,
            event_date
          )
        `)
        .order("registered_at", { ascending: false });

      if (!error && data) {
        setRegistrations(data as unknown as Registration[]);
      }

      setLoading(false);
    }

    loadAdminData();
  }, []);

  if (loading) {
    return <main className="p-8">Loading admin dashboard...</main>;
  }

  if (!authorized) {
    return null;
  }

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-2 text-3xl font-bold">
          Admin Dashboard
        </h1>

        <p className="mb-8 text-gray-600">
          View all event registrations.
        </p>

        <div className="overflow-x-auto rounded-xl bg-white shadow">
          <table className="w-full">
            <thead className="border-b bg-gray-50">
              <tr>
                <th className="p-4 text-left">Student</th>
                <th className="p-4 text-left">Event</th>
                <th className="p-4 text-left">Event Date</th>
                <th className="p-4 text-left">Registered At</th>
              </tr>
            </thead>

            <tbody>
              {registrations.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="p-8 text-center text-gray-500"
                  >
                    No registrations yet.
                  </td>
                </tr>
              ) : (
                registrations.map((registration) => (
                  <tr
                    key={registration.id}
                    className="border-b"
                  >
                    <td className="p-4">
                      {registration.profiles?.full_name || "N/A"}
                    </td>

                    <td className="p-4">
                      {registration.events?.title}
                    </td>

                    <td className="p-4">
                      {new Date(
                        registration.events?.event_date
                      ).toLocaleString("en-IN")}
                    </td>

                    <td className="p-4">
                      {new Date(
                        registration.registered_at
                      ).toLocaleString("en-IN")}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}