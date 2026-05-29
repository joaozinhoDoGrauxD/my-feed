import React, {ReactNode, useState} from 'react'
import axios from 'axios'
import {Text, TextInput, View, StyleSheet, Button, Platform} from 'react-native'

const API_HOST = Platform.OS === 'android' ? '10.0.2.2' : 'localhost';

const Input = (): ReactNode => {

    const [url, setUrl] = useState('');

    const getData = () => {
      axios.post(`http://${API_HOST}:3000/api/rss`, { url })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
    }

    return (
        <>
        <View style={styles.container}>
            <TextInput style={styles.input} placeholder="Digite a url" 
            onChangeText={setUrl} 
            defaultValue={url}
            />
            <Button  onPress={getData} 
            title="Clique aqui"/>
            <Text style={styles.text}>Teste</Text>
        </View>   
        </>
        
    )
    
}



const styles = StyleSheet.create({
    container: {
        flex: 3,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "green"
    },
    input: {
        backgroundColor: "red"
    },
    text: {
        fontSize: 15,
        color: "yellow"
    },
    button: {
        backgroundColor: "cyan",
        marginTop: 5  
    }

})

export default Input;