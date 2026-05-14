import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Download, Search } from "lucide-react";
import Navbar from "./Navbar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Table, Td, Th } from "./ui/table";
import { exportRsvpsCsv, getRsvps, type AttendanceStatus, type RSVP } from "../lib/rsvp";

type Filter = "all" | AttendanceStatus;

export default function AdminDashboard() {
  const [rsvps, setRsvps] = useState<RSVP[]>([]);
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");

  useEffect(() => {
    const load = () => setRsvps(getRsvps());
    load();
    window.addEventListener("storage", load);
    window.addEventListener("rsvps-updated", load);
    return () => {
      window.removeEventListener("storage", load);
      window.removeEventListener("rsvps-updated", load);
    };
  }, []);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return rsvps.filter((rsvp) => {
      const matchesFilter = filter === "all" || rsvp.attendance === filter;
      const matchesQuery =
        !normalized ||
        [rsvp.name, rsvp.phone, rsvp.email].some((value) => value.toLowerCase().includes(normalized));
      return matchesFilter && matchesQuery;
    });
  }, [filter, query, rsvps]);

  const attending = rsvps.filter((rsvp) => rsvp.attendance === "attending");
  const notAttending = rsvps.filter((rsvp) => rsvp.attendance === "not_attending");
  const totalGuests = attending.reduce((sum, rsvp) => sum + rsvp.guestCount, 0);

  return (
    <main className="min-h-screen bg-cream text-cocoa">
      <Navbar />
      <section className="mx-auto w-full max-w-6xl px-5 pb-16 pt-32">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="section-kicker">Family view</p>
            <h1 className="text-5xl sm:text-6xl">RSVP Dashboard</h1>
          </div>
          <Link to="/" className="text-sm font-medium text-cocoa/70 hover:text-cocoa">
            Back to invitation
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <SummaryCard title="Total Responses" value={rsvps.length} />
          <SummaryCard title="Attending" value={attending.length} />
          <SummaryCard title="Not Attending" value={notAttending.length} />
          <SummaryCard title="Total Guests" value={totalGuests} />
        </div>
        <Card className="mt-8 bg-white/60">
          <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full lg:max-w-sm">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-cocoa/50" />
              <Input
                className="pl-11"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search by name, phone, or email"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {(["all", "attending", "not_attending"] as Filter[]).map((item) => (
                <Button
                  key={item}
                  variant={filter === item ? "default" : "secondary"}
                  size="sm"
                  onClick={() => setFilter(item)}
                >
                  {item === "all" ? "All" : item === "attending" ? "Attending" : "Not Attending"}
                </Button>
              ))}
              <Button size="sm" onClick={() => exportRsvpsCsv(filtered)}>
                <Download className="h-4 w-4" /> Export CSV
              </Button>
            </div>
          </div>
          <Table>
            <thead>
              <tr>
                <Th>Name</Th>
                <Th>Phone Number</Th>
                <Th>Email</Th>
                <Th>Guest Count</Th>
                <Th>Attendance</Th>
                <Th>Date Submitted</Th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((rsvp) => (
                <tr key={rsvp.id}>
                  <Td className="font-medium">{rsvp.name}</Td>
                  <Td>{rsvp.phone}</Td>
                  <Td>{rsvp.email}</Td>
                  <Td>{rsvp.guestCount}</Td>
                  <Td>
                    <Badge className={rsvp.attendance === "attending" ? "bg-sage/70" : "bg-blush/65"}>
                      {rsvp.attendance === "attending" ? "Attending" : "Not Attending"}
                    </Badge>
                  </Td>
                  <Td>{new Date(rsvp.createdAt).toLocaleString()}</Td>
                </tr>
              ))}
              {!filtered.length && (
                <tr>
                  <Td colSpan={6} className="py-10 text-center text-cocoa/55">
                    No RSVP responses match this view yet.
                  </Td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card>
      </section>
    </main>
  );
}

function SummaryCard({ title, value }: { title: string; value: number }) {
  return (
    <Card className="liquid-glass">
      <p className="text-sm font-medium uppercase tracking-[0.16em] text-cocoa/55">{title}</p>
      <p className="mt-4 font-display text-5xl">{value}</p>
    </Card>
  );
}
