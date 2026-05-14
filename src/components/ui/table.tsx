import * as React from "react";
import { cn } from "../../lib/utils";

export const Table = ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
  <div className="w-full overflow-auto rounded-3xl border border-white/60 bg-white/65">
    <table className={cn("w-full min-w-[780px] text-left text-sm", className)} {...props} />
  </div>
);
export const Th = ({ className, ...props }: React.ThHTMLAttributes<HTMLTableCellElement>) => (
  <th className={cn("bg-cream px-4 py-3 font-medium text-cocoa", className)} {...props} />
);
export const Td = ({ className, ...props }: React.TdHTMLAttributes<HTMLTableCellElement>) => (
  <td className={cn("border-t border-hay/30 px-4 py-3 text-cocoa/80", className)} {...props} />
);
