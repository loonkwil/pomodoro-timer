"use client";

import { useEffect } from "react";
import App from "@/app/components/App";
import {
  isCSSNestingSupported,
  isCSSContainerQueriesSupported,
} from "@/app/lib/featureDetection";

const config = {
  numberOfPomodoros: 4,
  lengths: { pomodoro: 25 * 60 * 1_000, break: 5 * 60 * 1_000 },
};

export default function Home() {
  useEffect(() => {
    if (!isCSSNestingSupported() || !isCSSContainerQueriesSupported()) {
      const msg =
        "Your Browser is not Supported.\n" +
        "Try to use a browser that supports modern CSS features like nesting, cascade layers, container style queries, media query range syntax (Chrome 112+).";
      throw new Error(msg);
    }
  }, []);

  return <App {...config} />;
}
