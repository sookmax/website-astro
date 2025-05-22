import { cn } from "@website/shared/utils";
import type React from "react";

type SpinnerProps = {
  color?: string;
} & React.ComponentPropsWithoutRef<"div">;

// https://github.com/shadcn-ui/ui/pull/3554
export function Spinner({ color, className, ...rest }: SpinnerProps) {
  const computeDelay = (i: number) => `${-1.2 + i * 0.1}s`;
  const computeRotation = (i: number) => `${i * 30}deg`;
  return (
    <div
      className={cn("size-5", className)}
      role="status"
      aria-label="Loading"
      {...rest}
    >
      <div className="relative left-1/2 top-1/2 size-full">
        {[...Array<number>(12)].map((_, i) => (
          <div
            key={i}
            className="absolute left-[-10%] top-[-3.9%] h-[8%] w-[24%] animate-spinner rounded-full"
            style={{
              animationDelay: computeDelay(i),
              transform: `rotate(${computeRotation(i)}) translate(146%)`,
              backgroundColor: color ?? "var(--color-foreground)",
            }}
          />
        ))}
      </div>
    </div>
  );
}
