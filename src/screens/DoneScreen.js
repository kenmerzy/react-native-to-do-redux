import React from 'react'
import {
  View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Dimensions,
} from 'react-native'

const { width } = Dimensions.get('window')
const screenScale = width / 375
const DoneScreen = (props) => {
  const { navigation } = props
  return (
    <View style={styles.container}>
      <SafeAreaView />
      <TouchableOpacity
        onPress={() => navigation.goBack()}
      >
        <Text>
          Done Screen
        </Text>
      </TouchableOpacity>

    </View>
  )
}
export default DoneScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },

})
