// import { process_params } from 'express/lib/router'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import AddTodo from '../components/AddTodo'
import TodoList from '../components/TodoList'
import axios from 'axios'
import React, { useEffect, useState } from 'react';


export async function getServerSideProps() {
  const todos = await axios.get('http://localhost:3002/todo').then(res => { return res.data })
  // console.log(todos)
  const todo = todos.data.reverse()
  // console.log(todo)
  return {
    props: {
      todo
    }
  }
}


export default function Home({ todo }) {

  const [todos, setTodos] = useState([])

  useEffect(() => {
    async function fetchData() {
      await axios.get('http://localhost:3002/todo')
        .then(res => {
          setTodos(res.data.data)
        })
    }
    fetchData()
  }, [todo])

  // console.log('TODODS:', todos)
  return (
    <div className='text-md w-screen h-full  flex flex-col justify-center items-center '>
      {todo.name ? <h1>Hello {props.name}</h1> : <h1>Welcome stranger!</h1>}
      <AddTodo setTodo={setTodos} />
      {todos.map((item, index) => (
        <TodoList key={index} id={item.id} title={item.title} content={item.content} setTodos={setTodos} />
      ))}
    </div>
  )
}



