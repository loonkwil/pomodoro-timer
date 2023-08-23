"use client";

export default function Error({ error }: { error: Error }) {
  return (
    <>
      <h2>Something went wrong!</h2>
      <p className="error-msg">{error.message}</p>
    </>
  );
}
