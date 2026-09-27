"use client";

import type { ReactNode, RefObject } from "react";
import { motion, useInView, type Variants } from "motion/react";

/**
 * Dependencia do componente "testimonial" (21st.dev), que o prompt importa mas
 * nao traz: revela cada item em sequencia quando o container (`timelineRef`)
 * entra na tela. `animationNum` e a posicao na sequencia; o atraso vem das
 * `customVariants` de quem usa.
 */
type TimelineContentProps = {
  children?: ReactNode;
  animationNum: number;
  timelineRef: RefObject<HTMLElement | null>;
  className?: string;
  as?: "div" | "h1" | "h2" | "h3" | "p" | "article" | "li" | "span";
  customVariants?: Variants;
  once?: boolean;
};

const variantesPadrao: Variants = {
  visible: (i: number) => ({
    filter: "blur(0px)",
    y: 0,
    opacity: 1,
    transition: { delay: i * 0.5, duration: 0.5 },
  }),
  hidden: { filter: "blur(20px)", y: 0, opacity: 0 },
};

export function TimelineContent({
  children,
  animationNum,
  timelineRef,
  className,
  as = "div",
  customVariants,
  once = true,
}: TimelineContentProps) {
  const visivel = useInView(timelineRef, { once, margin: "0px 0px -15% 0px" });
  const Componente = motion[as];

  return (
    <Componente
      initial="hidden"
      animate={visivel ? "visible" : "hidden"}
      custom={animationNum}
      variants={customVariants ?? variantesPadrao}
      className={className}
    >
      {children}
    </Componente>
  );
}
