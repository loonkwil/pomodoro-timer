import { useEffect } from "react";

export default function useShortcut(
  key: string,
  cb: (e: KeyboardEvent) => void,
) {
  useEffect(() => {
    const handler = (e: KeyboardEvent): void => {
      if (key === e.key) {
        cb(e);
      }
    };

    window.addEventListener("keydown", handler);
    return () => {
      window.removeEventListener("keydown", handler);
    };
  }, [key, cb]);
}
