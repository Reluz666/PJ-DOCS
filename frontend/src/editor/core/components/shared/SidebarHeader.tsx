import { Icon } from "@editor/ui/Icon";

export interface SidebarHeaderProps {
  className?: string;
  onCollapse?: () => void;
}

/**
 * Cabecera oficial PJ-DOCS para la barra lateral
 */
export function SidebarHeader({ className, onCollapse }: SidebarHeaderProps) {
  return (
    <div
      className={`file-sidebar-header${className ? ` ${className}` : ""}`}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0.65rem 0.85rem",
        width: "100%",
        borderBottom: "1px solid var(--c-border-subtle)",
        marginBottom: "0.5rem",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <Icon
          name="scale"
          size="1.1rem"
          style={{ color: "var(--c-primary)", flexShrink: 0 }}
        />
        <span
          style={{
            fontSize: "0.95rem",
            fontWeight: 800,
            letterSpacing: "0.03em",
            color: "var(--c-primary)",
          }}
        >
          PJ-DOCS
        </span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "0.45rem" }}>
        <span
          style={{
            fontSize: "0.65rem",
            fontWeight: 700,
            padding: "0.15rem 0.5rem",
            borderRadius: "9999px",
            background: "var(--c-primary-subtle)",
            color: "var(--c-primary)",
            border: "1px solid color-mix(in srgb, var(--c-primary) 20%, transparent)",
          }}
        >
          CSJLA
        </span>
        {onCollapse && (
          <button
            type="button"
            onClick={onCollapse}
            title="Ocultar panel de archivos"
            aria-label="Ocultar panel de archivos"
            style={{
              background: "transparent",
              border: "none",
              color: "var(--c-text-muted)",
              cursor: "pointer",
              padding: "0.2rem",
              borderRadius: "4px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon name="x" size="0.95rem" />
          </button>
        )}
      </div>
    </div>
  );
}
