import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, FlatList, useWindowDimensions } from 'react-native';
import RenderHtml from 'react-native-render-html';

const hasHTML = (str: string) => /<\/?[a-z][\s\S]*>/i.test(str);


const htmlBaseStyle = {
    color: '#d1d1d1',
    fontSize: 14,
    lineHeight: 22,
};


interface Article {
    
    id?: string; 
    title: string;
    description: string;
    content?: string;
    authors?: { name: string }[];
    published?: string;
}

interface ResultProps {
    data: Article[];
}


const Result: React.FC<ResultProps> = ({ data }) => {
    const [expanded, setExpanded] = useState<number | null>(null);
    const { width } = useWindowDimensions();

    return (
        <FlatList
            contentContainerStyle={styles.container}
            data={data}
           
            keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => (
                <View style={styles.card}>
                    <TouchableOpacity 
                        activeOpacity={0.7} 
                        onPress={() => setExpanded(expanded === index ? null : index)}
                        style={styles.headerArea}
                    >
                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.meta}>
                            {item.authors?.[0]?.name || 'Autor Desconhecido'} • {item.published?.split('T')[0]}
                        </Text>
                    </TouchableOpacity>

                    {expanded === index && (
                        <View style={styles.descriptionBox}>
                            {hasHTML(item.description) ? (
                                <RenderHtml 
                                    contentWidth={width - 60}
                                    source={{ html: item.description }} 
                                    baseStyle={htmlBaseStyle} 
                                />
                            ) : (
                                <Text style={styles.description}>{item.description}</Text>
                            )}

                            {item.content !== undefined && hasHTML(item.content) && (
                                <View style={styles.contentDivider}>
                                    <RenderHtml 
                                        contentWidth={width - 90} 
                                        source={{ html: item.content }} 
                                        baseStyle={htmlBaseStyle} 
                                    />
                                </View>
                            )}
                        </View>
                    )}
                </View>
            )}
        />
    );
};

const styles = StyleSheet.create({
   
    container: { paddingTop: 24, paddingHorizontal: 16, paddingBottom: 40 },
    card: { backgroundColor: "#1e1e1e", borderRadius: 12, marginBottom: 16, borderLeftWidth: 4, borderLeftColor: "#6c63ff", boxShadow: "0px 4px 5px rgba(0, 0, 0, 0.3)", elevation: 6 },
    headerArea: { padding: 16 },
    title: { fontSize: 16, color: "#ffffff", fontWeight: "700", marginBottom: 6, lineHeight: 22 },
    meta: { fontSize: 12, color: "#9ca3af", fontWeight: "500", textTransform: "uppercase", letterSpacing: 0.5 },
    descriptionBox: { padding: 16, backgroundColor: "#252526", borderBottomLeftRadius: 12, borderBottomRightRadius: 12, borderTopWidth: 1, borderTopColor: "#333333" },
    description: { fontSize: 14, color: "#d1d1d1", lineHeight: 22 },
    contentDivider: { marginTop: 12, paddingTop: 12, borderTopWidth: 1, borderTopColor: "#333333" }
});

export default Result;