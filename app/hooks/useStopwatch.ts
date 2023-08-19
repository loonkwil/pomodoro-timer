import { useEffect, useReducer, useCallback } from "react";

type State = {
  time: number;
  isPlaying: boolean;
  lastChecked: number | null;
};

type Action =
  | { type: "TICK"; payload: { now: number } }
  | { type: "SET_TIME"; payload: { time: number } }
  | { type: "TOGGLE_PLAYING"; payload: { now: number } };

function reducer(state: State, { type, payload }: Action): State {
  switch (type) {
    case "TICK": {
      const { now } = payload;
      const lastChecked = state.lastChecked ?? payload.now;
      const time = state.time + now - lastChecked;
      return { ...state, time, lastChecked: now };
    }
    case "SET_TIME": {
      const { time } = payload;
      return { ...state, time, lastChecked: null, isPlaying: false };
    }
    case "TOGGLE_PLAYING": {
      const { now } = payload;
      const lastChecked = state.lastChecked ?? payload.now;
      const isPlaying = !state.isPlaying;
      const time = isPlaying ? state.time : state.time + now - lastChecked;
      return { ...state, time, isPlaying, lastChecked: now };
    }
    default:
      return state;
  }
}

export default function useStopwatch(interval: number = 1_000): {
  time: number;
  setTime: (time: number) => void;
  isPlaying: boolean;
  togglePlaying: () => void;
} {
  const [state, dispatch] = useReducer(reducer, {
    time: 0,
    isPlaying: false,
    lastChecked: null,
  });

  const setTime = useCallback(
    (time: number) => dispatch({ type: "SET_TIME", payload: { time } }),
    [dispatch],
  );

  const togglePlaying = useCallback(
    () =>
      dispatch({ type: "TOGGLE_PLAYING", payload: { now: performance.now() } }),
    [dispatch],
  );

  useEffect(() => {
    if (!state.isPlaying) {
      return;
    }

    const tick = setInterval(
      () => dispatch({ type: "TICK", payload: { now: performance.now() } }),
      interval,
    );

    return () => clearInterval(tick);
  }, [state.isPlaying, interval]);

  return {
    time: state.time,
    setTime,
    isPlaying: state.isPlaying,
    togglePlaying,
  };
}
