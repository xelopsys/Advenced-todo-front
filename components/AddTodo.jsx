import React, { useState, useEffect, Fragment, useRef } from 'react'
import TodoList from './TodoList'
import axios from 'axios'
import qs from 'qs'
import { config } from '../config';

async function getServerSideProps() {
    const todos = await axios.get(config.API || process.env.API).then(res => { return res.data })
    const todo = todos.data
    return todo
}

export default function AddTodo({ setTodo }) {
    const [id, setId] = useState(1)
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')



    const handleClick = async () => {
        if (title || content) {

            await axios(config.API + "/create" || process.env.API + "/create", {
                method: 'POST',
                headers: { 'content-type': 'application/x-www-form-urlencoded' },
                data: qs.stringify({
                    id: id,
                    title: title,
                    content: content
                }),

            })
                .then(async res => {
                    setTodo(await getServerSideProps());
                    // console.log(res)
                })
                .catch(err => console.log(err.message))

        }
        setTitle("")
        setContent("")
    }

    useEffect(() => {
        async function fetchData() {
            await axios.get(config.API || process.env.API)
                .then(res => {
                    setId(res.data.data.length > 0 ? Math.max(...res.data.data.map(item => item.id)) + 1 : 1)
                })
        }
        fetchData()


    }, [handleClick])





    // function isValidTitle() {
    //     if (title.length > 0 && title.length < 50) {
    //         return true
    //     }
    //     return function () {
    //         if (title.length === 0) {
    //             return 'Title is required'
    //         }
    //         if (title.length > 50) {
    //             return 'Title is too long'
    //         }
    //     }


    // }

    // function isValidContent() {
    //     if (content.length > 0 && content.length < 500) {
    //         return true
    //     }
    //     return function () {
    //         if (content.length === 0) {
    //             return 'Content is required'
    //         }
    //         if (content.length > 500) {
    //             return 'Content is too long'
    //         }
    //     }
    // }






    const handleChange = (e) => {
        if (e.target.name === 'title') {
            setTitle(e.target.value)
        } else {
            setContent(e.target.value)
        }
    }

    return (
        <Fragment>
            <form className='w-full  mb-6 h-full flex flex-col justify-center items-center sm:flex-col md:flex-row lg:flex-col' onSubmit={(e) => { e.preventDefault() }}>
                <span className='w-12 h-12 rounded-full bg-red-500 text-white flex flex-row justify-center items-center mx-6 p-2'>{id}</span>
                <input className='w-full h-12 rounded border-b p-4 m-2 focus:outline-red-500' name="title" value={title} onChange={handleChange} placeholder="title" />
                <input className='w-full h-12 rounded p-4 m-2 focus:outline-red-500' name="content" value={content} onChange={handleChange} placeholder="content" />
                <button type="submit" className=' rounded w-1/2 h-12 p-4 m-2 shadow-lg bg-red-500 hover:bg-red-900 flex flex-row justify-center items-center text-white' onClick={handleClick}>
                    Add
                </button>
            </form>
        </Fragment>
    )
}


