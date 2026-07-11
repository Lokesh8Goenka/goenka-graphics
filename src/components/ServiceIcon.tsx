import { Heart, Layers, Printer, IdCard, type LucideIcon } from "lucide-react";

const map: Record<string, LucideIcon> = {
  heart: Heart,
  stack: Layers,
  printer: Printer,
  id: IdCard,
};

export function ServiceIcon({
  name,
  className,
  size = 24,
}: {
  name: string;
  className?: string;
  size?: number;
}) {
  const Icon = map[name] ?? Printer;
  return <Icon size={size} className={className} />;
}
