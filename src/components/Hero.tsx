import { ArrowDown } from "lucide-react";

const desktopVideoUrl = "/HERO-VIDEO2.mp4";
const mobileVideoUrl = "/hero-mobile2.mp4";

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen w-full overflow-hidden bg-[#fff4e3]">
      <video
        className="absolute inset-0 z-0 h-full w-full object-cover object-center"
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
      >
        <source src={mobileVideoUrl} media="(max-width: 767px)" type="video/mp4" />
        <source src={desktopVideoUrl} type="video/mp4" />
      </video>
      <div className="pointer-events-none absolute inset-0 z-20 bg-[#fff4e3]/6" />

      <button
        onClick={() => scrollToId("details")}
        className="absolute bottom-6 left-1/2 z-30 -translate-x-1/2 rounded-full bg-white/65 p-3 text-cocoa shadow-soft backdrop-blur"
        aria-label="Scroll to details"
      >
        <ArrowDown className="h-5 w-5" />
      </button>
    </section>
  );
}
