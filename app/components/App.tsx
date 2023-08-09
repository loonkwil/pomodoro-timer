import { useCallback } from "react";
import Time from "@/app/components/Time";
import RangeInput from "@/app/components/RangeInput";
import usePomodoro from "@/app/hooks/usePomodoro";

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

  const state = isPlaying ? type : null;
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
