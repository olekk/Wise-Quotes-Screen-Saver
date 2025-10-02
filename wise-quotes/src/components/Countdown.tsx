import { useEffect } from "react";
import { useSettings } from "@/store/store";

export default function Countdown() {
  const { isPlaying, timeLeft, setIsPlaying, setTimeLeft } = useSettings();

  useEffect(() => {
    if (!isPlaying) return;
    if (timeLeft <= 0) {
      setTimeLeft(Math.max(0, useSettings.getState().transitionTime));

      return;
    }
    const interval = setInterval(() => {
      setTimeLeft(Math.max(0, useSettings.getState().timeLeft - 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [isPlaying, timeLeft, setIsPlaying]);

  return <div>{timeLeft / 1000}s</div>;
}
