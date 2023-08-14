import { useCallback } from "react";
import useStopwatch from "@/app/hooks/useStopwatch";

export default function usePomodoro({
  numberOfPomodoros,
  lengths,
}: {
  numberOfPomodoros: number;
  lengths: { pomodoro: number; break: number };
}): {
  timeLeftFromCurrentSession: number;
  completedPomodoros: number;
  setCompletedPomodoros: (value: number) => void;
  type: "pomodoro" | "break";
  isPlaying: boolean;
  setPlaying: (isPlaying: boolean) => void;
} {
  const { time, setTime, isPlaying, setPlaying } = useStopwatch(200);

  const cycleLength = lengths.pomodoro + lengths.break;
  const completedCycles = Math.floor(time / cycleLength);
  const uncompletedCycleTime = time % cycleLength;
  const type = uncompletedCycleTime < lengths.pomodoro ? "pomodoro" : "break";

  let timeLeftFromCurrentSession: number;
  let completedPomodoros: number;
  if (type === "pomodoro") {
    timeLeftFromCurrentSession = lengths.pomodoro - uncompletedCycleTime;
    completedPomodoros =
      completedCycles + uncompletedCycleTime / lengths.pomodoro;
  } else {
    timeLeftFromCurrentSession = cycleLength - uncompletedCycleTime;
    completedPomodoros = completedCycles + 1;
  }

  if (completedPomodoros >= numberOfPomodoros) {
    setTime(0);
  }

  const setCompletedPomodoros = useCallback(
    (value: number) => setTime(value * cycleLength),
    [setTime, cycleLength],
  );

  return {
    timeLeftFromCurrentSession,
    completedPomodoros,
    setCompletedPomodoros,
    type,
    isPlaying,
    setPlaying,
  };
}
