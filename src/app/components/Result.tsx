import React, { ReactNode, useState } from 'react'
import {View, StyleSheet, Text, TouchableOpacity, FlatList, useWindowDimensions} from 'react-native'
import RenderHtml from 'react-native-render-html';
const hasHTML = (str: string) => /<\/?[a-z][\s\S]*>/i.test(str);

const stripHtml = (html: string): string =>
          html
              .replace(/<[^>]*>/g, '')
              .replace(/&nbsp;/g, ' ')
              .replace(/&amp;/g, '&')
              .replace(/&lt;/g, '<')
              .replace(/&gt;/g, '>')
              .replace(/&quot;/g, '"')
              .replace(/&#39;/g, "'")
              .trim();

const Result = (props: any) : ReactNode => {
    const [expanded, setExpanded] = useState<number | null>(null);
    const {width} = useWindowDimensions()
    return (
        <FlatList
            style={styles.container}
            data={props.data}
            keyExtractor={(_item, index) => index.toString()}
            renderItem={({ item, index }) => (
                <View style={styles.card}>
                    <TouchableOpacity onPress={() => setExpanded(expanded === index ? null : index)}>
                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.meta}>{item.authors[0]?.name} · {item.published?.split('T')[0]}</Text>
                    </TouchableOpacity>

                    {expanded === index && (
                        <View style={styles.descriptionBox}>
                          {hasHTML(item.description) ? 
                          ( <RenderHtml  contentWidth={width} source={{ html: item.description }}/>) 
                          : (<Text style={styles.description}>{item.description}</Text>) }        
                        </View>
                    )}
                </View>
            )}
        />
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 24,
    },
    card: {
        backgroundColor: "#1e1e1e",
        borderRadius: 10,
        padding: 14,
        marginBottom: 12,
        borderLeftWidth: 4,
        borderLeftColor: "#6c63ff",
    },
    title: {
        fontSize: 15,
        color: "#ffffff",
        fontWeight: "700",
        marginBottom: 4,
    },
    meta: {
        fontSize: 11,
        color: "#6c63ff",
        fontWeight: "500",
    },
    descriptionBox: {
        marginTop: 12,
        padding: 12,
        backgroundColor: "#ddd6d6",
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#2e2e2e",
    },
    description: {
        fontSize: 13,
        color: "#0e0d0d",
        lineHeight: 22,
    },
})

export default Result;