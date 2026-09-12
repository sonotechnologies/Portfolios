import { cn } from "@/lib/utils";

/** A label ... dotted leader ... value row, as used on the services and case-study spec sheets. */
export function SpecRow({
  label,
  value,
  className,
}: {
  label: string;
  value: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mono-label flex items-baseline gap-2 text-11 text-annotation", className)}>
      <span>{label}</span>
      <span className="flex-1 border-b border-dotted border-edge" />
      <span className="text-paper">{value ?? "[—]"}</span>
    </div>
  );
}
