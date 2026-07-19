"use client";

import { Download } from "lucide-react";

import { ActionButton } from "@/components/dashboard/action-button";

interface DownloadButtonProps {
  getContent: () => string;
  filename: string;
  mimeType?: string;
  label?: string;
  disabled?: boolean;
  className?: string;
}

export function DownloadButton({
  getContent,
  filename,
  mimeType = "text/plain",
  label = "Download",
  disabled,
  className,
}: DownloadButtonProps) {
  const handleDownload = () => {
    const blob = new Blob([getContent()], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <ActionButton
      icon={Download}
      label={label}
      onClick={handleDownload}
      disabled={disabled}
      className={className}
    />
  );
}
