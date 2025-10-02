import { useEffect } from "react";
import { useSettings } from "@/store/store";

const msToHMS = (ms: number) => {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${hours}h : ${minutes}m : ${seconds}s `;
};

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

  return <div>{msToHMS(timeLeft)}</div>;
}
