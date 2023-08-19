import { useEffect, useRef } from "react";

export default function AudioPlayer({
  src,
  isPlaying,
}: {
  src: string;
  isPlaying: boolean;
}) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const $audio = new Audio();
    $audio.setAttribute("loop", "");
    $audio.setAttribute("preload", "auto");

    audioRef.current = $audio;

    return () => $audio.pause();
  }, []);

  useEffect(() => {
    const { current: $audio } = audioRef;
    if (!$audio) {
      return;
    }

    $audio.setAttribute("src", src);

    if (isPlaying) {
      $audio.play().catch(() => {});
    } else {
      $audio.pause();
    }
  }, [src, isPlaying]);

  return null;
}
