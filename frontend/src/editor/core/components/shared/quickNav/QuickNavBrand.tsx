import { useCallback } from "react";
import { useQuickNavHost } from "@editor/contexts/QuickNavHostContext";
import { useSecretClicks } from "@editor/components/easterEgg/useSecretClicks";
import { withBasePath } from "@editor/constants/app";

export interface QuickNavBrandProps {
  /** Returns the app you are in to its default state. */
  onReturnHome: () => void;
}

export function QuickNavBrand({ onReturnHome }: QuickNavBrandProps) {
  const label = "PJ-DOCS - Corte de Lambayeque";
  const host = useQuickNavHost();

  const flourish = useCallback(
    (originRect: DOMRect) => {
      host?.actions.current?.onBrandFlourish?.(originRect);
    },
    [host],
  );
  const countClick = useSecretClicks(flourish);

  return (
    <div className="quick-nav-brand">
      <button
        type="button"
        className="quick-nav-brand-button"
        aria-label={label}
        title="Inicio - PJ-DOCS"
        onClick={(event) => {
          const rect = event.currentTarget.getBoundingClientRect();
          onReturnHome();
          countClick(rect);
        }}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 2,
        }}
      >
        <img
          src={withBasePath("/logo-pj-court-trans.webp")}
          alt="Poder Judicial - Corte de Lambayeque"
          style={{
            width: "2.15rem",
            height: "2.15rem",
            objectFit: "contain",
            filter: "drop-shadow(0 1px 3px rgba(0,0,0,0.12))",
          }}
        />
      </button>
    </div>
  );
}
