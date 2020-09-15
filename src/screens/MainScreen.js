import React, { useState } from 'react'
import {
  View, Text, TouchableOpacity, StyleSheet, Dimensions,
} from 'react-native'
import { TabView, SceneMap } from 'react-native-tab-view'
import { useSelector, useDispatch } from 'react-redux'
import { Fonts } from '../../assets/styles'

const { width } = Dimensions.get('window')
const screenScale = width / 375
const intialLayout = { width }

const MainScreen = (props) => {
  const dispatch = useDispatch()
  const todos = useSelector((state) => state)
  const { navigation } = props

  const [currentTabIndex, setCurrentTabIndex] = useState(0)

  const AllToDoScreen = () => {
    return (
      <View style={{ flex: 1 }}>
        <Text>All To Do Screen</Text>
      </View>
    )
  }
  const DoneScreen = () => {
    return (
      <View style={{ flex: 1 }}>
        <Text>Done Screen</Text>
      </View>
    )
  }
  const ArchiveScreen = () => {
    return (
      <View style={{ flex: 1 }}>
        <Text> Archive Screen</Text>
      </View>
    )
  }
  const renderScene = SceneMap({
    all: AllToDoScreen,
    done: DoneScreen,
    archive: ArchiveScreen,
  })

  return (
    <View style={styles.container}>
      <TabView
        intialLayout={intialLayout}
        navigationState={{
          index: currentTabIndex,
          routes: [
            { key: 'all', title: 'All' },
            { key: 'done', title: 'Done' },
            { key: 'archive', title: 'Archive' },
          ],
        }}
        onIndexChange={setCurrentTabIndex}
        renderScene={renderScene}
      />

    </View>
  )
}
export default MainScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },

})
