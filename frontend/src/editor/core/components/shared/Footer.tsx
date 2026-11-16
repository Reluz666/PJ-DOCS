import { Flex } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { useCookieConsent } from "@editor/hooks/useCookieConsent";
import { useFooterInfo } from "@editor/hooks/useFooterInfo";
import { Button } from "@editor/ui/Button";

interface FooterProps {
  privacyPolicy?: string;
  termsAndConditions?: string;
  accessibilityStatement?: string;
  cookiePolicy?: string;
  impressum?: string;
  analyticsEnabled?: boolean;
}

export default function Footer({
  privacyPolicy,
  termsAndConditions,
  accessibilityStatement,
  cookiePolicy,
  impressum,
  analyticsEnabled,
}: FooterProps) {
  const { t } = useTranslation();
  const { footerInfo } = useFooterInfo();

  // Use props if provided, otherwise fall back to fetched footer info
  const finalAnalyticsEnabled =
    analyticsEnabled ?? footerInfo?.analyticsEnabled ?? false;
  const finalPrivacyPolicy = privacyPolicy ?? footerInfo?.privacyPolicy;
  const finalTermsAndConditions =
    termsAndConditions ?? footerInfo?.termsAndConditions;
  const finalAccessibilityStatement =
    accessibilityStatement ?? footerInfo?.accessibilityStatement;
  const finalCookiePolicy = cookiePolicy ?? footerInfo?.cookiePolicy;
  const finalImpressum = impressum ?? footerInfo?.impressum;

  const { showCookiePreferences } = useCookieConsent();

  // Default URLs — use institutional links for PJ-DOCS
  const defaultTermsUrl = "https://www.pj.gob.pe";
  const defaultPrivacyUrl = "https://www.pj.gob.pe";

  // Use provided URLs or fall back to defaults
  const finalTermsUrl = finalTermsAndConditions || defaultTermsUrl;
  const finalPrivacyUrl = finalPrivacyPolicy || defaultPrivacyUrl;

  // Helper to check if a value is valid (not null/undefined/empty string)
  const isValidLink = (link?: string) => link && link.trim().length > 0;

  return (
    <div
      style={{
        height: "var(--footer-height)",
        backgroundColor: "var(--c-surface)",
        borderTop: "1px solid var(--c-border-subtle)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Flex
        gap="md"
        justify="center"
        align="center"
        direction="row"
        style={{
          fontSize: "0.75rem",
        }}
      >
        <a
          className="footer-link px-3"
          target="_blank"
          rel="noopener noreferrer"
          href={finalPrivacyUrl}
        >
          {t("legal.privacy", "Política de Privacidad")}
        </a>
        <a
          className="footer-link px-3"
          target="_blank"
          rel="noopener noreferrer"
          href={finalTermsUrl}
        >
          {t("legal.terms", "Términos y Condiciones")}
        </a>
        <a
          className="footer-link px-3"
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.pj.gob.pe"
        >
          {t("footer.pj", "Portal del Poder Judicial")}
        </a>
        <a
          className="footer-link px-3"
          target="_blank"
          rel="noopener noreferrer"
          href="https://csjla.pe"
        >
          {t("footer.csjla", "CSJLA • Corte de Lambayeque")}
        </a>
        <span
          style={{
            fontSize: "0.68rem",
            color: "var(--c-text-subtle)",
            opacity: 0.65,
            paddingLeft: "0.25rem",
            paddingRight: "0.25rem",
            userSelect: "none",
          }}
        >
          • Informática - CSJLA | Alejandro R.M
        </span>
        {isValidLink(finalAccessibilityStatement) && (
          <a
            className="footer-link px-3"
            target="_blank"
            rel="noopener noreferrer"
            href={finalAccessibilityStatement}
          >
            {t("legal.accessibility", "Accesibilidad")}
          </a>
        )}
        {isValidLink(finalCookiePolicy) && (
          <a
            className="footer-link px-3"
            target="_blank"
            rel="noopener noreferrer"
            href={finalCookiePolicy}
          >
            {t("legal.cookie", "Política de Cookies")}
          </a>
        )}
        {isValidLink(finalImpressum) && (
          <a
            className="footer-link px-3"
            target="_blank"
            rel="noopener noreferrer"
            href={finalImpressum}
          >
            {t("legal.impressum", "Impressum")}
          </a>
        )}
        {finalAnalyticsEnabled && (
          <Button
            variant="tertiary"
            className="footer-link px-3"
            id="cookieBanner"
            onClick={showCookiePreferences}
          >
            {t("legal.showCookieBanner", "Preferencias de Cookies")}
          </Button>
        )}
      </Flex>
    </div>
  );
}
