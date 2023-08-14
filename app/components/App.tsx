import { useCallback, useEffect } from "react";
import Time from "@/app/components/Time";
import RangeInput from "@/app/components/RangeInput";
import usePomodoro from "@/app/hooks/usePomodoro";
import { formatTime } from "@/app/lib/utils";

type State = "pomodoro" | "break" | "paused";

function generateSVGIndicator(state: State): string {
  const colors = {
    pomodoro: "#cf6955",
    break: "#058b8c",
    paused: "#ffdea9",
  };
  const color = colors[state];
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
    setPlaying,
  } = usePomodoro({ numberOfPomodoros, lengths });
  const state = isPlaying ? type : "paused";

  useEffect(() => {
    const title = formatTime(timeLeftFromCurrentSession);
    document.title = title;
  }, [timeLeftFromCurrentSession]);

  useEffect(() => {
    const $link = document.querySelector("link[rel='icon']");
    if ($link) {
      const svg = generateSVGIndicator(state);
      $link.setAttribute(
        "href",
        `data:image/svg+xml,${encodeURIComponent(svg)}`,
      );
    }
  }, [state]);

  const handleChange = useCallback(
    (value: number) => {
      if (value < numberOfPomodoros) {
        setCompletedPomodoros(value);
      }
    },
    [numberOfPomodoros, setCompletedPomodoros],
  );

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if ((e.target as HTMLElement).nodeName === "INPUT") {
        return;
      }

      setPlaying((isPlaying) => !isPlaying);
    },
    [setPlaying],
  );

  return (
    <div
      className="app-container"
      style={{ "--state": state } as React.CSSProperties}
      onClick={handleClick}
    >
      <div className="app">
        <Time timeLeft={timeLeftFromCurrentSession} />
        <RangeInput
          onChange={handleChange}
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
