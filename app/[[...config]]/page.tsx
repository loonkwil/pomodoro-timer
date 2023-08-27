import App from "@/app/components/App";
import About from "@/app/components/About";

function parseNumberOfPomodoros(str: string | undefined): number | undefined {
  if (!str) {
    return undefined;
  }

  const value = parseInt(str, 10);
  if (Number.isNaN(value)) {
    return undefined;
  }

  return Math.max(1, value);
}

function parseLength(str: string | undefined): number | undefined {
  if (!str) {
    return undefined;
  }

  const value = parseInt(str, 10);
  if (Number.isNaN(value)) {
    return undefined;
  }

  return Math.max(1, value) * 60 * 1_000;
}

export default function Home({
  params: { config = [] },
}: {
  params: { config?: string[] };
}) {
  const numberOfPomodoros = parseNumberOfPomodoros(config[0]) ?? 4;
  const lengths = {
    pomodoro: parseLength(config[1]) ?? 25 * 60 * 1_000,
    break: parseLength(config[2]) ?? 5 * 60 * 1_000,
  };

  return (
    <>
      <App numberOfPomodoros={numberOfPomodoros} lengths={lengths} />
      <About />
    </>
  );
}
