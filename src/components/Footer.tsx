import { Button } from "./ui/button";

export default function Footer() {
  return (
    <footer className="bg-cocoa px-5 pb-28 pt-14 text-center text-cream sm:pb-14">
      <p className="font-display text-4xl">Charlotte Ysabella's Farm-Tastic 1st Birthday</p>
      <p className="mt-3 text-cream/75">August 29, 2026</p>
      <Button
        className="mt-7 bg-cream text-cocoa hover:bg-white"
        onClick={() => document.getElementById("rsvp")?.scrollIntoView({ behavior: "smooth" })}
      >
        RSVP Before the Party
      </Button>
    </footer>
  );
}
