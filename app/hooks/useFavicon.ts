import { useEffect, useRef } from "react";

export default function useFavicon(iconUrl: string) {
  const iconRef = useRef<Element | null>(null);

  useEffect(() => {
    const $link = document.querySelector("link[rel='icon']");
    iconRef.current = $link;
  }, []);

  if (iconRef.current) {
    iconRef.current.setAttribute("href", iconUrl);
  }
}
