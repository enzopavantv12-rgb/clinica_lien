import {
  Activity,
  Armchair,
  ClipboardList,
  Coffee,
  Droplets,
  Gem,
  Gift,
  Headphones,
  Hourglass,
  Layers,
  Leaf,
  MapPin,
  MessageCircle,
  MonitorSmartphone,
  Ruler,
  ScanLine,
  ShieldCheck,
  Smile,
  Sparkles,
  Stethoscope,
  Sun,
  type LucideIcon,
} from 'lucide-react';

/**
 * Mapa explicito de icones. Import nomeado (nao dinamico) para o bundler fazer
 * tree-shaking: so os icones usados entram no bundle.
 * Icones lucide sempre — nunca emoji no HTML final.
 * Todo `icone` citado em content.ts precisa estar aqui; nome ausente cai no
 * Sparkles sem erro, entao o verificador de build nao pega.
 */
const icones: Record<string, LucideIcon> = {
  Activity,
  Armchair,
  ClipboardList,
  Coffee,
  Droplets,
  Gem,
  Gift,
  Headphones,
  Hourglass,
  Layers,
  Leaf,
  MapPin,
  MessageCircle,
  MonitorSmartphone,
  Ruler,
  ScanLine,
  ShieldCheck,
  Smile,
  Sparkles,
  Stethoscope,
  Sun,
};

export function Icon({
  nome,
  size = 24,
  className = '',
  strokeWidth = 1.75,
}: {
  nome: string;
  size?: number;
  className?: string;
  strokeWidth?: number;
}) {
  const Componente = icones[nome] ?? Sparkles;
  return (
    <Componente
      size={size}
      strokeWidth={strokeWidth}
      className={className}
      aria-hidden="true"
    />
  );
}
