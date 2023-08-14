import { useEffect, useReducer, useCallback } from "react";

type State = {
  time: number;
  isPlaying: boolean;
  lastChecked: number | null;
};

type Action =
  | { type: "TICK"; payload: { now: number } }
  | { type: "SET_TIME"; payload: { time: number } }
  | { type: "SET_PLAYING"; payload: { isPlaying: boolean; now: number } };

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
    case "SET_PLAYING": {
      const { isPlaying, now } = payload;
      const lastChecked = state.lastChecked ?? payload.now;
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
  setPlaying: (isPlaying: boolean) => void;
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

  const setPlaying = useCallback(
    (isPlaying: boolean) =>
      dispatch({
        type: "SET_PLAYING",
        payload: { isPlaying, now: performance.now() },
      }),
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

  return { time: state.time, setTime, isPlaying: state.isPlaying, setPlaying };
}
