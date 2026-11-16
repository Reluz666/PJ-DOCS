import "@editor/components/chat/ChatPanel.css";

export function StirlingLogoAnimated({ size = 20 }: { size?: number }) {
  return (
    <img
      src="/logo-pj-court-trans.webp"
      alt="PJ-DOCS"
      style={{ width: size, height: size, objectFit: "contain" }}
    />
  );
}
