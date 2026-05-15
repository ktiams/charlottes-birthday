import { FormEvent, useState } from "react";
import { LockKeyhole } from "lucide-react";
import AdminDashboard from "./AdminDashboard";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";

const ADMIN_AUTH_KEY = "charlotte_admin_authenticated";

export default function AdminRoute() {
  // This is temporary lightweight protection. Replace with Supabase Auth before
  // sharing widely if stronger security is needed.
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => sessionStorage.getItem(ADMIN_AUTH_KEY) === "true",
  );

  const handleLogout = () => {
    sessionStorage.removeItem(ADMIN_AUTH_KEY);
    setIsAuthenticated(false);
  };

  if (isAuthenticated) {
    return <AdminDashboard onLogout={handleLogout} />;
  }

  return <AdminLogin onAuthenticated={() => setIsAuthenticated(true)} />;
}

function AdminLogin({ onAuthenticated }: { onAuthenticated: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = (event: FormEvent) => {
    event.preventDefault();
    setError("");

    // This is temporary lightweight protection. Replace with Supabase Auth before
    // sharing widely if stronger security is needed.
    const configuredPassword = import.meta.env.VITE_ADMIN_PASSWORD;

    if (configuredPassword && password === configuredPassword) {
      sessionStorage.setItem(ADMIN_AUTH_KEY, "true");
      onAuthenticated();
      return;
    }

    setError("Incorrect password. Please try again.");
  };

  return (
    <main className="min-h-screen bg-cream px-5 py-10 text-cocoa">
      <section className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-xl items-center justify-center">
        <Card className="liquid-glass w-full border border-blush/35 bg-white/45 p-6 sm:p-8">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-blush/45 shadow-soft">
            <LockKeyhole className="h-7 w-7" />
          </div>
          <div className="text-center">
            <p className="section-kicker">Admin access</p>
            <h1 className="font-display text-5xl leading-none sm:text-6xl">Private RSVP Dashboard</h1>
            <p className="mx-auto mt-4 max-w-md leading-7 text-cocoa/70">
              Enter the private password to review Charlotte Ysabella's RSVP responses.
            </p>
          </div>

          <form onSubmit={submit} className="mt-8 space-y-5" noValidate>
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-cocoa">Password</span>
              <Input
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                  setError("");
                }}
                type="password"
                autoComplete="current-password"
                autoFocus
              />
            </label>
            {error && (
              <div className="rounded-2xl bg-blush/45 px-4 py-3 text-sm font-medium text-[#9f3f4d]">
                {error}
              </div>
            )}
            <Button type="submit" size="lg" className="w-full">
              Enter Dashboard
            </Button>
          </form>
        </Card>
      </section>
    </main>
  );
}
