import { View, Text, TouchableOpacity } from "react-native";
import { usePlayer } from "@/hooks/usePlayer";
import { AudioPlayerProps } from "@/types/audioPlayer.types";

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
    <View className="mt-4 p-4 bg-[#333333] rounded-lg">
      <Text className="text-white text-sm font-bold mb-3 text-center">Ouvindo: {title}</Text>
      <View className="flex-row justify-center items-center gap-4">
        <TouchableOpacity onPress={skipBackward} className="py-2 px-3 bg-[#444] rounded-md">
          <Text className="text-white text-sm font-semibold">Voltar 15s</Text>
        </TouchableOpacity>

        {isPlaying ? (
          <TouchableOpacity
            onPress={pauseSound}
            className="py-2.5 px-5 bg-[#6c63ff] rounded-md"
          >
            <Text className="text-white text-sm font-semibold">Pausar</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={playSound} className="py-2.5 px-5 bg-purple-600 rounded-md">
            <Text className="text-white text-sm font-semibold">
              {position > 0 ? "Continuar" : "Play"}
            </Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity onPress={skipForward} className="py-2 px-3 bg-[#444] rounded-md">
          <Text className="text-white text-sm font-semibold">Avançar 15s</Text>
        </TouchableOpacity>
      </View>
      <View className="flex-row justify-between mt-3">
        <Text className="text-[#aaa] text-xs">{formatTime(position)}</Text>
        <Text className="text-[#aaa] text-xs">{formatTime(duration)}</Text>
      </View>
    </View>
  );
};

export default AudioPlayer;
