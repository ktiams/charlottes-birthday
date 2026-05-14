import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { cn } from "../../lib/utils";

interface AccordionItem {
  question: string;
  answer: string;
}

export function Accordion({ items }: { items: AccordionItem[] }) {
  const [open, setOpen] = useState(0);

  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div key={item.question} className="overflow-hidden rounded-2xl bg-white/65 shadow-sm">
          <button
            className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-medium text-cocoa"
            onClick={() => setOpen(open === index ? -1 : index)}
            aria-expanded={open === index}
          >
            {item.question}
            <ChevronDown className={cn("h-5 w-5 transition", open === index && "rotate-180")} />
          </button>
          {open === index && <div className="px-5 pb-5 text-sm leading-7 text-cocoa/75">{item.answer}</div>}
        </div>
      ))}
    </div>
  );
}
