import { useCallback } from "react";
import { roundNearest } from "@/app/lib/utils";

export default function RangeInput({
  value,
  min = 0,
  max,
  step = 1,
  precision = 0.001,
  numberOfMarkers = 0,
  onChange,
}: {
  value: number;
  min?: number;
  max: number;
  step?: number;
  precision?: number;
  numberOfMarkers: number;
  onChange: (value: number) => void;
}) {
  const roundedValue = roundNearest(value, precision);

  const handleInput = useCallback(
    (e: React.FormEvent<HTMLInputElement>): void => {
      const inputValue = parseFloat(e.currentTarget.value);
      const nextValue = roundNearest(inputValue, step);
      if (nextValue !== roundedValue) {
        onChange(nextValue);
      }
    },
    [roundedValue, onChange, step],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>): void => {
      let nextValue = roundedValue;
      switch (e.key) {
        case "ArrowLeft":
        case "ArrowDown": {
          nextValue = roundNearest(nextValue, step);
          if (nextValue >= roundedValue) {
            nextValue -= step;
          }
          nextValue = Math.max(nextValue, min);
          break;
        }
        case "ArrowRight":
        case "ArrowUp": {
          nextValue = roundNearest(nextValue, step);
          if (nextValue <= roundedValue) {
            nextValue += step;
          }
          nextValue = Math.min(nextValue, max);
          break;
        }
      }

      if (nextValue !== roundedValue) {
        onChange(nextValue);
      }
    },
    [roundedValue, onChange, min, max, step],
  );

  return (
    <input
      type="range"
      min={min}
      max={max}
      step={precision}
      value={roundedValue}
      onKeyDown={handleKeyDown}
      onInput={handleInput}
      style={{ "--number-of-markers": numberOfMarkers } as React.CSSProperties}
    />
  );
}
