import { cn } from "@/lib/utils";

export function Tag({
  children,
  active,
  className,
}: {
  children: React.ReactNode;
  active?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "mono-label inline-block border px-3 py-1.5 text-11",
        active ? "border-hazard text-hazard" : "border-edge text-annotation",
        className,
      )}
    >
      {children}
    </span>
  );
}
