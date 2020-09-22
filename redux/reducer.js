/* eslint-disable indent */
import * as TodoTypes from './type'

const initState = {
  currentTodo: [{
    title: 'Do homework',
    isDone: false,
  }, {
    title: 'Listen to music',
    isDone: false,
  }, {
    title: 'Sleep',
    isDone: false,
  }, {
    title: 'Call mom',
    isDone: false,
  }],
  markedDoneTodo: [],
  // allTodo: [],
}
console.log('===============================================')
console.log('initState', initState)
console.log('===============================================')

const todoReducer = (state = initState, action) => {
  switch (action.type) {
    case TodoTypes.ADD_NEW_TODO:
      return {
        ...state,
        currentTodo: [...state.currentTodo, { title: action.payload.data, isDone: false }],
        // allTodo: [...state.currentTodo, ...state.markedDoneTodo],

      }
    case TodoTypes.DELETE_TODO_NEW:
      return {
        ...state,
        currentTodo: state.currentTodo.filter((todo) => { return todo !== action.payload.data }),
        // allTodo: [...state.currentTodo, ...state.markedDoneTodo],
      }
    case TodoTypes.DELETE_TODO_DONE:
      return {
        ...state,
        markedDoneTodo: state.markedDoneTodo.filter((todo) => { return todo !== action.payload.data }),
        // allTodo: [...state.currentTodo, ...state.markedDoneTodo],
      }
    case TodoTypes.MARK_TODO_DONE:

      return {
        ...state,
        currentTodo: state.currentTodo.filter((todo) => { return todo.title !== action.payload.data.title }),
        markedDoneTodo: [...state.markedDoneTodo, { title: action.payload.data.title, isDone: true }],
        // allTodo: [...state.currentTodo, ...state.markedDoneTodo],
      }

    default:
      return state
  }
}

export default todoReducer
