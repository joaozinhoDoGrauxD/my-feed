import { useAudioPlayer, useAudioPlayerStatus } from "expo-audio";

export const usePlayerService = (url: string) => {
  const player = useAudioPlayer(url);
  const status = useAudioPlayerStatus(player);

  const isPlaying = status.playing;
  const position = status.currentTime;
  const duration = status.duration || 0;

  const playSound = () => player.play();
  const pauseSound = () => player.pause();
  const skipBackward = () => player.seekTo(Math.max(0, position - 15));
  const skipForward = () => player.seekTo(Math.min(duration, position + 15));

  const formatTime = (seconds: number) => {
    if (!seconds || isNaN(seconds)) return "0:00";
    const totalSeconds = Math.floor(seconds);
    const minutes = Math.floor(totalSeconds / 60);
    const hours = Math.floor(minutes/ 60)
    const remainingMinutes = minutes % 60;
    const remainingSeconds = totalSeconds % 60;
    return `${hours}:${remainingMinutes < 10 ? "0" : ""}${remainingMinutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return {
    isPlaying,
    position,
    duration,
    playSound,
    pauseSound,
    skipBackward,
    skipForward,
    formatTime,
  };
};
