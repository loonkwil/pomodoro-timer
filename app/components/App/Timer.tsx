import Time from "@/app/components/App/Time";
import RangeInput from "@/app/components/App/RangeInput";

export default function Timer({
  timeLeftInSec,
  handleClick,
  handleInputChange,
  numberOfPomodoros,
  completedPomodoros,
}: {
  timeLeftInSec: number;
  handleClick: (e: React.MouseEvent<HTMLElement>) => void;
  handleInputChange: (value: number) => void;
  numberOfPomodoros: number;
  completedPomodoros: number;
}) {
  return (
    <div className="timer" onClick={handleClick}>
      <Time timeLeft={timeLeftInSec} />
      <RangeInput
        onChange={handleInputChange}
        min={0}
        max={numberOfPomodoros}
        step={1}
        numberOfMarkers={numberOfPomodoros - 1}
        value={completedPomodoros}
        ariaLabel="Progress"
        ariaValueText={`${completedPomodoros.toFixed(1)} pomodoros are done`}
      />
    </div>
  );
}
