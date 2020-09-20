import React, { useState, useRef } from 'react'
import {
  View, Text, TouchableOpacity, StyleSheet, Dimensions, Image, Animated,
} from 'react-native'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view'
import { useSelector, useDispatch } from 'react-redux'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FlatList, TextInput } from 'react-native-gesture-handler'
import { Fonts, Colors } from '../../assets/styles'
import { imgAdd, imgSend, imgDelete } from '../../assets/images'
import { addNewTodo, deleteTodo, markedTodo } from '../../redux/action'

const { width } = Dimensions.get('window')
const screenScale = width / 375
const intialLayout = { width }

const MainScreen = (props) => {
  const dispatch = useDispatch()
  const todos = useSelector((state) => state)
  console.log('================================================')
  console.log('todos', todos)
  console.log('================================================')
  const { navigation } = props

  const [currentTabIndex, setCurrentTabIndex] = useState(0)

  const NewToDoComponent = () => {
    return (
      <View style={{ flex: 1 }}>
        <Text>New to do Screen</Text>
      </View>
    )
  }
  const AllToDoComponent = () => {
    const [isTextInputReady, setIsTextInputReady] = useState(false)
    const [textInputValue, setTextInputValue] = useState('')
    const handleDeletePress = (itemDelete) => {
      dispatch(deleteTodo(itemDelete))
    }
    const handleMarkedDoneTodo = (itemMark) => {
      dispatch(markedTodo(itemMark))
    }

    const textInputAnimation = useRef(new Animated.Value(0)).current

    const handleShowTextInput = () => {
      Animated.spring(textInputAnimation, {
        toValue: 1,
        tension: 150,
        useNativeDriver: true,
      }).start()

      setIsTextInputReady(true)
    }

    const handleAddTodo = (itemAdd) => {
      dispatch(addNewTodo(itemAdd))
    }
    const tranX = textInputAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [-300, 0],
    })

    console.tron.log({
      // eslint-disable-next-line react/destructuring-assignment
      isTextInputReady,
      textInputValue,
    })

    return (
      <View
        style={{ flex: 1 }}
      >
        <FlatList
          showsVerticalScrollIndicator={false}
          data={todos.currentTodo}
          keyExtractor={(item, index) => `RenderAllComponent${index}`}
          renderItem={({ item }) => {
            return (
              <View style={styles.itemFlatList}>
                <View style={styles.viewMarkedAndTitle}>
                  <TouchableOpacity onPress={() => handleMarkedDoneTodo(item)}>
                    <View
                      style={styles.viewMarked}
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
                    style={styles.imageDelete}
                    resizeMode="contain"
                  />
                </TouchableOpacity>

              </View>
            )
          }}
        />
        <View
          style={styles.viewBorderInput}
        >
          <Animated.View
            style={[styles.viewTextInput, {
              transform: [{
                translateX: tranX,
              }],
            }]}
          >
            <TextInput
              style={{
                ...Fonts.semiBold,
                fontSize: 14,
                color: Colors.white,
                alignItems: 'center',
                backgroundColor: 'transparent',

              }}
              placeholder="Todo..."
              placeholderTextColor={Colors.white}
              onChangeText={(textInput) => { setTextInputValue(textInput) }}
              value={textInputValue}
            // returnKeyType="google"
            />
          </Animated.View>
          <TouchableOpacity
            onPress={isTextInputReady ? () => { handleAddTodo(textInputValue) } : handleShowTextInput}
          >
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: Colors.lightBlue,
                alignItems: 'center',
                justifyContent: 'center',

              }}
            >
              <Image
                source={isTextInputReady ? imgSend : imgAdd}
                style={{
                  width: 24,
                  height: 24,
                }}
                resizeMode="contain"
              />
            </View>
          </TouchableOpacity>
        </View>
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
        marginBottom: 10 * screenScale,
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
                ...Fonts.semiBold,
                fontSize: 18,
                textTransform: 'uppercase',
                color: focused ? Colors.darkBlue : Colors.gray,
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
  itemFlatList: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 22 * screenScale,
  },
  viewMarked: {
    width: 18 * screenScale,
    height: 18 * screenScale,
    borderRadius: 9 * screenScale,
    borderColor: Colors.gray,
    borderWidth: 3 * StyleSheet.hairlineWidth,
    marginRight: 14 * screenScale,

  },
  viewMarkedAndTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageDelete: {
    width: 24 * screenScale,
    height: 24 * screenScale,
  },
  viewBorderInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  viewTextInput: {
    width: 250,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.lightBlue,
    paddingLeft: 20,

  },

})
