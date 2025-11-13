import { useEffect } from "react";
import { useSettings } from "@/store/store";
import { Box } from "@mui/material";

const msToHMS = (ms: number) => {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return { h: hours, m: minutes, s: seconds };
};

const StyledButton = ({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) => (
  <button
    onClick={onClick}
    style={{
      backgroundColor: "white",
      color: "black",
      borderRadius: 2,
      height: 18,
      width: 18,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 24,
    }}
  >
    {children}
  </button>
);

export default function Countdown() {
  const {
    isPlaying,
    setIsPlaying,
    timeLeft,
    setTimeLeft,
    transitionTime,
    setTransitionTime,
  } = useSettings();

  useEffect(() => {
    if (!isPlaying) return;
    if (timeLeft <= 0) {
      setTimeLeft(Math.max(0, transitionTime));
      return;
    }
    const interval = setInterval(() => {
      setTimeLeft(Math.max(0, timeLeft - 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [isPlaying, timeLeft, setIsPlaying]);

  const increaseH = () => {
    setTransitionTime(timeLeft + 3600000);
  };
  const decreaseH = () => {
    setTransitionTime(Math.max(0, timeLeft - 3600000));
  };
  const increaseM = () => {
    setTransitionTime(timeLeft + 60000);
  };
  const decreaseM = () => {
    setTransitionTime(Math.max(0, timeLeft - 60000));
  };
  const increaseS = () => {
    setTransitionTime(timeLeft + 1000);
  };
  const decreaseS = () => {
    setTransitionTime(Math.max(0, timeLeft - 1000));
  };

  return (
    <Box sx={{ display: "flex", gap: 1 }}>
      <div>
        <StyledButton onClick={increaseH}>+</StyledButton>
        <div>{msToHMS(timeLeft).h}h :</div>
        <StyledButton onClick={decreaseH}>-</StyledButton>
      </div>
      <div>
        <StyledButton onClick={increaseM}>+</StyledButton>
        <div>{msToHMS(timeLeft).m}m :</div>
        <StyledButton onClick={decreaseM}>-</StyledButton>
      </div>
      <div>
        <StyledButton onClick={increaseS}>+</StyledButton>
        <div>{msToHMS(timeLeft).s}s</div>
        <StyledButton onClick={decreaseS}>-</StyledButton>
      </div>
    </Box>
  );
}
