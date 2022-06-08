// import { process_params } from 'express/lib/router'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import AddTodo from '../components/AddTodo'

export default function Home(props) {
  return (
    <div className='text-2xl w-screen h-screen flex flex-col justify-center items-center '>
      {props.name ? <h1>Hello {props.name}</h1> : <h1>Welcome stranger!</h1>}
      <AddTodo />
    </div>
  )
}
