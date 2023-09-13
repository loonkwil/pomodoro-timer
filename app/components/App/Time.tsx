import { formatTime } from "@/app/lib/utils";

export default function Time({ timeLeft }: { timeLeft: number }) {
  return <time role="timer">{formatTime(timeLeft)}</time>;
}
