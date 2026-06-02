import React, { useState } from "react";
import { StyleSheet, FlatList, useWindowDimensions } from "react-native";
import { ResultProps } from "@/types/result.types";
import ResultCard from "./ResultCard";

const Result: React.FC<ResultProps> = ({ data }) => {
  const [expanded, setExpanded] = useState<number | null>(null);
  const { width } = useWindowDimensions();

  return (
    <FlatList
      contentContainerStyle={styles.container}
      data={data}
      keyExtractor={(item, index) =>
        item.id ? item.id.toString() : index.toString()
      }
      showsVerticalScrollIndicator={false}
      renderItem={({ item, index }) => (
        <ResultCard
          item={item}
          isExpanded={expanded === index}
          onPress={() => setExpanded(expanded === index ? null : index)}
          width={width}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: { paddingTop: 24, paddingHorizontal: 24, paddingBottom: 40 },
});

export default Result;
