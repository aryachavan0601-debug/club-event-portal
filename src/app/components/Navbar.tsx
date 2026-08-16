"use client";

import { useEffect, useState } from "react";
import { createClient } from "../../lib/supabase/client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const supabase = createClient();
  const router = useRouter();

  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    async function getUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);
    }

    getUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <nav className="border-b bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between p-4">
        <Link href="/" className="text-xl font-bold">
          Club Event Portal
        </Link>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <Link
  href="/my-registrations"
  className="rounded-lg border px-4 py-2 text-sm"
>
  My Registrations
</Link>
              <Link
                    href="/admin"
                    className="rounded-lg border px-4 py-2 text-sm"
              >
                Admin
              </Link> 
              <span className="hidden text-sm text-gray-600 sm:block">
                {user.email}
              </span>

              <button
                onClick={handleLogout}
                className="rounded-lg bg-black px-4 py-2 text-sm text-white hover:bg-gray-800"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-lg border px-4 py-2 text-sm"
              >
                Login
              </Link>

              <Link
                href="/signup"
                className="rounded-lg bg-black px-4 py-2 text-sm text-white"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}