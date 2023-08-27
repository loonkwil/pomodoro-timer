"use client";

export default function Error({ error }: { error: Error }) {
  return (
    <article>
      <h2>Something went wrong!</h2>
      <pre>{error.message}</pre>
    </article>
  );
}
