import React, { useState, useEffect, Fragment } from 'react'
import TodoList from './TodoList'
import axios from 'axios'
import qs from 'qs'

async function getServerSideProps() {
    const todos = await axios.get('http://localhost:3002/todo').then(res => { return res.data })
    // console.log(todos)
    const todo = todos.data
    return todo.reverse()
}

export default function AddTodo({ setTodo }) {


    // console.log(idList())
    // const [todos, setTodos] = useState([])
    const [id, setId] = useState(1)
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')



    const handleClick = async () => {

        // console.log(todo)
        if (title || content) {

            await axios('http://localhost:3002/todo/create', {
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
            await axios.get('http://localhost:3002/todo')
                .then(res => {
                    // setId(res.data.data.length + 1)
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



    const handleSubmit = (e) => {
        e.preventDefault()
        // console.log(todo)
    }


    const handleChange = (e) => {
        if (e.target.name === 'title') {
            setTitle(e.target.value)
            // console.log(title)
        } else {
            setContent(e.target.value)
            // console.log(content)

        }
    }

    // const handleUpdate = async (id) => {
    //     await axios('http://localhost:3002/todo/update', {
    //         method: 'PUT',
    //         headers: { 'content-type': 'application/x-www-form-urlencoded' },
    //         data: qs.stringify({
    //             id: id,
    //             title: title,
    //             content: content
    //         }),
    //     }).then(async (res) => {
    //         setTodo(await getServerSideProps())
    //         // console.log(res)
    //     })
    // }

    return (
        <Fragment>
            <form onSubmit={handleSubmit}>
                <span>{id}</span>
                <input name="title" value={title} onChange={handleChange} placeholder="title" />
                <input name="content" value={content} onChange={handleChange} placeholder="content" />
                <button type="submit" onClick={handleClick}>
                    {/* <a href="/">Add</a> */}
                    Add
                </button>
            </form>
        </Fragment>
    )
}


