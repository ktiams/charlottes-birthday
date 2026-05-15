import { supabase } from "./supabase";

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

interface SupabaseRSVP {
  id: string;
  name: string;
  phone: string;
  email: string;
  guest_count: number | null;
  attendance: AttendanceStatus;
  created_at: string;
}

export interface NewRSVP {
  name: string;
  phone: string;
  email: string;
  guestCount: number;
  attendance: AttendanceStatus;
}

function mapRsvp(row: SupabaseRSVP): RSVP {
  return {
    id: row.id,
    name: row.name,
    phone: row.phone,
    email: row.email,
    guestCount: row.guest_count ?? 0,
    attendance: row.attendance,
    createdAt: row.created_at,
  };
}

function toSupabasePayload(rsvp: NewRSVP) {
  return {
    name: rsvp.name,
    phone: rsvp.phone,
    email: rsvp.email,
    guest_count: rsvp.guestCount,
    attendance: rsvp.attendance,
  };
}

export async function fetchRsvps(): Promise<RSVP[]> {
  const { data, error } = await supabase.from("rsvps").select("*").order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return ((data ?? []) as SupabaseRSVP[]).map(mapRsvp);
}

export async function saveRsvp(rsvp: NewRSVP) {
  const { error } = await supabase.from("rsvps").insert([toSupabasePayload(rsvp)]);
  if (error) throw new Error(error.message);
}

export async function deleteRsvp(id: string) {
  const { data, error } = await supabase.from("rsvps").delete().eq("id", id).select("id");
  if (error) throw new Error(error.message);
  if (!data?.length) {
    throw new Error("No RSVP was deleted. Check that the temporary DELETE policy exists in Supabase.");
  }
}

export async function clearRsvps() {
  const { error } = await supabase
    .from("rsvps")
    .delete()
    .neq("id", "00000000-0000-0000-0000-000000000000")
    .select("id");
  if (error) throw new Error(error.message);
}

export async function addSampleRsvps() {
  const samples: NewRSVP[] = [
    {
      name: "Maria Torres",
      phone: "(813) 555-0184",
      email: "maria@example.com",
      guestCount: 4,
      attendance: "attending",
    },
    {
      name: "Daniel Rivera",
      phone: "(727) 555-0127",
      email: "daniel@example.com",
      guestCount: 2,
      attendance: "attending",
    },
    {
      name: "Sofia Martinez",
      phone: "(813) 555-0169",
      email: "sofia@example.com",
      guestCount: 0,
      attendance: "not_attending",
    },
    {
      name: "Camila Johnson",
      phone: "(727) 555-0142",
      email: "camila@example.com",
      guestCount: 3,
      attendance: "attending",
    },
  ];

  const { error } = await supabase.from("rsvps").insert(samples.map(toSupabasePayload));
  if (error) throw new Error(error.message);
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
