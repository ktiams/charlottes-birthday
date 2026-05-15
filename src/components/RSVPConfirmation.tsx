import { CalendarDays, CheckCircle2, Home, MapPin } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { mapsUrl } from "../lib/rsvp";

interface ConfirmationState {
  name?: string;
  attendance?: "attending" | "not_attending";
}

export default function RSVPConfirmation() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = (location.state ?? {}) as ConfirmationState;
  const firstName = state.name?.split(" ")[0];
  const isAttending = state.attendance === "attending";
  const confirmationImage = isAttending ? "/will-attend.png" : "/will-not.png";
  const imageAlt = isAttending
    ? "Farm birthday celebration confirmation for guests attending"
    : "Sweet farm birthday RSVP confirmation for guests who cannot attend";

  return (
    <main className="min-h-screen bg-cream text-cocoa">
      <Navbar />
      <section className="relative flex min-h-screen items-center overflow-hidden px-5 py-24">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15"
          style={{ backgroundImage: "url('/farmhouse.png')" }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-cream/82" aria-hidden="true" />

        <Card className="liquid-glass relative z-10 mx-auto grid max-w-5xl gap-8 p-5 text-center sm:p-7 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:text-left">
          <div className="overflow-hidden rounded-3xl bg-white/50 p-2 shadow-soft">
            <img src={confirmationImage} alt={imageAlt} className="h-auto w-full rounded-2xl object-cover" />
          </div>

          <div>
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-sage/65 lg:mx-0">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <p className="section-kicker">RSVP received</p>
            <h1 className="font-display text-5xl leading-none sm:text-7xl">
              {firstName ? `Thank you, ${firstName}!` : "Thank you!"}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-cocoa/75 lg:mx-0">
              {isAttending
                ? "Yay! Thank you - your RSVP has been received. We cannot wait to celebrate Charlotte Ysabella's farm-tastic first birthday with you."
                : "Thank you - your RSVP has been received. We appreciate you letting the family know."}
            </p>

            {isAttending && (
              <div className="mx-auto mt-8 grid max-w-xl gap-3 rounded-3xl bg-white/55 p-5 text-left shadow-soft sm:grid-cols-2 lg:mx-0">
                <div className="flex gap-3">
                  <CalendarDays className="mt-1 h-5 w-5 shrink-0" />
                  <p className="leading-7">
                    August 29, 2026
                    <br />
                    12:00 PM - 6:00 PM
                  </p>
                </div>
                <div className="flex gap-3">
                  <MapPin className="mt-1 h-5 w-5 shrink-0" />
                  <p className="leading-7">
                    Philippe Park
                    <br />
                    Shelter 7
                  </p>
                </div>
              </div>
            )}

            <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
              <Button onClick={() => navigate("/")} variant="secondary">
                <Home className="h-4 w-4" /> Back to Invitation
              </Button>
              {isAttending && (
                <Button onClick={() => window.open(mapsUrl, "_blank", "noopener,noreferrer")}>
                  <MapPin className="h-4 w-4" /> Open in Maps
                </Button>
              )}
            </div>
          </div>
        </Card>
      </section>
    </main>
  );
}
