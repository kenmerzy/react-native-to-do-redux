import React, { useState } from 'react'
import {
  View, Text, TouchableOpacity, StyleSheet, Dimensions, Image,
} from 'react-native'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view'
import { useSelector, useDispatch } from 'react-redux'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FlatList } from 'react-native-gesture-handler'
import { Fonts, Colors } from '../../assets/styles'
import { imgAdd, imgSend, imgDelete } from '../../assets/images'
import { addNewTodo, deleteTodo } from '../../redux/action'

const { width } = Dimensions.get('window')
const screenScale = width / 375
const intialLayout = { width }

const MainScreen = (props) => {
  const dispatch = useDispatch()
  const todos = useSelector((state) => state)
  const { navigation } = props

  const [currentTabIndex, setCurrentTabIndex] = useState(0)

  const handleDeletePress = (itemDelete) => {
    dispatch(deleteTodo(itemDelete))
  }
  const handleMarkedDoneTodo = () => {

  }

  const NewToDoComponent = () => {
    return (
      <View style={{ flex: 1 }}>
        <Text>New to do Screen</Text>
      </View>
    )
  }
  const AllToDoComponent = () => {
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={todos.currentTodo}
          keyExtractor={(item, index) => `RenderAllComponent${index}`}
          renderItem={({ item }) => {
            return (
              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 22 * screenScale,
              }}
              >
                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
                >
                  <TouchableOpacity onPress={handleMarkedDoneTodo}>
                    <View
                      style={{
                        width: 18 * screenScale,
                        height: 18 * screenScale,
                        borderRadius: 9 * screenScale,
                        borderColor: Colors.gray,
                        borderWidth: 3 * StyleSheet.hairlineWidth,
                        marginRight: 14 * screenScale,

                      }}
                    />
                  </TouchableOpacity>
                  <Text
                    style={{
                      ...Fonts.semiBold,
                      fontSize: 18,
                      color: Colors.black,
                    }}
                  >
                    {item}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => { handleDeletePress(item) }}
                >
                  <Image
                    source={imgDelete}
                    style={{
                      width: 24 * screenScale,
                      height: 24 * screenScale,
                    }}
                    resizeMode="contain"
                  />
                </TouchableOpacity>

              </View>
            )
          }}
        />
        <SafeAreaView />
      </View>

    )
  }
  const DoneComponent = () => {
    return (
      <View style={{ flex: 1 }}>
        <Text> Done Screen </Text>
      </View>
    )
  }
  const renderScene = SceneMap({
    new: NewToDoComponent,
    all: AllToDoComponent,
    done: DoneComponent,
  })

  return (
    <View style={styles.container}>
      <Text style={{
        ...Fonts.bold,
        fontSize: 40 * screenScale,
        color: Colors.black,
        paddingLeft: 3 * screenScale,
        marginTop: 46 * screenScale,
        marginBottom: 22 * screenScale,
      }}
      >
        Todo
      </Text>
      <TabView
        intialLayout={intialLayout}
        navigationState={{
          index: currentTabIndex,
          routes: [
            { key: 'new', title: 'New' },
            { key: 'all', title: 'All' },
            { key: 'done', title: 'Done' },
          ],
        }}
        onIndexChange={setCurrentTabIndex}
        renderScene={renderScene}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: Colors.darkBlue }}
            style={{ backgroundColor: Colors.white }}
            renderLabel={({ route, focused, color }) => (
              <Text style={{
                color: focused ? Colors.darkBlue : Colors.black,
                ...Fonts.semiBold,
                fontSize: 18,
                textTransform: 'uppercase',
              }}
              >
                {route.title}
              </Text>
            )}
          />
        )}
      />
    </View>
  )
}
export default MainScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 36 * screenScale,
    backgroundColor: Colors.white,
  },

})
