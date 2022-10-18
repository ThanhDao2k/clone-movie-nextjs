import axios from "axios";

export const url = 'https://634e52934af5fdff3a58967e.mockapi.io/todos'
export const getTodoList = () => axios.get('https://jsonplaceholder.typicode.com/todos')
export const postTodo = (newTodo) => axios.get('https://jsonplaceholder.typicode.com/todos', newTodo)
export const deleteTodo = (todoId) => axios.get(`https://jsonplaceholder.typicode.com/todos/${todoId}`)
export const updateTodo = (todoId, newTodo) => axios.get(`https://jsonplaceholder.typicode.com/todos/${todoId}`, newTodo)