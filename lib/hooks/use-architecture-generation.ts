"use client";

import { useCallback, useState } from "react";

export type GenerationStatus = "idle" | "loading" | "success";

/**
 * Drives the dashboard's generate flow.
 *
 * Currently simulates a generation with a timeout. Swap the body of
 * `generate` for a POST to /api/generate-architecture in Step 4 —
 * no component using this hook needs to change.
 */
export function useArchitectureGeneration() {
  const [requirement, setRequirementState] = useState("");
  const [status, setStatus] = useState<GenerationStatus>("idle");

  // Editing the prompt after a successful generation means the results on
  // screen no longer describe what's in the textarea — mark them stale
  // rather than leaving mismatched output visible.
  const setRequirement = useCallback((value: string) => {
    setRequirementState(value);
    setStatus((prev) => (prev === "success" ? "idle" : prev));
  }, []);

  const generate = useCallback(() => {
    if (!requirement.trim() || status === "loading") return;
    setStatus("loading");
    window.setTimeout(() => setStatus("success"), 1600);
  }, [requirement, status]);

  const reset = useCallback(() => {
    setStatus("idle");
    setRequirementState("");
  }, []);

  return { requirement, setRequirement, status, generate, reset };
}
