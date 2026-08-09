import { usePlayer } from "@/hooks/usePlayer";
import { Button } from "@/gluestack/button";
import { Box } from "@/gluestack/box";
import { Text } from "@/gluestack/text";
import { Icon } from "@/gluestack/icon";
import { AudioPlayerProps } from "@/types/audioPlayer.types";
import { Play, Pause, RotateCcw, RotateCw, Headphones } from "lucide-react-native";

const AudioPlayer = ({ url, title }: AudioPlayerProps) => {
  const {
    playSound,
    pauseSound,
    skipBackward,
    skipForward,
    formatTime,
    isPlaying,
    position,
    duration,
  } = usePlayer(url);

  const progressPercent = duration > 0 ? (position / duration) * 100 : 0;

  return (
    <Box className="bg-card border border-border/60 mt-4 p-5 rounded-2xl shadow-sm">
      {/* Title & Icon Header */}
      <Box className="flex-row items-center gap-2 mb-3">
        <Icon as={Headphones} className="text-primary w-4 h-4" />
        <Text size="sm" className="text-foreground font-semibold flex-1" numberOfLines={1}>
          Ouvindo: {title}
        </Text>
      </Box>

      {/* Progress Bar */}
      <Box className="w-full bg-muted h-1.5 rounded-full mt-2 mb-1.5 overflow-hidden">
        <Box style={{ width: `${progressPercent}%` }} className="bg-primary h-full rounded-full" />
      </Box>

      {/* Time Indicators */}
      <Box className="flex-row justify-between mb-2">
        <Text size="xs" className="text-muted-foreground font-medium">{formatTime(position)}</Text>
        <Text size="xs" className="text-muted-foreground font-medium">{formatTime(duration)}</Text>
      </Box>

      {/* Controls */}
      <Box className="flex-row items-center justify-center gap-6 mt-2">
        <Button
          onPress={skipBackward}
          className="bg-secondary hover:bg-secondary/80 rounded-full w-10 h-10 justify-center items-center border border-border/40"
        >
          <Icon size="xl" as={RotateCcw} className="text-secondary-foreground w-4.5 h-4.5" />
        </Button>

        {isPlaying ? (
          <Button
            onPress={pauseSound}
            className="bg-primary hover:bg-primary/90 rounded-full w-12 h-12 justify-center items-center shadow-md active:scale-95 transition-transform"
          >
            <Icon as={Pause} className="text-primary-foreground w-5 h-5" />
          </Button>
        ) : (
          <Button
            onPress={playSound}
            className="bg-primary hover:bg-primary/90 rounded-full w-12 h-12 justify-center items-center shadow-md active:scale-95 transition-transform"
          >
            <Icon as={Play} className="text-primary-foreground w-5 h-5 ml-0.5" />
          </Button>
        )}

        <Button
          onPress={skipForward}
          className="bg-secondary hover:bg-secondary/80 rounded-full w-10 h-10 justify-center items-center border border-border/40"
        >
          <Icon size="xl" as={RotateCw} className="text-secondary-foreground w-4.5 h-4.5" />
        </Button>
      </Box>
    </Box>
  );
};

export default AudioPlayer;
