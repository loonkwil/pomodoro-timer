"use client";

import { useCallback, useEffect } from "react";
import Time from "@/app/components/Time";
import RangeInput from "@/app/components/RangeInput";
import AudioPlayer from "@/app/components/AudioPlayer";
import { usePomodoro, useShortcut, useFavicon } from "@/app/hooks";
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
    <>
      <AudioPlayer
        src="/audio/clock.mp3"
        isPlaying={isPlaying && type === "pomodoro"}
      />
      <div
        className="app-container"
        style={{ "--state": isPlaying ? type : null } as React.CSSProperties}
        onClick={handleClick}
      >
        <div className="app">
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
    </>
  );
}
