import React from 'react'
import {
  View, Text, TouchableOpacity, StyleSheet, Dimensions,
} from 'react-native'
import { Fonts } from '../../assets/styles'

const { width } = Dimensions.get('window')
const screenScale = width / 375
const MainScreen = (props) => {
  const { navigation } = props
  return (
    <View style={styles.container}>
      {/* <TouchableOpacity
        onPress={() => navigation.navigate('DoneScreen')}
      >
        <Text style={{
          ...Fonts.fontBold,
        }}
        >
          Todo App
        </Text>
      </TouchableOpacity> */}
      <Text style={{
        ...Fonts.fontBold,
        marginTop: 38,
        textAlign: 'center',

      }}
      >
        Todo App
      </Text>
      <View style={{ alignItems: 'center' }}>
        <View
          style={{
            width: 340,
            height: 50,
            borderRadius: 25,
            backgroundColor: '#B01EFF',
            marginTop: 26,

          }}
        />
        <View
          style={{
            width: 340,
            height: 50,
            borderRadius: 25,
            backgroundColor: '#B01EFF',
            marginTop: 26,

          }}
        />
        <View
          style={{
            width: 340,
            height: 50,
            borderRadius: 25,
            backgroundColor: '#B01EFF',
            marginTop: 26,

          }}
        />
        <View
          style={{
            width: 340,
            height: 50,
            borderRadius: 25,
            backgroundColor: '#B01EFF',
            marginTop: 26,

          }}
        />
      </View>
    </View>
  )
}
export default MainScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: 'brown',
  },

})
