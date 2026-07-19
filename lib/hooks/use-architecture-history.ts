"use client";

import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "cloudpilot:history";
const MAX_ITEMS = 5;

export interface HistoryEntry {
  id: string;
  requirement: string;
  createdAt: string;
}

export function useArchitectureHistory() {
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  // localStorage isn't available during SSR, so load it after mount.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setHistory(JSON.parse(raw));
    } catch {
      // Corrupted or inaccessible storage — start with an empty history.
    }
  }, []);

  const addEntry = useCallback((requirement: string) => {
    const trimmed = requirement.trim();
    if (!trimmed) return;

    setHistory((prev) => {
      const deduped = prev.filter((entry) => entry.requirement !== trimmed);
      const next = [
        { id: crypto.randomUUID(), requirement: trimmed, createdAt: new Date().toISOString() },
        ...deduped,
      ].slice(0, MAX_ITEMS);

      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // Storage full or unavailable — history still works in-memory for this session.
      }
      return next;
    });
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Nothing to clean up if storage was never accessible.
    }
  }, []);

  return { history, addEntry, clearHistory };
}
