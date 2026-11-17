import { withBasePath } from "@editor/constants/app";
interface BrandTileProps {
  /** CSS length. Omit to let the caller's CSS size it. */
  size?: string;
  className?: string;
}

/** Insignia oficial de PJ-DOCS (Corte Superior de Justicia de Lambayeque) */
export function BrandTile({ size = "2rem", className }: BrandTileProps) {
  return (
    <img
      src={withBasePath("/logo-pjdocs.webp")}
      alt="PJ-DOCS"
      className={className}
      style={{ width: size, height: size, objectFit: "contain" }}
    />
  );
}
