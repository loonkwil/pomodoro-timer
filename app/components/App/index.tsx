"use client";

import { useCallback, useEffect } from "react";
import Timer from "@/app/components/App/Timer";
import AudioPlayer from "@/app/components/App/AudioPlayer";
import { usePomodoro, useShortcut, useFavicon } from "@/app/hooks";
import type { Type } from "@/app/hooks/usePomodoro";
import { formatTime } from "@/app/lib/utils";
import {
  isCSSNestingSupported,
  isCSSContainerQueriesSupported,
  isCSSContainerStyleQueriesSupported,
} from "@/app/lib/featureDetection";

const colors = {
  pink: "#cf6955",
  blue: "#058b8c",
  yellow: "#ffdea9",
};

function generateSVGIndicator(type: Type, isPlaying: boolean): string {
  let color = colors.yellow;
  if (isPlaying) {
    color = type === "pomodoro" ? colors.pink : colors.blue;
  }

  return `
    <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <circle cx="8" cy="8" r="4" fill="${color}"/>
    </svg>
  `;
}

function encodeSVG(svg: string): string {
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

export default function App({
  numberOfPomodoros,
  lengths,
}: {
  numberOfPomodoros: number;
  lengths: { pomodoro: number; break: number };
}) {
  useEffect(() => {
    const isSupported =
      isCSSNestingSupported() &&
      isCSSContainerQueriesSupported() &&
      isCSSContainerStyleQueriesSupported();
    if (!isSupported) {
      const msg =
        "Your Browser is not Supported.\n" +
        "Try to use a browser that supports modern CSS features like nesting, cascade layers, container style queries, media query range syntax (Chrome 112+).";
      throw new Error(msg);
    }
  }, []);

  const {
    timeLeftFromCurrentSession,
    completedPomodoros,
    setCompletedPomodoros,
    type,
    isPlaying,
    togglePlaying,
  } = usePomodoro({ numberOfPomodoros, lengths });
  const timeLeftInSec = Math.floor(timeLeftFromCurrentSession / 1_000);

  useEffect(() => {
    const title = formatTime(timeLeftInSec);
    document.title = title;
  }, [timeLeftInSec]);

  const icon = encodeSVG(generateSVGIndicator(type, isPlaying));
  useFavicon(icon);

  useShortcut({
    " ": togglePlaying,
    Enter: togglePlaying,
    Escape: () => setCompletedPomodoros(Math.floor(completedPomodoros)),
  });

  const handleInputChange = useCallback(
    (value: number) => {
      if (value < numberOfPomodoros) {
        setCompletedPomodoros(value);
      }
    },
    [numberOfPomodoros, setCompletedPomodoros],
  );

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if ((e.target as HTMLElement).nodeName !== "INPUT") {
        togglePlaying();
      }
    },
    [togglePlaying],
  );

  return (
    <main
      className="app"
      style={{ "--state": isPlaying ? type : null } as React.CSSProperties}
      onClick={handleClick}
    >
      <AudioPlayer
        src="/audio/clock.mp3"
        isPlaying={isPlaying && type === "pomodoro"}
      />
      <Timer
        {...{
          timeLeftInSec,
          handleInputChange,
          numberOfPomodoros,
          completedPomodoros,
        }}
      />
    </main>
  );
}
