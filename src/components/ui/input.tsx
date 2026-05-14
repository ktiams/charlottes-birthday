import * as React from "react";
import { cn } from "../../lib/utils";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "h-12 w-full rounded-2xl border border-blush/45 bg-blush/15 px-4 text-cocoa shadow-sm outline-none transition placeholder:text-[#b97886] focus:border-blush focus:bg-white/80 focus:ring-4 focus:ring-blush/25",
        className,
      )}
      {...props}
    />
  ),
);
Input.displayName = "Input";
