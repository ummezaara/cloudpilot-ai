"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

import { ActionButton } from "@/components/dashboard/action-button";

interface CopyButtonProps {
  value: string;
  label?: string;
  className?: string;
}

export function CopyButton({ value, label = "Copy", className }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!value) return;
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard permission denied or unavailable — button simply won't confirm.
    }
  };

  return (
    <ActionButton
      icon={copied ? Check : Copy}
      label={copied ? "Copied" : label}
      onClick={handleCopy}
      disabled={!value}
      className={className}
    />
  );
}
