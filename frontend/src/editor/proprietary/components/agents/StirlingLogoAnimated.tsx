import "@editor/components/chat/ChatPanel.css";
import { withBasePath } from "@editor/constants/app";

export function StirlingLogoAnimated({ size = 20 }: { size?: number }) {
  return (
    <img
      src={withBasePath("/logo-pj-court-trans.webp")}
      alt="PJ-DOCS"
      style={{ width: size, height: size, objectFit: "contain" }}
    />
  );
}
