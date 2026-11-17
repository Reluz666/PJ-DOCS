import type { CSSProperties } from "react";
import "@editor/components/shared/BrandMark.css";
import "@editor/ui/Logo.css";
import { withBasePath } from "@editor/constants/app";

export type LogoVariant = "iconOnly" | "iconAndText" | "textOnly";

interface LogoProps {
  variant?: LogoVariant;
  orientation?: "horizontal" | "vertical";
  iconHeight?: string;
  textHeight?: string;
  gap?: string;
  className?: string;
  style?: CSSProperties;
  alt?: string;
}

/**
 * Logotipo oficial de la Corte Superior de Justicia de Lambayeque
 * Poder Judicial del Perú
 */
export function Logo({
  variant = "iconAndText",
  orientation = "horizontal",
  iconHeight = "2.25rem",
  textHeight = "0.95rem",
  gap = "0.6rem",
  className,
  style,
  alt = "PJ-DOCS",
}: LogoProps) {
  if (variant === "iconOnly") {
    return (
      <span
        className={`sui-logo ${className ?? ""}`}
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          ...style,
        }}
      >
        <img
          src={withBasePath("/logo-pj-court-trans.webp")}
          alt={alt}
          style={{
            height: iconHeight,
            width: iconHeight,
            objectFit: "contain",
          }}
        />
      </span>
    );
  }

  if (variant === "textOnly") {
    return (
      <span
        className={`sui-logo ${className ?? ""}`}
        style={{
          display: "inline-flex",
          flexDirection: "column",
          justifyContent: "center",
          lineHeight: 1.15,
          fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
          ...style,
        }}
      >
        <span
          style={{
            fontSize: "0.65rem",
            fontWeight: 800,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: "var(--c-primary)",
          }}
        >
          Poder Judicial del Perú
        </span>
        <span
          style={{
            fontSize: textHeight,
            fontWeight: 800,
            color: "var(--c-text)",
            letterSpacing: "-0.01em",
          }}
        >
          PJ-DOCS • Lambayeque
        </span>
      </span>
    );
  }

  return (
    <span
      className={`sui-logo ${className ?? ""}`}
      style={{
        display: "inline-flex",
        flexDirection: orientation === "vertical" ? "column" : "row",
        alignItems: "center",
        gap,
        ...style,
      }}
    >
      <img
        src={withBasePath("/logo-pj-court-trans.webp")}
        alt={alt}
        style={{
          height: iconHeight,
          width: iconHeight,
          objectFit: "contain",
        }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          textAlign: orientation === "vertical" ? "center" : "left",
          lineHeight: 1.15,
          fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
        }}
      >
        <span
          style={{
            fontSize: "0.62rem",
            fontWeight: 800,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: "var(--c-primary)",
          }}
        >
          Poder Judicial del Perú
        </span>
        <span
          style={{
            fontSize: textHeight,
            fontWeight: 800,
            color: "var(--c-text)",
            letterSpacing: "-0.01em",
          }}
        >
          PJ-DOCS • Corte de Lambayeque
        </span>
      </div>
    </span>
  );
}
