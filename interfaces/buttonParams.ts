import { LucideIcon } from "lucide-react";

interface AnimatedButtonProps {
  href: string;
  icon: LucideIcon;
  text: string;
  ariaLabel: string;
  delay?: number;
  buttonVariant?: "default" | "outline" | "secondary" | "ghost" | "link";
}
