import {
  Activity,
  Coffee,
  Gem,
  Gift,
  Headphones,
  HeartHandshake,
  Layers,
  Leaf,
  MonitorSmartphone,
  ShieldCheck,
  Smile,
  Sparkles,
  Stethoscope,
  type LucideIcon,
} from 'lucide-react';

/**
 * Mapa explicito de icones. Import nomeado (nao dinamico) para o Vite fazer
 * tree-shaking: so os icones usados entram no bundle.
 * Icones lucide sempre — nunca emoji no HTML final.
 */
const icones: Record<string, LucideIcon> = {
  Activity,
  Coffee,
  Gem,
  Gift,
  Headphones,
  HeartHandshake,
  Layers,
  Leaf,
  MonitorSmartphone,
  ShieldCheck,
  Smile,
  Sparkles,
  Stethoscope,
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
