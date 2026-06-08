import React from "react";
import { View, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { ResultCardImageProps } from "@/types/result.types";

const ResultCardImage: React.FC<ResultCardImageProps> = ({ uri }) => {
  return (
    <View style={styles.containerImage}>
      <Image
        style={styles.remoteImage}
        source={{ uri }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  containerImage: { marginBottom: 16, width: "100%", alignItems: "center" },
  remoteImage: {width: "100%", height: 300, borderRadius: 12 },
});

export default ResultCardImage;
