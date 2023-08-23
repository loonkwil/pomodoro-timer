"use client";

import { useEffect } from "react";
import App from "@/app/components/App";
import {
  isCSSNestingSupported,
  isCSSContainerQueriesSupported,
} from "@/app/lib/featureDetection";

function parseNumberOfPomodoros(str: string | undefined): number | undefined {
  if (!str) {
    return undefined;
  }

  const value = parseInt(str, 10);
  if (Number.isNaN(value)) {
    return undefined;
  }

  return Math.max(1, value);
}

function parseLength(str: string | undefined): number | undefined {
  if (!str) {
    return undefined;
  }

  const value = parseInt(str, 10);
  if (Number.isNaN(value)) {
    return undefined;
  }

  return Math.max(1, value) * 60 * 1_000;
}

export default function Home({
  params: { config = [] },
}: {
  params: { config?: string[] };
}) {
  const numberOfPomodoros = parseNumberOfPomodoros(config[0]) ?? 4;
  const lengths = {
    pomodoro: parseLength(config[1]) ?? 25 * 60 * 1_000,
    break: parseLength(config[2]) ?? 5 * 60 * 1_000,
  };

  useEffect(() => {
    if (!isCSSNestingSupported() || !isCSSContainerQueriesSupported()) {
      const msg =
        "Your Browser is not Supported.\n" +
        "Try to use a browser that supports modern CSS features like nesting, cascade layers, container style queries, media query range syntax (Chrome 112+).";
      throw new Error(msg);
    }
  }, []);

  return <App numberOfPomodoros={numberOfPomodoros} lengths={lengths} />;
}
