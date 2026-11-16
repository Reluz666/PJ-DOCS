import { useMemo } from "react";
import { BASE_PATH } from "@editor/constants/app";

const LOGO_FOLDER = "modern-logo";

export function useLogoAssets() {
  return useMemo(() => {
    const folderPath = `${BASE_PATH}/${LOGO_FOLDER}`;

    return {
      folderPath,
      getAssetPath: (name: string) => `${folderPath}/${name}`,
      wordmark: {
        black: `/logo-csjla-header.webp`,
        grey: `/logo-csjla-header.webp`,
        white: `/logo-csjla-header.webp`,
      },
      tooltipLogo: `/logo-pjdocs.webp`,
      firstPage: `/logo-pjdocs.webp`,
      favicon: `/favicon.png`,
      logo192: `${folderPath}/logo192.png`,
      logo512: `${folderPath}/logo512.png`,
      manifestHref: `${BASE_PATH}/manifest.json`,
    };
  }, []);
}
