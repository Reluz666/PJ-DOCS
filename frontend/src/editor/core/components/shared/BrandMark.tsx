import "@editor/components/shared/BrandMark.css";
import { withBasePath } from "@editor/constants/app";

interface BrandMarkProps {
  /** Height of the mark (CSS length). */
  height?: string;
  className?: string;
}

/**
 * Marca oficial Corte Superior de Justicia de Lambayeque
 */
export function BrandMark({ height = "1.8rem", className }: BrandMarkProps) {
  return (
    <img
      src={withBasePath("/logo-pj-court-trans.webp")}
      alt="Poder Judicial del Perú"
      className={`sui-brandmark${className ? ` ${className}` : ""}`}
      style={{
        height,
        width: height,
        objectFit: "contain",
      }}
    />
  );
}
