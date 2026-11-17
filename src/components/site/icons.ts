import {
  BarChart3,
  Blocks,
  BrainCircuit,
  Compass,
  Database,
  Gem,
  Handshake,
  HeartHandshake,
  ScanSearch,
  ShieldCheck,
  Sparkles,
  Telescope,
  TrendingUp,
  Users,
  UsersRound,
  type LucideIcon,
} from "lucide-react";
import type { ValueId } from "../../content/about";
import type { PrincipleId } from "../../content/how-we-work";
import type { PillarId, ServiceId } from "../../content/services";

// Monoline icons (brand guideline: clean outline style, consistent stroke).
export const serviceIcons: Record<ServiceId, LucideIcon> = {
  "digital-strategy": Compass,
  "data-foundations": Database,
  "business-intelligence": BarChart3,
  "applied-ai": Sparkles,
  "commercial-transformation": Handshake,
  "technology-advisory": Blocks,
  "data-monetization": Gem,
  "transformation-governance": ShieldCheck,
};

export const pillarIcons: Record<PillarId, LucideIcon> = {
  strategy: Compass,
  data: BarChart3,
  ai: BrainCircuit,
  commercial: Handshake,
  people: UsersRound,
};

export const valueIcons: Record<ValueId, LucideIcon> = {
  "human-centricity": Users,
  foresight: Telescope,
  intelligence: BrainCircuit,
  partnership: Handshake,
  responsibility: ShieldCheck,
  "business-value": TrendingUp,
};

export const principleIcons: Record<PrincipleId, LucideIcon> = {
  "business-first": ScanSearch,
  "tech-agnostic": Compass,
  "people-centered": HeartHandshake,
};
