import Link from "next/link";

export default function About() {
  return (
    <article aria-label="How to use this app">
      <p>
        The Pomodoro Timer app is a time management tool designed to boost
        productivity and focus. It operates on the Pomodoro Technique, a proven
        method that breaks work into intervals (typically 25 minutes) followed
        by short breaks.
      </p>

      <p>
        Press <kbd>Space</kbd>, <kbd>Enter</kbd>, or click anywhere to pause or
        start the timer.
      </p>

      <p>
        Hit the <kbd>Escape</kbd> button to stop the current Pomodoro.
      </p>

      <p>
        The little knob on the progress bar is draggable. Drag and drop to jump
        between Pomodoro sessions.
      </p>

      <p>
        You can change the length of the intervals with the following URL
        parameters: <Link href="/4/52/17">/4/52/17</Link> (four 52-minute-long
        Pomodoro sessions with 17-minute breaks).
      </p>
    </article>
  );
}
