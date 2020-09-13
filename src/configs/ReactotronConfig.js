// eslint-disable-next-line import/no-extraneous-dependencies
import Reactotron from 'reactotron-react-native'
// eslint-disable-next-line import/no-unresolved
import AsyncStorage from '@react-native-community/async-storage'

const reactotron = Reactotron
  .setAsyncStorageHandler(AsyncStorage)
  .configure({
    name: 'Redux todo React Native',
    host: 'localhost',
    port: 9090,
  })
  .useReactNative()
  .connect()

console.tron = reactotron
export default reactotron
