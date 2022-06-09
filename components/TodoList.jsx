import React, { useEffect, useState } from 'react'
import axios from 'axios';
import qs from 'qs';
import Link from 'next/link';

async function getServerSideProps() {
    const todos = await axios.get('http://localhost:3002/todo').then(res => { return res.data })
    // console.log(todos)
    const todo = todos.data
    return todo.reverse()
}

export default function TodoList({ id, title, content, setTodos }) {

    const [isEdit, setIsEdit] = useState(false)
    const [editTitle, setEditTitle] = useState(title)
    const [editContent, setEditContent] = useState(content)



    const handleCancel = () => {
        setIsEdit(false)
        setEditTitle(title)
        setEditContent(content)
    }


    async function handleDelete(id) {

        await axios('http://localhost:3002/todo/delete', {
            method: 'DELETE',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: qs.stringify({
                id: id
            }),
        }).then(async (res) => {
            setTodos(await getServerSideProps())
        })

            .catch(err => console.log(err.message))
    }

    async function handleUpdate(id) {
        await axios('http://localhost:3002/todo/update', {
            method: 'PATCH',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: qs.stringify(
                {
                    id: id,
                    title: editTitle,
                    content: editContent
                }
            ),
        }).then(async (res) => {
            setTodos(await getServerSideProps())
        })

            .catch(err => console.log(err.message))
    }




    return (
        <div>
            {isEdit === false ? (
                <>
                    <span>{id}</span>
                    <h1> {title}</h1>
                    <p>{content}</p>


                    <div>
                        <button onClick={() => handleDelete(id)}>
                            Delete
                        </button>
                        <button onClick={() => setIsEdit(true)}>Edit</button>
                    </div>

                </>
            ) : (
                <>
                    <span>{id}</span>
                    <input name="title" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} placeholder="title" />
                    <input name="content" value={editContent} onChange={(e) => setEditContent(e.target.value)} placeholder="content" />
                    <button onClick={() => handleCancel()}>Cancel</button>
                    <button type="submit" onClick={() => {
                        setIsEdit(false)
                        handleUpdate(id)
                    }}>
                        Update
                    </button>
                </>
            )}


        </div >
    )
}