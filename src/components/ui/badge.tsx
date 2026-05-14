import * as React from "react";
import { cn } from "../../lib/utils";

export function Badge({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn("inline-flex rounded-full bg-butter/80 px-3 py-1 text-xs font-medium text-cocoa", className)}
      {...props}
    />
  );
}
