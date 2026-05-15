import { CalendarDays, Mail, Phone, Trash2, UsersRound } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import type { RSVP } from "../../lib/rsvp";

export default function RSVPCardList({
  rsvps,
  onDelete,
  isMutating,
}: {
  rsvps: RSVP[];
  onDelete: (id: string) => void;
  isMutating: boolean;
}) {
  if (!rsvps.length) {
    return (
      <div className="rounded-3xl bg-white/65 px-5 py-10 text-center text-cocoa/55 lg:hidden">
        No RSVP responses match this view yet.
      </div>
    );
  }

  return (
    <div className="space-y-4 lg:hidden">
      {rsvps.map((rsvp) => (
        <Card key={rsvp.id} className="bg-white/65">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-lg font-semibold">{rsvp.name}</p>
              <Badge className={rsvp.attendance === "attending" ? "mt-2 bg-sage/70" : "mt-2 bg-blush/65"}>
                {rsvp.attendance === "attending" ? "Attending" : "Not Attending"}
              </Badge>
            </div>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => onDelete(rsvp.id)}
              disabled={isMutating}
              aria-label={`Delete RSVP for ${rsvp.name}`}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
          <div className="mt-5 grid gap-3 text-sm text-cocoa/75">
            <p className="flex items-center gap-2">
              <Phone className="h-4 w-4" /> {rsvp.phone}
            </p>
            <p className="flex items-center gap-2">
              <Mail className="h-4 w-4" /> {rsvp.email}
            </p>
            <p className="flex items-center gap-2">
              <UsersRound className="h-4 w-4" /> {rsvp.guestCount} guests
            </p>
            <p className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4" /> {new Date(rsvp.createdAt).toLocaleString()}
            </p>
          </div>
        </Card>
      ))}
    </div>
  );
}
