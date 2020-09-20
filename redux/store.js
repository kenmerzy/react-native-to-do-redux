import { createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-community/async-storage'
import createEncryptor from 'redux-persist-transform-encrypt'
import todoReducer from './reducer'

const encryptor = createEncryptor({
  secretKey: 'long111254',
  onError(error) {
    console.log('===============================================')
    console.log('error', error)
    console.log('===============================================')
  },
})

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,

  transforms: [encryptor],

}

const persistedReducer = persistReducer(persistConfig, todoReducer)

const store = createStore(persistedReducer)

persistStore(store)

export default store
