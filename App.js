import 'react-native-gesture-handler'
import React from 'react'
import {
  View, Text,
} from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { MainScreen, DoneScreen } from './src/screens'

const Stack = createStackNavigator()
const App = () => {
  return (

    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="MainScreen"
          component={MainScreen}

        />
        <Stack.Screen
          name="DoneScreen"
          component={DoneScreen}

        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
export default App
