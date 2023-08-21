import { useEffect, useRef } from "react";

export default function AudioPlayer({
  src,
  isPlaying,
}: {
  src: string;
  isPlaying: boolean;
}) {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const { current: $audio } = audioRef;
    if (!$audio) {
      return;
    }

    if (isPlaying) {
      $audio.play().catch(() => {});
    } else {
      $audio.pause();
    }
  }, [src, isPlaying]);

  return <audio src={src} loop preload="auto" ref={audioRef} />;
}
