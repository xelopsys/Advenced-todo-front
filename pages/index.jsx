import AddTodo from '../components/AddTodo'
import TodoList from '../components/TodoList'
import axios from 'axios'
import React, { useEffect, useState } from 'react';
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from 'next/router'


export async function getServerSideProps() {
  const todos = await axios.get('http://localhost:3002/todo').then(res => { return res.data })
  const todo = todos.data
  return {
    props: {
      todo
    }
  }
}


export default function Home({ todo }) {
  const { data: session } = useSession()
  const [todos, setTodos] = useState([])
  const router = useRouter()


  useEffect(() => {
    async function fetchData() {
      await axios.get('http://localhost:3002/todo')
        .then(res => {
          setTodos(res.data.data)
        })
    }
    fetchData()

    if (!session) {
      (
        router.push('/login')
      )
    }
  }, [todo, session])
  console.log(session)
  // console.log('TODODS:', todos)
  return (
    <div className='text-md w-screen h-screen  flex flex-col justify-center items-center  '>
      <div className='w-screen p-48 h-full flex flex-col justify-center items-center'>
        <div className='w-full h-full justify-evenly items-center flex flex-row'>
          {/* {todo.name ? <h1>Hello {props.name}</h1> : <h1>Welcome stranger!</h1>} */}
          {session && <h1 className='text-lg text-black text-left w-full  mb-8'>Welcome on board {session.user.name}</h1>}
          <button className=' bg-black text-white text-right mb-8 rounded w-28 h-12  flex flex-row justify-center items-center' onClick={() => signOut()}>Sign out</button>
        </div>
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



