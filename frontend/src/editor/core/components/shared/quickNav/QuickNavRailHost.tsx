import { useTranslation } from "react-i18next";
import { useLocalProcessingOnly } from "@editor/hooks/useLocalProcessingOnly";
import { useLocation, useNavigate } from "react-router-dom";
import { QuickNavRailContainer } from "@editor/components/shared/quickNav/QuickNavRailContainer";
import type { QuickNavEntry } from "@editor/components/shared/quickNav/QuickNavRailBase";
import { useQuickNavHost } from "@editor/contexts/QuickNavHostContext";
import { requestReaderMode } from "@editor/utils/pendingReaderMode";
import {
  takeEditorReturnPath,
} from "@editor/services/workbenchSession";
import { EDITOR_BASENAME } from "@editor/routes/editorBasename";
import { PORTAL_BASENAME } from "@editor/routes/portalBasename";
import { DOCS_PATH } from "@editor/routes/docsRoute";
import { stripBasePath } from "@editor/constants/app";

import { Icon } from "@editor/ui/Icon";
const SIZE = "1.125rem";

/** Entries come from the URL, not either app's context, so the rail survives a switch. */
/** Interpolated, not inlined: a literal "#acc…" reads as a hex colour to theme-lint. */
const ACCOUNT_ANCHOR = "account";

export function QuickNavRailHost() {
  const { t } = useTranslation();
  const localOnly = useLocalProcessingOnly();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const host = useQuickNavHost();

  const appMounted = Boolean(host?.appMounted);

  const path = stripBasePath(pathname);
  const inSettings = path.startsWith("/settings");
  const inDocs = path.startsWith(DOCS_PATH);
  const inPortal = path.startsWith(PORTAL_BASENAME);
  // Settings and the docs browser are pages in their own right, so neither app
  // is the current one while you are on them.
  const inEditor = !inPortal && !inSettings && !inDocs;

  // Only the app knows its own default state.
  const returnHome = () => {
    const reset = host?.actions.current?.goToDefaultState;
    if (reset) reset();
    else navigate(inPortal ? PORTAL_BASENAME : EDITOR_BASENAME);
  };

  // The brand goes where the app launches; the Editor entry stays in the editor.
  const goToStartupView = () => {
    const start = host?.actions.current?.goToStartupView;
    if (start) start();
    else returnHome();
  };

  // Guarded where the app supplies a guard, so leaving mid-edit still prompts.
  const guarded = (leave: () => void) => {
    const guard = host?.actions.current?.requestNavigation;
    if (guard) guard(leave);
    else leave();
  };

  const go = (to: string) => guarded(() => navigate(to));

  // Reading is a surface of its own rather than a tool inside the editor, and it
  // leads the group because it is where most visits start.
  const reader: QuickNavEntry = {
    id: "reader",
    label: t("quickNav.reader", "Reader"),
    icon: <Icon name="book-open" size={SIZE} />,
    // Current means the surface you are on, not a switch left on: reader mode set
    // from the processor does not count until you are in the editor.
    current: inEditor && Boolean(host?.readerMode),
    // From the processor there is no editor to toggle - see pendingReaderMode.
    onClick: () => {
      const setMode = host?.actions.current?.setReaderMode;
      if (setMode) {
        setMode(!host?.readerMode);
        return;
      }
      requestReaderMode();
      go(EDITOR_BASENAME);
    },
  };

  const editor: QuickNavEntry = {
    id: "editor",
    label: t("quickNav.editor", "Editor"),
    icon: <Icon name="pencil" size={SIZE} />,
    // The library and reading are places of their own, not the editor with a
    // different centre.
    current:
      inEditor &&
      !host?.fileLibrary &&
      !host?.readerMode &&
      path !== "/shared-sign",
    onClick: () => {
      if (inEditor) {
        returnHome();
        return;
      }
      // Back to where you left the editor, not its front door.
      navigate(takeEditorReturnPath() ?? EDITOR_BASENAME);
    },
  };

  // The processor is additive: dropping the editor with it left a lone reader
  // entry in builds without a portal, with no way back out of reading.
  const surfaces: QuickNavEntry[] = [
    reader,
    editor,
  ];

  const within: QuickNavEntry[] = [
    ...(!host?.hasOpenFromComputer
      ? []
      : [
          {
            id: "openFromComputer",
            label: t("fileSidebar.openFromComputer", "Open from computer"),
            icon: <Icon name="file-up" size={SIZE} />,
            testId: "files-button",
            tourId: "files-button",
            onClick: () => host?.actions.current?.openFromComputer?.(),
          },
        ]),
    // ponytail: local IndexedDB library replaces processing folders and the sign menu in the rail.
    {
      id: "fileLibrary",
      label: t("fileSidebar.myFiles", "File library"),
      icon: <Icon name="folder" size={SIZE} />,
      current: Boolean(host?.fileLibrary),
      onClick: () => {
        const open = host?.actions.current?.showFileLibrary;
        if (open) open();
        else guarded(() => navigate(EDITOR_BASENAME));
      },
    },
  ];

  // The avatar is the only way into settings now, so it lands on the account
  // section and the page's own nav carries the rest. Inside settings it is a
  // tab switch (replace); from an app it is a navigation.
  const openAccount = () => {
    const target = `/settings/general#${ACCOUNT_ANCHOR}`;
    if (inSettings) {
      navigate(target, { replace: true });
      return;
    }
    go(target);
  };

  // A route that isn't the app hides the bar - see useSuppressQuickNavRail.
  if (!appMounted || host?.chromeless) return null;

  return (
    <QuickNavRailContainer
      groups={[
        surfaces,
        localOnly ? within.filter((entry) => entry.id !== "automate") : within,
      ]}
      onReturnHome={() => guarded(goToStartupView)}
      identity={host?.identity ?? null}
      onOpenAccount={openAccount}
      // The avatar stands for the whole page, not just its own section.
      accountActive={inSettings}
      onOpenDocs={undefined}
      docsActive={false}
      onInvite={undefined}
      onToggleNotifications={undefined}
      notificationsOpen={false}
    />
  );
}
