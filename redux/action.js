import * as TodoTypes from './type'

export const addNewTodo = (data) => {
  return {
    type: TodoTypes.ADD_NEW_TODO,
    payload: { data },
  }
}
export const deleteTodoNew = (data) => {
  return {
    type: TodoTypes.DELETE_TODO_NEW,
    payload: { data },
  }
}
export const deleteTodoDone = (data) => {
  return {
    type: TodoTypes.DELETE_TODO_DONE,
    payload: { data },
  }
}
export const markedTodo = (data) => {
  return {
    type: TodoTypes.MARK_TODO_DONE,
    payload: { data },
  }
}
