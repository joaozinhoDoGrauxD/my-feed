import React, { ReactNode } from 'react'
import {Text, View, StyleSheet} from 'react-native'

const Hello = (props: any): ReactNode => {
    return(

    <View style={styles.container}>
        <Text style={styles.text}>Hello, my name is {props.name}</Text>
    </View>

    )
}

const styles = StyleSheet.create({
  container: {
    flex: 5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black"
  },
  text: {
    fontSize: 30,
    color: "green"
  }
});

export default Hello;