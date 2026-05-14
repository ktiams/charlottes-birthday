export type AttendanceStatus = "attending" | "not_attending";

export interface RSVP {
  id: string;
  name: string;
  phone: string;
  email: string;
  guestCount: number;
  attendance: AttendanceStatus;
  createdAt: string;
}

const RSVP_KEY = "charlotte_farm_tastic_rsvps";

export function getRsvps(): RSVP[] {
  const stored = localStorage.getItem(RSVP_KEY);
  if (!stored) return [];

  try {
    return JSON.parse(stored) as RSVP[];
  } catch {
    return [];
  }
}

export function saveRsvp(rsvp: RSVP) {
  const current = getRsvps();
  localStorage.setItem(RSVP_KEY, JSON.stringify([rsvp, ...current]));
  window.dispatchEvent(new Event("rsvps-updated"));
}

export function exportRsvpsCsv(rsvps: RSVP[]) {
  const headers = ["Name", "Phone Number", "Email", "Guest Count", "Attendance", "Date Submitted"];
  const rows = rsvps.map((rsvp) => [
    rsvp.name,
    rsvp.phone,
    rsvp.email,
    String(rsvp.guestCount),
    rsvp.attendance === "attending" ? "Attending" : "Not Attending",
    new Date(rsvp.createdAt).toLocaleString(),
  ]);

  const csv = [headers, ...rows]
    .map((row) => row.map((value) => `"${value.replace(/"/g, '""')}"`).join(","))
    .join("\n");

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "charlotte-rsvps.csv";
  link.click();
  URL.revokeObjectURL(url);
}

export const mapsUrl =
  "https://www.google.com/maps/search/?api=1&query=2525+Philippe+Pkwy,+Safety+Harbor,+FL+34695";

export const eventAddress = "2525 Philippe Pkwy, Safety Harbor, FL 34695";
