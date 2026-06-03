import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { ResultCardImageProps } from "@/types/result.types";

const ResultCardImage: React.FC<ResultCardImageProps> = ({ uri }) => {
  return (
    <View style={styles.containerImage}>
      <Image style={styles.remoteImage} source={{ uri }} resizeMode="cover" />
    </View>
  );
};

const styles = StyleSheet.create({
  containerImage: { marginBottom: 16, width: "100%" },
  remoteImage: { width: "100%", height: 200, borderRadius: 12 },
});

export default ResultCardImage;
