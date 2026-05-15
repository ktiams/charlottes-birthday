import { Download } from "lucide-react";
import { exportRsvpsCsv, type RSVP } from "../../lib/rsvp";
import { Button } from "../ui/button";

export default function ExportCSVButton({ rsvps }: { rsvps: RSVP[] }) {
  return (
    <Button size="sm" onClick={() => exportRsvpsCsv(rsvps)}>
      <Download className="h-4 w-4" /> Export CSV
    </Button>
  );
}
