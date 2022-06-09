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
    <div className='text-md w-screen h-screen  flex flex-col justify-center items-center  '>
      <div className='w-screen p-48 h-full flex flex-col justify-center items-center'>
        {/* {todo.name ? <h1>Hello {props.name}</h1> : <h1>Welcome stranger!</h1>} */}
        <h1 className='text-lg text-black text-left w-full ml-28 mb-8'>Welcome on board Stranger!</h1>

        <AddTodo setTodo={setTodos} />
        <div className="w-full  h-full flex flex-row  flex-wrap justify-evenly items-center px-auto">
          {todos.map((item, index) => (
            <TodoList key={index} id={item.id} title={item.title} content={item.content} setTodos={setTodos} />
          ))}
        </div>
      </div>
    </div>
  )
}



