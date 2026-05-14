import { Baby, CalendarDays, Clock, MapPin, Sun } from "lucide-react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import RSVPForm from "./components/RSVPForm";
import FAQSection from "./components/FAQSection";
import Footer from "./components/Footer";
import StickyMobileCTA from "./components/StickyMobileCTA";
import { Button } from "./components/ui/button";
import { Card } from "./components/ui/card";
import { eventAddress, mapsUrl } from "./lib/rsvp";

const sectionClass = "mx-auto w-full max-w-6xl px-5 py-16 sm:py-20";

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

function App() {
  return (
    <main className="min-h-screen overflow-hidden bg-cream text-cocoa">
      <Navbar />
      <Hero />
      <DetailsSection />
      <StoryIntro />
      <DressCodeSection />
      <LocationSection />
      <TimelineSection />
      <RSVPForm />
      <FAQSection />
      <Footer />
      <StickyMobileCTA />
    </main>
  );
}

function DetailsSection() {
  const details = [
    { icon: CalendarDays, title: "Date", value: "Saturday, August 29, 2026", tint: "bg-blush/55" },
    { icon: Clock, title: "Time", value: "12:00 PM - 6:00 PM", tint: "bg-butter/70" },
    { icon: MapPin, title: "Location", value: "Philippe Park, Shelter 7", tint: "bg-sky/65" },
    { icon: Baby, title: "Dress Code", value: "Farm Attire", tint: "bg-sage/65" },
  ];

  const addToCalendar = () => {
    const text = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "BEGIN:VEVENT",
      "SUMMARY:Charlotte Ysabella's Farm-Tastic 1st Birthday",
      "DTSTART:20260829T160000Z",
      "DTEND:20260829T220000Z",
      `LOCATION:${eventAddress}, Shelter 7`,
      "DESCRIPTION:Farm attire welcome for Charlotte Ysabella's 1st Birthday Celebration.",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\n");
    const blob = new Blob([text], { type: "text/calendar" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "charlotte-farm-tastic-birthday.ics";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section id="details" className={sectionClass}>
      <div className="mb-9 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="section-kicker">The sweet details</p>
          <h2>Everything for the big little day</h2>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button onClick={addToCalendar} variant="secondary">
            <CalendarDays className="h-4 w-4" /> Add to Calendar
          </Button>
          <Button onClick={() => window.open(mapsUrl, "_blank", "noopener,noreferrer")}>
            <MapPin className="h-4 w-4" /> Open in Maps
          </Button>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {details.map(({ icon: Icon, title, value, tint }) => (
          <Card key={title} className="liquid-glass group min-h-44 transition hover:-translate-y-1">
            <div className={`mb-5 flex h-12 w-12 items-center justify-center rounded-2xl ${tint}`}>
              <Icon className="h-6 w-6" />
            </div>
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-cocoa/55">{title}</p>
            <p className="mt-2 text-xl font-medium leading-snug">{value}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}

function StoryIntro() {
  return (
    <section className="storybook-band">
      <div className={sectionClass}>
        <div className="mx-auto max-w-4xl text-center">
          <p className="section-kicker">A storybook invitation</p>
          <h2>Farm-Tastic fun for Charlotte Ysabella</h2>
          <p className="mt-6 text-lg leading-8 text-cocoa/75">
            Put on your cutest farm attire and join us for a sweet day of love, laughter, and
            farm-tastic fun as we celebrate Charlotte Ysabella's very first birthday.
          </p>
        </div>
      </div>
    </section>
  );
}

function DressCodeSection() {
  return (
    <section id="dress-code" className="mx-auto w-full max-w-7xl px-5 py-16 sm:py-20">
      <div className="grid gap-10 lg:grid-cols-[0.65fr_1.35fr] lg:items-start">
        <div>
          <p className="section-kicker">Sweet and comfy</p>
          <h2 className="max-w-[9ch]">Dress Code: Farm Attire</h2>
          <p className="mt-5 leading-8 text-cocoa/75">
            Think sweet, comfy, colorful, and summer-friendly farm style. Florals, gingham, linen,
            denim, boots, bows, straw hats, soft pastels, earthy tones, and breathable outfits are
            all welcome.
          </p>
        </div>
        <div id="outfit-inspiration" className="min-w-0 scroll-mt-28">
          <Card className="overflow-hidden border border-blush/35 bg-white/55 p-1.5 sm:p-2">
            <picture>
              <source srcSet="/dresscode-mobile.png" media="(max-width: 767px)" />
              <img
                src="/DRESS-CODE.png"
                alt="Farm attire inspiration examples for Charlotte Ysabella's birthday guests"
                className="h-auto w-full rounded-2xl object-cover"
              />
            </picture>
          </Card>
          <p className="mt-4 rounded-3xl bg-blush/20 px-5 py-4 text-sm leading-6 text-cocoa/75">
            These are just a few inspiration examples in case you have doubts. Guests do not need
            to wear these exact outfits; they are only a friendly guide for the farm attire theme.
          </p>
        </div>
      </div>
    </section>
  );
}

function LocationSection() {
  const copyAddress = async () => {
    await navigator.clipboard.writeText(`${eventAddress}, Shelter 7`);
  };

  return (
    <section id="location" className="bg-sky/35">
      <div className={sectionClass}>
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <p className="section-kicker">Come celebrate</p>
            <h2>Location</h2>
            <address className="mt-5 not-italic text-lg leading-8 text-cocoa/80">
              2525 Philippe Pkwy,
              <br />
              Safety Harbor, FL 34695
              <br />
              Shelter 7
            </address>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button onClick={() => window.open(mapsUrl, "_blank", "noopener,noreferrer")}>
                <MapPin className="h-4 w-4" /> Open in Google Maps
              </Button>
              <Button onClick={copyAddress} variant="secondary">
                Copy Address
              </Button>
            </div>
            <div className="mt-8 space-y-3 text-cocoa/75">
              <div className="relative inline-flex max-w-md items-center gap-3 rounded-2xl border border-butter/80 bg-butter/45 px-4 py-3 pr-5 text-cocoa shadow-soft">
                <span
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/75 text-2xl shadow-[0_8px_24px_rgba(120,80,50,0.12)]"
                  aria-hidden="true"
                >
                  🐮
                </span>
                <span className="text-2xl leading-none text-cocoa/55" aria-hidden="true">
                  →
                </span>
                <p className="text-base font-semibold leading-snug sm:text-lg">Please look for Shelter 7.</p>
              </div>
              <p>Outdoor celebration - dress comfortably for warm Florida weather.</p>
            </div>
          </div>
          <div className="liquid-glass min-h-[340px] overflow-hidden rounded-3xl">
            <iframe
              title="Map to Philippe Park Shelter 7"
              className="h-[340px] w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps?q=2525%20Philippe%20Pkwy%2C%20Safety%20Harbor%2C%20FL%2034695&output=embed"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineSection() {
  return (
    <section className="relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: "url('/farmhouse.png')" }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-cream/78" aria-hidden="true" />
      <div className={`${sectionClass} relative z-10`}>
        <div className="text-center">
          <p className="section-kicker">Celebration window</p>
          <h2>Party Time</h2>
        </div>
        <Card className="liquid-glass mx-auto mt-10 max-w-3xl p-8 text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-butter/70">
            <Sun className="h-8 w-8" />
          </div>
          <p className="font-display text-5xl sm:text-6xl">12:00 PM - 6:00 PM</p>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-cocoa/75 sm:text-lg">
            Join us anytime during the celebration for a sweet afternoon of family, photos, food,
            cake, and farm-tastic birthday fun for Charlotte Ysabella.
          </p>
        </Card>
      </div>
    </section>
  );
}

export default App;
