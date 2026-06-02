import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { usePlayerService } from "@/hooks/usePlayer";
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
  } = usePlayerService(url);
  return (
    <View style={playerStyles.container}>
      <Text style={playerStyles.title}>Ouvindo: {title}</Text>
      <View style={playerStyles.controls}>
        <TouchableOpacity onPress={skipBackward} style={playerStyles.button}>
          <Text style={playerStyles.buttonText}>Voltar 15s</Text>
        </TouchableOpacity>

        {isPlaying ? (
          <TouchableOpacity
            onPress={pauseSound}
            style={playerStyles.playButton}
          >
            <Text style={playerStyles.buttonText}>Pausar</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={playSound} style={playerStyles.playButton}>
            <Text style={playerStyles.buttonText}>
              {position > 0 ? "Continuar" : "Play"}
            </Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity onPress={skipForward} style={playerStyles.button}>
          <Text style={playerStyles.buttonText}>Avançar 15s</Text>
        </TouchableOpacity>
      </View>
      <View style={playerStyles.progress}>
        <Text style={playerStyles.timeText}>{formatTime(position)}</Text>
        <Text style={playerStyles.timeText}>{formatTime(duration)}</Text>
      </View>
    </View>
  );
};

const playerStyles = StyleSheet.create({
  container: {
    marginTop: 16,
    padding: 16,
    backgroundColor: "#333333",
    borderRadius: 8,
  },
  title: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },
  controls: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "#444",
    borderRadius: 6,
  },
  playButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#6c63ff",
    borderRadius: 6,
  },
  buttonText: { color: "#fff", fontSize: 14, fontWeight: "600" },
  progress: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
  timeText: { color: "#aaa", fontSize: 12 },
});

export default AudioPlayer;
