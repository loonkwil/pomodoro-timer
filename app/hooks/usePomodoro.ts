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
  setCompletedPomodoros: React.Dispatch<React.SetStateAction<number>>;
  type: "pomodoro" | "break";
  isPlaying: boolean;
  setPlaying: React.Dispatch<React.SetStateAction<boolean>>;
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

  function setCompletedPomodoros(valueOrFn: React.SetStateAction<number>) {
    const value =
      typeof valueOrFn === "function"
        ? valueOrFn(completedPomodoros)
        : valueOrFn;
    setTime(value * cycleLength);
  }

  return {
    timeLeftFromCurrentSession,
    completedPomodoros,
    setCompletedPomodoros,
    type,
    isPlaying,
    setPlaying,
  };
}
