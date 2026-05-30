import React, {ReactNode, useState} from 'react'
import axios from 'axios'
import {TextInput, View, StyleSheet, Button, Platform} from 'react-native'
import Result from './Result';
const API_HOST = Platform.OS === 'android' ? '10.0.2.2' : 'localhost';

const Input = (): ReactNode => {

    const [url, setUrl] = useState('');
    const [items, setItems] = useState<any[]>([]);

    const fetchItems = async () => {
      try {
        const response = await axios.post(`http://${API_HOST}:3000/api/rss`, 
          { url }, {
          headers: {
    'Content-Type': 'application/json; charset=UTF-8'
         }
         });
        setItems(response.data.items);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

   
    return (
        <>
          <View style={styles.container}>
            <TextInput
              style={styles.input}
              placeholder="Cole a URL do feed RSS..."
              placeholderTextColor="#555"
              onChangeText={setUrl}
              defaultValue={url}
            />
            <Button onPress={fetchItems} title="Buscar feed" color="#6c63ff" />
            <Result data={items}/>
        </View>
        </>     
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 60,
        paddingHorizontal: 20,
        backgroundColor: "#0f0f0f",
    },
    input: {
        backgroundColor: "#1e1e1e",
        color: "#ffffff",
        borderRadius: 10,
        paddingHorizontal: 14,
        paddingVertical: 10,
        fontSize: 14,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: "#333",
    },
    button: {
        marginTop: 4,
    }
})

export default Input;
