import { Trash2 } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Table, Td, Th } from "../ui/table";
import type { RSVP } from "../../lib/rsvp";

function attendanceLabel(rsvp: RSVP) {
  return rsvp.attendance === "attending" ? "Attending" : "Not Attending";
}

export default function RSVPTable({
  rsvps,
  onDelete,
  isMutating,
}: {
  rsvps: RSVP[];
  onDelete: (id: string) => void;
  isMutating: boolean;
}) {
  return (
    <div className="hidden lg:block">
      <Table>
        <thead>
          <tr>
            <Th>Name</Th>
            <Th>Phone Number</Th>
            <Th>Email</Th>
            <Th>Guest Count</Th>
            <Th>Attendance</Th>
            <Th>Date Submitted</Th>
            <Th>Actions</Th>
          </tr>
        </thead>
        <tbody>
          {rsvps.map((rsvp) => (
            <tr key={rsvp.id}>
              <Td className="font-medium">{rsvp.name}</Td>
              <Td>{rsvp.phone}</Td>
              <Td>{rsvp.email}</Td>
              <Td>{rsvp.guestCount}</Td>
              <Td>
                <Badge className={rsvp.attendance === "attending" ? "bg-sage/70" : "bg-blush/65"}>
                  {attendanceLabel(rsvp)}
                </Badge>
              </Td>
              <Td>{new Date(rsvp.createdAt).toLocaleString()}</Td>
              <Td>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => onDelete(rsvp.id)}
                  disabled={isMutating}
                  aria-label={`Delete RSVP for ${rsvp.name}`}
                >
                  <Trash2 className="h-4 w-4" /> Delete
                </Button>
              </Td>
            </tr>
          ))}
          {!rsvps.length && (
            <tr>
              <Td colSpan={7} className="py-10 text-center text-cocoa/55">
                No RSVP responses match this view yet.
              </Td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}
