import { useMemo } from "react";

/** Theme-specific no-text logo SVG URLs under the `modern-logo` folder. */
export function useLogoPath(): { dark: string; light: string } {
  return useMemo(
    () => ({
      dark: `/logo-pjdocs.webp`,
      light: `/logo-pjdocs.webp`,
    }),
    [],
  );
}
