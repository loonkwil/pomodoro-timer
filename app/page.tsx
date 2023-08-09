"use client";

import App from "@/app/components/App";

const config = {
  numberOfPomodoros: 4,
  lengths: { pomodoro: 25 * 60 * 1000, break: 5 * 60 * 1000 },
};

export default function Home() {
  return <App {...config} />;
}
