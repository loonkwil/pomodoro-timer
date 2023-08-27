import Time from "@/app/components/App/Time";
import RangeInput from "@/app/components/App/RangeInput";

export default function Timer({
  timeLeftInSec,
  handleInputChange,
  numberOfPomodoros,
  completedPomodoros,
}: {
  timeLeftInSec: number;
  handleInputChange: (value: number) => void;
  numberOfPomodoros: number;
  completedPomodoros: number;
}) {
  return (
    <div className="timer">
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
  );
}
