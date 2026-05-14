import { MapPin, Shirt, Send } from "lucide-react";
import { mapsUrl } from "../lib/rsvp";

export default function StickyMobileCTA() {
  return (
    <div className="fixed bottom-4 left-4 right-4 z-30 rounded-full bg-cream/88 px-3 py-3 shadow-soft backdrop-blur md:hidden">
      <div className="grid grid-cols-3 gap-2">
        <button className="mobile-cta" onClick={() => window.open(mapsUrl, "_blank", "noopener,noreferrer")}>
          <MapPin className="h-4 w-4" /> Directions
        </button>
        <button className="mobile-cta" onClick={() => document.getElementById("dress-code")?.scrollIntoView({ behavior: "smooth" })}>
          <Shirt className="h-4 w-4" /> Dress Code
        </button>
        <button className="mobile-cta bg-cocoa text-cream" onClick={() => document.getElementById("rsvp")?.scrollIntoView({ behavior: "smooth" })}>
          <Send className="h-4 w-4" /> RSVP
        </button>
      </div>
    </div>
  );
}
