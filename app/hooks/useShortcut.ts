import { useEffect, useRef } from "react";

type Callback = (e: KeyboardEvent) => void;
type Shortcuts = { [key: string]: Callback };

export default function useShortcut(shortcuts: Shortcuts) {
  const ref = useRef<Shortcuts | null>(null);
  ref.current = shortcuts;

  useEffect(() => {
    const handler = (e: KeyboardEvent): void => {
      const cb = ref.current?.[e.key] as Callback | undefined;
      if (!e.altKey && cb) {
        e.preventDefault();
        cb(e);
      }
    };

    window.addEventListener("keydown", handler);
    return () => {
      window.removeEventListener("keydown", handler);
    };
  }, []);
}
