import React, {ReactNode} from 'react'
import {Text, View, StyleSheet} from 'react-native'

const Header = (): ReactNode => {

return (
<View style={styles.header}>
        <Text style={styles.headerTitle}>My Feed</Text>
        <Text style={styles.headerSub}>Agregador de RSS</Text>
      </View>
)
}

const styles = StyleSheet.create({
 header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#1e1e1e",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#ffffff",
    letterSpacing: 0.5,
  },
  headerSub: {
    fontSize: 12,
    color: "#6c63ff",
    marginTop: 2,
  },

})

export default Header;