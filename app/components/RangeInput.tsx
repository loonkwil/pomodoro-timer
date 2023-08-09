import { roundNearest } from "@/app/lib/utils";

export default function RangeInput({
  value,
  min = 0,
  max,
  step = 1,
  numberOfMarkers = 0,
  onChange,
}: {
  value: number;
  min?: number;
  max: number;
  step?: number;
  numberOfMarkers: number;
  onChange: (value: number) => void;
}) {
  function handleInput(e: React.FormEvent<HTMLInputElement>): void {
    const inputValue = parseFloat(e.currentTarget.value);
    const nextValue = roundNearest(inputValue, step);
    if (nextValue !== value) {
      onChange(nextValue);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>): void {
    let nextValue = value;
    switch (e.key) {
      case "ArrowLeft":
      case "ArrowDown": {
        nextValue = roundNearest(nextValue, step);
        if (nextValue >= value) {
          nextValue -= step;
        }
        nextValue = Math.max(nextValue, min);
        break;
      }
      case "ArrowRight":
      case "ArrowUp": {
        nextValue = roundNearest(nextValue, step);
        if (nextValue <= value) {
          nextValue += step;
        }
        nextValue = Math.min(nextValue, max);
        break;
      }
    }

    if (nextValue !== value) {
      onChange(nextValue);
    }
  }

  return (
    <input
      type="range"
      min={min}
      max={max}
      step={0.001}
      value={value}
      onKeyDown={handleKeyDown}
      onInput={handleInput}
      style={{ "--number-of-markers": numberOfMarkers } as React.CSSProperties}
    />
  );
}
