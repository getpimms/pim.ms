"use client";

import { BlurImage } from "@dub/ui";
import { cn } from "@dub/utils";
import { CSSProperties, useId } from "react";

export function HeroBackground({
  logo,
  color,
  embed = false,
}: {
  logo?: string | null;
  color?: string | null;
  embed?: boolean;
}) {
  return (
    <div
      className="bg-bg-muted absolute inset-0 isolate -z-[1] overflow-hidden [container-type:size]"
      style={
        {
          color: color || "#737373",
          "--brand": color || "#737373",
          "--brand-dark": "oklch(from var(--brand) 0.38 min(c, 0.17) h)",
        } as CSSProperties
      }
    >
      <div
        className={cn(
          "absolute right-4 top-4 block size-6 min-[300px]:size-8",

          // Position based on cqh to adjust for container height
          "",
          embed
            ? "md:right-[62cqh] md:top-1/2 md:size-[32cqh] md:-translate-y-1/2 md:translate-x-1/2"
            : "lg:right-[62cqh] lg:top-1/2 lg:size-[32cqh] lg:-translate-y-1/2 lg:translate-x-1/2",
        )}
      >
        {logo && (
          <BlurImage
            src={logo}
            alt="Program Logo"
            fill
            className="absolute object-cover object-center"
            draggable={false}
          />
        )}
      </div>
    </div>
  );
}