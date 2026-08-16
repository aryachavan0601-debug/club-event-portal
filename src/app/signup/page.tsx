"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "../../lib/supabase/client";

export default function SignupPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    setError("");

    const supabase = createClient();

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push("/login");
  }

  return (
    <main className="auth-container">

      <div className="auth-card">

        <div className="hero-badge">
          DJSCE CLUB EVENTS
        </div>

        <h1>
          Create your account
        </h1>

        <p>
          Join the community and register for events.
        </p>

        <form onSubmit={handleSignup}>

          <div className="form-group">
            <label>Email</label>

            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>

            <input
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              minLength={6}
              required
            />
          </div>

          {error && (
            <p
              style={{
                color: "#dc2626",
                fontSize: "14px",
                marginBottom: "15px",
              }}
            >
              {error}
            </p>
          )}

          <button
            className="auth-submit"
            type="submit"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Account"}
          </button>

        </form>

        <div className="auth-footer">
          Already have an account?{" "}
          <Link href="/login">
            Login
          </Link>
        </div>

      </div>

    </main>
  );
}