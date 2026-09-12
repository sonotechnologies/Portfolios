import { cn } from "@/lib/utils";

export function MonoLabel({
  children,
  className,
  as: Tag = "span",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "span" | "div";
}) {
  return (
    <Tag className={cn("mono-label text-12 text-annotation", className)}>
      {children}
    </Tag>
  );
}
