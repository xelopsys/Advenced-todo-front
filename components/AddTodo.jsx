import React, { useState, useEffect, Fragment } from 'react'
import TodoList from './TodoList'
import axios from 'axios'
import qs from 'qs'

export default function AddTodo(props) {

    // console.log(idList())
    const [todos, setTodos] = useState([])
    const [id, setId] = useState(1)
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    useEffect(() => {
        async function fetchData() {
            await axios.get('http://localhost:3002/todo')
                .then(res => {
                    setTodos(res.data.data)

                })
        }
        fetchData()


    }, [])

    const autoId = () => {
        return todos.length + 1
    }





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

    const handleClick = async () => {

        console.log(todos)
        if (title || content) {
            await axios('http://localhost:3002/todo/create', {
                method: 'POST',
                headers: { 'content-type': 'application/x-www-form-urlencoded' },
                data: qs.stringify({
                    id: id,
                    title: title,
                    content: content
                }),

            }).catch(function (error) {
                if (error.response) {
                    // Request made and server responded
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    // The request was made but no response was received
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                }
            })
        }

        setTitle("")
        setContent("")
        setId(autoId())



    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(todos)
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
    const handleDelete = async (id) => {

        await axios('http://localhost:3002/todo/delete', {
            method: 'DELETE',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: qs.stringify({
                id: id
            }),
        })

            .catch(function (error) {
                if (error.response) {
                    // Request made and server responded
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    // The request was made but no response was received
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                }
            })
    }


    // const handleKeyPress = (e) => {
    //     if (e.key === 'Enter') {
    //         handleSubmit(e)
    //     }
    // }

    // const handleUpdateChange = (e) => {
    //     if (e.target.name === 'title') {
    //         setTitle(e.target.value)
    //     } else {
    //         setContent(e.target.value)
    //     }
    // }


    // const handleUpdateKeyPress = (e) => {
    //     if (e.key === 'Enter') {
    //         handleUpdate(e)
    //     }
    // }

    // const handleUpdateClick = (id) => {
    //     const todo = todos.find(todo => todo.id === id)
    //     setTitle(todo.title)
    //     setContent(todo.content)
    // }

    // const handleCancelClick = () => {
    //     setTitle('')
    //     setContent('')
    // }

    // const handleCancelUpdateClick = () => {
    //     setTitle('')
    //     setContent('')
    // }

    // const handleEditClick = (id) => {
    //     const todo = todos.find(todo => todo.id === id)
    //     setTitle(todo.title)
    //     setContent(todo.content)
    // }



    return (
        <Fragment>
            <form onSubmit={handleSubmit}>
                <span>{id}</span>
                <input name="title" value={title} onChange={handleChange} placeholder="title" />
                <input name="content" value={content} onChange={handleChange} placeholder="content" />
                <button type="submit" onClick={handleClick}>Add</button>
                {todos.map((todo, index) => (
                    <TodoList key={index} id={todo.id} title={todo.title} content={todo.content} onDelete={handleDelete} />
                ))}
                {/* <Todo id={id} title={title} content={content} onDelete={handleDelete} onUpdate={handleUpdate} /> */}
            </form>
        </Fragment>
    )
}