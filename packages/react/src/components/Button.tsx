import { cn } from "@website/shared/utils";

export function Button({
  className,
  children,
  ...rest
}: React.ComponentPropsWithoutRef<"button">) {
  return (
    <button
      className={cn("flex items-center justify-center", className)}
      {...rest}
    >
      {children}
    </button>
  );
}
