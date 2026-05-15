import { Card } from "../ui/card";
import type { RSVP } from "../../lib/rsvp";

export default function DashboardStats({ rsvps }: { rsvps: RSVP[] }) {
  const attending = rsvps.filter((rsvp) => rsvp.attendance === "attending");
  const notAttending = rsvps.filter((rsvp) => rsvp.attendance === "not_attending");
  const totalGuests = attending.reduce((sum, rsvp) => sum + rsvp.guestCount, 0);

  const stats = [
    { title: "Total Responses", value: rsvps.length },
    { title: "Attending", value: attending.length },
    { title: "Not Attending", value: notAttending.length },
    { title: "Total Guests", value: totalGuests },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="liquid-glass">
          <p className="text-sm font-medium uppercase tracking-[0.16em] text-cocoa/55">{stat.title}</p>
          <p className="mt-4 font-display text-5xl">{stat.value}</p>
        </Card>
      ))}
    </div>
  );
}
