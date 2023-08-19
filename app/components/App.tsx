"use client";

import { useCallback, useEffect } from "react";
import Time from "@/app/components/Time";
import RangeInput from "@/app/components/RangeInput";
import AudioPlayer from "@/app/components/AudioPlayer";
import usePomodoro from "@/app/hooks/usePomodoro";
import useShortcut from "@/app/hooks/useShortcut";
import type { Type } from "@/app/hooks/usePomodoro";
import { formatTime } from "@/app/lib/utils";

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

export default function App({
  numberOfPomodoros,
  lengths,
}: {
  numberOfPomodoros: number;
  lengths: { pomodoro: number; break: number };
}) {
  const {
    timeLeftFromCurrentSession,
    completedPomodoros,
    setCompletedPomodoros,
    type,
    isPlaying,
    togglePlaying,
  } = usePomodoro({ numberOfPomodoros, lengths });
  const timeLeftInSec = Math.floor(timeLeftFromCurrentSession / 1_000);

  useEffect(
    function updateDocumentTitle() {
      const title = formatTime(timeLeftInSec);
      document.title = title;
    },
    [timeLeftInSec],
  );

  useEffect(
    function updateFavIcon() {
      const $link = document.querySelector("link[rel='icon']");
      if ($link) {
        const svg = generateSVGIndicator(type, isPlaying);
        $link.setAttribute(
          "href",
          `data:image/svg+xml,${encodeURIComponent(svg)}`,
        );
      }
    },
    [type, isPlaying],
  );

  const handleInputChange = useCallback(
    (value: number) => {
      if (value < numberOfPomodoros) {
        setCompletedPomodoros(value);
      }
    },
    [numberOfPomodoros, setCompletedPomodoros],
  );

  useShortcut(" ", togglePlaying);
  useShortcut("Enter", togglePlaying);
  useShortcut("Escape", () =>
    setCompletedPomodoros(Math.floor(completedPomodoros)),
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
    <div
      className="app-container"
      style={{ "--state": isPlaying ? type : null } as React.CSSProperties}
      onClick={handleClick}
    >
      <div className="app">
        <AudioPlayer
          src="/audio/clock.mp3"
          isPlaying={isPlaying && type === "pomodoro"}
        />
        <Time timeLeft={timeLeftInSec} />
        <RangeInput
          onChange={handleInputChange}
          min={0}
          max={numberOfPomodoros}
          step={1}
          numberOfMarkers={numberOfPomodoros - 1}
          value={completedPomodoros}
        />
      </div>
    </div>
  );
}
