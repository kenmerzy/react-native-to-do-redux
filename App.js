import 'react-native-gesture-handler'
import React from 'react'
import {
  View, Text,
} from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { Provider } from 'react-redux'
import { MainScreen } from './src/screens'
import store from './redux/store'

const Stack = createStackNavigator()
const App = () => {
  return (
    <Provider store={store}>
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

        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}
export default App
