import { usePlayer } from "@/hooks/usePlayer";
import { Button, ButtonText, ButtonGroup } from "@/gluestack/button";
import { Box } from "@/gluestack/box";
import { Text,  } from "@/gluestack/text";
import { AudioPlayerProps } from "@/types/audioPlayer.types";
import { Center } from "@/gluestack/center";

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

  return (
    <Box className="bg-primary mt-4 p-4 rounded-lg">
      <Center>
        <Text size="sm" bold className="text-primary-foreground">Ouvindo {title}</Text>
      </Center>

      <Box >
        <ButtonGroup space="md" flexDirection="row">
          <Center>
            <Button variant="default" onPress={skipBackward} className="bg-primary py-2 px-3 rounded-md">
              <ButtonText className="font-semibold" variant="secondary" size="sm">Retroceder 15s</ButtonText>
            </Button>

            {
              isPlaying ? (
                <Button variant="default" onPress={pauseSound}>
                  <ButtonText>Pausar</ButtonText>
                </Button>
              ) : (
                <Button variant="default" onPress={playSound}>
                  <ButtonText> {position > 0 ? "Continuar" : "Play"} </ButtonText>
                </Button>
              )
            }
          </Center>

          <Button variant="destructive" onPress={skipForward}>
            <ButtonText>Avançar 15s</ButtonText>
          </Button>
        </ButtonGroup>
      </Box>
      <Box className="bg-primary flex-row justify-between mt-3">
        <Text className="text-primary-foreground">{formatTime(position)}</Text>
        <Text className="text-primary-foreground">{formatTime(duration)}</Text>
      </Box>
    </Box>
  );
};

export default AudioPlayer;
