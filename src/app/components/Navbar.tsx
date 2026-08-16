"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "../../lib/supabase/client";

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  async function handleLogout() {
    const supabase = createClient();

    await supabase.auth.signOut();

    window.location.href = "/";
  }

  return (
    <nav className="navbar">
      <Link href="/" className="nav-brand">
        <span className="brand-icon">✦</span>
        DJSCE Club Events
      </Link>

      <div className="nav-links">
        <Link href="/events">Events</Link>

        {!loading && user && (
          <Link href="/my-registrations">
            My Registrations
          </Link>
        )}

        {!loading && !user && (
          <>
            <Link href="/login">Login</Link>

            <Link href="/signup" className="nav-signup">
              Sign Up
            </Link>
          </>
        )}

        {!loading && user && (
          <button
            onClick={handleLogout}
            className="nav-logout"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}