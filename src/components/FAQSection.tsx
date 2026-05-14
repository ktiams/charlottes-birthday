import { Accordion } from "./ui/accordion";

const faqs = [
  {
    question: "What should we wear?",
    answer:
      "Farm attire is perfect: florals, gingham, denim, linen, bows, boots, straw hats, soft pastels, earthy tones, and breathable outfits for Florida summer weather.",
  },
  {
    question: "Where exactly is the party?",
    answer: "The celebration is at Philippe Park, 2525 Philippe Pkwy, Safety Harbor, FL 34695. Please look for Shelter 7.",
  },
  {
    question: "Is the event outdoors?",
    answer: "Yes, this is an outdoor celebration. Dress comfortably for warm August weather and choose shoes that are easy for walking and playing.",
  },
  {
    question: "Do I need to RSVP?",
    answer: "Yes, please RSVP so the family can plan food, seating, cake, and activities for everyone.",
  },
  {
    question: "What time should we arrive?",
    answer:
      "The celebration runs from 12:00 PM to 6:00 PM. Arrive when it works best for your family during the party window.",
  },
];

export default function FAQSection() {
  return (
    <section className="mx-auto w-full max-w-4xl px-5 py-16 sm:py-20">
      <div className="mb-9 text-center">
        <p className="section-kicker">Little questions</p>
        <h2>FAQ</h2>
      </div>
      <Accordion items={faqs} />
    </section>
  );
}
