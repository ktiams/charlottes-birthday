import { useLocation, useNavigate } from "react-router-dom";
import { PartyPopper } from "lucide-react";
import { Button } from "./ui/button";

const links = [
  ["Home", "home"],
  ["Details", "details"],
  ["Dress Code", "dress-code"],
  ["Location", "location"],
];

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const goTo = (id: string) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 80);
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="pointer-events-none fixed left-0 right-0 top-0 z-30 px-4 py-4">
      <nav className="mx-auto flex max-w-[92rem] items-start justify-between gap-3">
        <button
          onClick={() => goTo("home")}
          className="liquid-glass pointer-events-auto flex min-h-12 items-center gap-2 rounded-full px-4 text-sm font-medium text-cocoa sm:text-base"
        >
          <PartyPopper className="h-5 w-5" />
          <span className="hidden sm:inline">Charlotte's Farm-Tastic 1st</span>
          <span className="sm:hidden">Charlotte's 1st</span>
        </button>
        <div className="pointer-events-auto flex items-center gap-2">
          <div className="liquid-glass hidden min-h-12 items-center gap-1 rounded-full px-2 lg:flex">
            {links.map(([label, id]) => (
              <button
                key={id}
                onClick={() => goTo(id)}
                className="rounded-full px-4 py-2 text-sm font-medium text-cocoa/75 hover:bg-white/45"
              >
                {label}
              </button>
            ))}
          </div>
          <div className="liquid-glass rounded-full p-2">
            <Button onClick={() => goTo("rsvp")} size="sm">
              RSVP
            </Button>
          </div>
        </div>
      </nav>
    </header>
  );
}
