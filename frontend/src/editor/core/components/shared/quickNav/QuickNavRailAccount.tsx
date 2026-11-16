import { useTranslation } from "react-i18next";
import { Tooltip } from "@editor/components/shared/Tooltip";
import { Avatar } from "@editor/ui/Avatar";
import { Icon } from "@editor/ui/Icon";
import { useAppConfig } from "@editor/contexts/AppConfigContext";
import type { QuickNavIdentity } from "@editor/contexts/QuickNavHostContext";
import "@editor/components/shared/quickNav/QuickNavRailAccount.css";
import { PrivateContent } from "@editor/components/shared/PrivateContent";
import { privateContentClassName } from "@editor/components/shared/privateContentClassName";

export interface QuickNavRailAccountProps {
  onOpen: () => void;
  /** Null until an identity is first resolved, or when explicitly cleared. */
  identity: QuickNavIdentity | null;
  /** Drawn as the current destination while the settings page is open. */
  active?: boolean;
}

/** The settings/account control, pinned to the bottom of the navigation rail. */
export function QuickNavRailAccount({
  onOpen,
  identity,
  active = false,
}: QuickNavRailAccountProps) {
  const { t } = useTranslation();
  const { config } = useAppConfig();
  const isAnonymous =
    config?.enableLogin === false ||
    config == null ||
    !identity ||
    !identity.displayName ||
    identity.displayName === "User";
  const displayName =
    identity?.displayName ?? t("auth.displayName.user", "User");
  const profilePictureUrl = identity?.profilePictureUrl ?? null;
  const label = isAnonymous
    ? t("quickAccess.config", "Configuración")
    : `${displayName} — ${t("quickNav.account", "Account")}`;

  return (
    <div className="quick-nav-rail-account" data-active={active || undefined}>
      <Tooltip
        content={<PrivateContent>{label}</PrivateContent>}
        position="right"
        arrow
      >
        {/* A span, not the Avatar: Tooltip binds by cloning its child. */}
        <span
          className="quick-nav-rail-avatar-target"
          data-testid="config-button"
          data-tour="config-button"
        >
          {isAnonymous ? (
            <button
              type="button"
              className="quick-nav-rail-settings-btn"
              onClick={onOpen}
              aria-label={label}
              aria-current={active ? "page" : undefined}
            >
              <Icon name="settings" size="1.25rem" />
            </button>
          ) : (
            <Avatar
              src={profilePictureUrl ?? undefined}
              name={displayName}
              size="sm"
              onClick={onOpen}
              ariaLabel={label}
              ariaCurrent={active ? "page" : undefined}
              className={`quick-nav-rail-avatar ${privateContentClassName}`}
            />
          )}
        </span>
      </Tooltip>
    </div>
  );
}
