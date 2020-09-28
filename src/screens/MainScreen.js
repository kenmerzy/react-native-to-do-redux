import React, { useState, useRef, useEffect } from 'react'
import {
  View, Text, TouchableOpacity, StyleSheet, Dimensions, Image, Animated,
  Platform, Modal,
} from 'react-native'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view'
import { useSelector, useDispatch } from 'react-redux'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FlatList, TextInput } from 'react-native-gesture-handler'
import { KeyboardSpacer } from 'react-native-keyboard-spacer'
import { Fonts, Colors } from '../../assets/styles'
import { imgAdd, imgSend, imgDelete } from '../../assets/images'
import {
  addNewTodo, deleteTodoNew, deleteTodoDone, markedTodo,
} from '../../redux/action'

const { width } = Dimensions.get('window')
const screenScale = width / 375
const intialLayout = { width }

const MainScreen = (props) => {
  const dispatch = useDispatch()
  const todos = useSelector((state) => state)
  const [currentTabIndex, setCurrentTabIndex] = useState(0)
  const [itemDelete, setItemDelete] = useState('')
  const [isDelete, setIsDelete] = useState(false)
  useEffect(() => {
    handleDeleteItem(itemDelete)
  }, [isDelete])
  const [isModalConfirmDeleteShow, setIsModalConfirmDeleteShow] = useState(false)
  const [showSafeAreaView, setShowSafeAreaView] = useState(false)

  // const { navigation } = props

  const handleDeleteItem = (itemD) => {
    if (isDelete) {
      if (itemD.isDone) {
        dispatch(deleteTodoDone(itemD))
      } else {
        dispatch(deleteTodoNew(itemD))
      }
      setIsDelete(false)
      // setIsModalConfirmDeleteShow(false)
    }
  }

  const NewToDoComponent = () => {
    const [isTextInputReady, setIsTextInputReady] = useState(false)
    const [textInputValue, setTextInputValue] = useState('')

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
      isDelete,
      itemDeleteBegin: itemDelete,
    })

    return (
      <View
        style={styles.wrapperTab}
      >
        <FlatList
          showsVerticalScrollIndicator={false}
          data={todos.currentTodo}
          keyExtractor={(item, index) => `RenderNewComponent${index}`}
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
                    style={styles.textTitleBlack}
                  >
                    {item.title}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    setItemDelete(item)
                    setIsModalConfirmDeleteShow(true)
                  }}
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
              style={styles.textInputAdd}
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
              style={styles.viewImageAdd}
            >
              <Image
                source={isTextInputReady ? imgSend : imgAdd}
                style={styles.imageAdd}
                resizeMode="contain"
              />
            </View>
          </TouchableOpacity>
        </View>
        {Platform.OS === 'ios' && <KeyboardSpacer onToggle={(state) => { setShowSafeAreaView(!state) }} />}
        {showSafeAreaView && <SafeAreaView />}
      </View>

    )
  }
  const AllToDoComponent = () => {
    return (
      <View
        style={styles.wrapperTab}
      >
        <FlatList
          showsVerticalScrollIndicator={false}
          data={[...todos.currentTodo, ...todos.markedDoneTodo]}
          keyExtractor={(item, index) => `RenderAllComponent${index}`}
          renderItem={({ item }) => {
            return (
              <View style={styles.itemFlatList}>
                <View style={styles.viewMarkedAndTitle}>
                  <TouchableOpacity onPress={() => { }}>
                    <View
                      style={item.isDone ? styles.viewCircleDone : styles.viewMarked}
                    />
                  </TouchableOpacity>
                  <Text
                    style={item.isDone ? styles.textTitleLightBlue : styles.textTitleBlack}
                  >
                    {item.title}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={
                    () => {
                      console.tron.log({
                        itemDeleteBefore: itemDelete,
                        isDelete,
                      })
                      setItemDelete(item)
                      setIsModalConfirmDeleteShow(true)
                      console.tron.log({
                        itemDelete,
                        isDelete,
                      })
                    }
                  }
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

        <SafeAreaView />
      </View>

    )
  }
  const DoneComponent = () => {
    return (
      <View
        style={styles.wrapperTab}
      >
        <FlatList
          showsVerticalScrollIndicator={false}
          data={todos.markedDoneTodo}
          keyExtractor={(item, index) => `RenderMarkedComponent${index}`}
          renderItem={({ item }) => {
            return (
              <View style={styles.itemFlatList}>
                <View style={styles.viewMarkedAndTitle}>
                  <TouchableOpacity onPress={() => { }}>
                    <View
                      style={styles.viewCircleDone}
                    />
                  </TouchableOpacity>
                  <Text
                    style={styles.textTitleLightBlue}
                  >
                    {item.title}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    setItemDelete(item)
                    setIsModalConfirmDeleteShow(true)
                  }}
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
        <SafeAreaView />
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
      <Text style={styles.textTitleTodo}>
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
              <Text style={[styles.textTabBarTitle, { color: focused ? Colors.darkBlue : Colors.gray }]}>
                {route.title}
              </Text>
            )}
          />
        )}
      />
      <Modal
        visible={isModalConfirmDeleteShow}
        animationType="slide"
        transparent
      >
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'gray',
            opacity: 0.8,
          }}
        >
          <View
            style={{
              width: 300,
              height: 120,
              backgroundColor: Colors.black,
              borderRadius: 30,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <View style={{
              flex: 5,
              justifyContent: 'center',
              alignItems: 'center',

            }}
            >
              <Text style={{

                ...Fonts.bold,
                fontSize: 18,
                color: Colors.white,

              }}
              >
                Do you want to delete  ?
              </Text>
            </View>
            <View style={{
              flex: 2,
              flexDirection: 'row',
              alignItems: 'center',
              borderColor: Colors.white,
              borderTopWidth: StyleSheet.hairlineWidth,
            }}
            >
              <View style={{
                flex: 1,
                alignItems: 'center',
                borderColor: Colors.white,
                borderRightWidth: StyleSheet.hairlineWidth,
              }}
              >
                <TouchableOpacity
                  onPress={() => {
                    setIsDelete(false)
                    setIsModalConfirmDeleteShow(false)
                  }}
                >
                  <Text
                    style={{
                      ...Fonts.semiBold,
                      fontSize: 17,
                      color: '#00FF00',
                    }}
                  >
                    Cancel
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{
                flex: 1,
                alignItems: 'center',
              }}
              >
                <TouchableOpacity
                  onPress={() => {
                    setIsDelete(true)
                    setIsModalConfirmDeleteShow(false)
                  }}
                >
                  <Text
                    style={{
                      ...Fonts.semiBold,
                      fontSize: 17,
                      color: '#FF0000',
                    }}
                  >
                    Delete
                  </Text>
                </TouchableOpacity>
              </View>

            </View>
          </View>
        </View>
      </Modal>
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
    marginRight: 14 * screenScale,
    borderColor: Colors.gray,
    borderWidth: 3 * StyleSheet.hairlineWidth,
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
  textTitleBlack: {
    ...Fonts.semiBold,
    fontSize: 18,
    color: Colors.black,
  },
  textInputAdd: {
    ...Fonts.semiBold,
    fontSize: 14,
    color: Colors.white,
    alignItems: 'center',
    backgroundColor: 'transparent',

  },
  viewImageAdd: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.lightBlue,
    alignItems: 'center',
    justifyContent: 'center',

  },
  imageAdd: {
    width: 24,
    height: 24,
  },
  viewCircleDone: {
    width: 18 * screenScale,
    height: 18 * screenScale,
    borderRadius: 9 * screenScale,
    marginRight: 14 * screenScale,
    backgroundColor: Colors.lightBlue,
  },
  textTitleLightBlue: {
    ...Fonts.semiBold,
    fontSize: 18,
    color: Colors.lightBlue,
    textDecorationLine: 'line-through',
  },
  wrapperTab: { flex: 1 },
  textTitleTodo: {
    ...Fonts.bold,
    fontSize: 40 * screenScale,
    color: Colors.black,
    paddingLeft: 3 * screenScale,
    marginTop: 46 * screenScale,
    marginBottom: 10 * screenScale,
  },
  textTabBarTitle: {
    ...Fonts.semiBold,
    fontSize: 18,
    textTransform: 'uppercase',

  },
})
