// lib/icons.ts
import {
  Sparkles,
  Palette,
  Heart,
  Gem,
  Leaf,
  Shield,
  type LucideIcon,
} from "lucide-react";

export const iconMap = {
  Sparkles,
  Palette,
  Heart,
  Gem,
  Leaf,
  Shield,
} as const;

export type IconName = keyof typeof iconMap;
// "Sparkles" | "Palette" | "Heart" | "Gem" | "Leaf" | "Shield"

export type IconComponent = LucideIcon;
