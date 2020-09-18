import * as TodoTypes from './type'

const initState = {
  currentTodo: ['Do homework', 'Listen to music', 'Drink water', 'Make a cake',
  ],
  markedDoneTodo: [],
}

const todoReducer = (state = initState, action) => {
  switch (action.type) {
    case TodoTypes.ADD_NEW_TODO:
      return { ...state, currentTodo: [...state.currentTodo, action.payload.data] }
    case TodoTypes.DELETE_TODO:
      return { ...state, currentTodo: state.currentTodo.filter((todo) => { return todo !== action.payload.data }) }
    default:
      return state
  }
}

export default todoReducer
