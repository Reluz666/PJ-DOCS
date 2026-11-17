import React, { useState } from "react";
import { useFileHandler } from "@editor/hooks/useFileHandler";
import { useToolWorkflow } from "@editor/contexts/ToolWorkflowContext";
import MobileUploadModal from "@editor/components/shared/MobileUploadModal";
import { openFilesFromDisk } from "@editor/services/openFilesFromDisk";
import { QuickActionsHero } from "@editor/components/shared/QuickActionsHero";
import { useAppConfig } from "@editor/contexts/AppConfigContext";
import { useIsMobile } from "@editor/hooks/useIsMobile";
import type { ToolId } from "@editor/types/toolId";
import "@editor/components/shared/LandingPage.css";

const LandingPage = () => {
  const { addFiles } = useFileHandler();
  const { handleToolSelect } = useToolWorkflow();
  const { config } = useAppConfig();
  const isMobile = useIsMobile();
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);
  const [mobileUploadModalOpen, setMobileUploadModalOpen] = useState(false);

  const handleNativeUploadClick = async () => {
    const files = await openFilesFromDisk({
      multiple: true,
      onFallbackOpen: () => fileInputRef.current?.click(),
    });
    if (files.length > 0) {
      await addFiles(files);
    }
  };

  const handleActionClick = async (toolId: ToolId, droppedFiles?: File[]) => {
    handleToolSelect(toolId);
    if (droppedFiles && droppedFiles.length > 0) {
      await addFiles(droppedFiles);
      return;
    }
    const files = await openFilesFromDisk({
      multiple: true,
      onFallbackOpen: () => fileInputRef.current?.click(),
    });
    if (files.length > 0) {
      await addFiles(files);
    }
  };

  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = Array.from(event.target.files || []);
    if (files.length > 0) {
      await addFiles(files);
    }
    event.target.value = "";
  };

  const handleFilesReceivedFromMobile = async (files: File[]) => {
    if (files.length > 0) {
      await addFiles(files);
    }
  };

  return (
    <div
      className="flex min-h-0 w-full flex-1 flex-col"
      style={{
        position: "relative",
        height: "100%",
        width: "100%",
        overflowY: "auto",
        overflowX: "hidden",
      }}
    >
      <QuickActionsHero
        onActionClick={handleActionClick}
        onGeneralUpload={() => void handleNativeUploadClick()}
        mobileUploadEnabled={!!config?.enableMobileScanner && !isMobile}
        onMobileUpload={() => setMobileUploadModalOpen(true)}
      />

      <input
        ref={fileInputRef}
        type="file"
        multiple
        onChange={handleFileSelect}
        style={{ display: "none" }}
      />

      <MobileUploadModal
        opened={mobileUploadModalOpen}
        onClose={() => setMobileUploadModalOpen(false)}
        onFilesReceived={handleFilesReceivedFromMobile}
      />
    </div>
  );
};

export default LandingPage;
