export default function Home() {
  const state = "pomodoro";

  return (
    <div
      className="app-container"
      style={{ "--state": state } as React.CSSProperties}
    >
      <div className="app">
        <time>14:53</time>
        <input type="range" min="0" max="100" step="25" />
      </div>
    </div>
  );
}
