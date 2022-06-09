import React, { useEffect, useState } from 'react'
import axios from 'axios';
import qs from 'qs';
import Link from 'next/link';

async function getServerSideProps() {
    const todos = await axios.get('http://localhost:3002/todo').then(res => { return res.data })
    // console.log(todos)
    const todo = todos.data
    return todo
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
        <div className='w-1/2  h-full flex flex-col justify-center items-center p-4'>
            {isEdit === false ? (
                <>
                    <div className="w-full h-full flex flex-col justify-center pt-4 ">
                        <span className='w-12 h-12 rounded-full bg-yellow-300 text-black flex flex-row justify-center items-center mx-auto p-4'>{id}</span>
                        <h1 className='w-full break-words h-12 rounded py-4 border-b'> Title: {' " '}{title}{' " '}</h1>
                        <p className='w-full break-words h-12 rounded py-4 '>Content: {' " '}{content}{' " '}</p>
                    </div>

                    <div className='w-full h-full flex flex-row justify-evenly items-center my-4'>
                        <button className=' rounded w-1/3 h-12 py-4 my-2 shadow-lg bg-black hover:bg-gray-600 flex flex-row justify-center items-center text-white' onClick={() => handleDelete(id)}>
                            Delete
                        </button>
                        <button className=' rounded w-1/3 h-12 py-4 my-2 shadow-lg bg-yellow-400 hover:bg-yellow-700 flex flex-row justify-center items-center text-black' onClick={() => setIsEdit(true)}>Edit</button>
                    </div>

                </>
            ) : (
                <>
                    <div className="w-full h-full flex flex-col justify-center pt-4">
                        <span className='w-12 h-12 rounded-full bg-yellow-300 text-black flex flex-row justify-center items-center mx-auto p-4'>{id}</span>
                        <input className='w-full h-12 border-b p-4 m-2 focus:outline-red-500' name="title" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} placeholder="title" />
                        <input className='w-full h-12 border-b p-4 m-2 focus:outline-red-500' name="content" value={editContent} onChange={(e) => setEditContent(e.target.value)} placeholder="content" />
                    </div>
                    <div className="w-full h-full flex flex-row justify-evenly items-center my-4">
                        <button className="rounded w-1/3 h-12 p-4 m-2 shadow-lg bg-black hover:bg-gray-600 flex flex-row justify-center items-center text-white" onClick={() => handleCancel()}>Cancel</button>
                        <button className='rounded w-1/3 h-12 p-4 m-2 shadow-lg bg-green-500 hover:bg-green-700 flex flex-row justify-center items-center text-white' type="submit" onClick={() => {
                            setIsEdit(false)
                            handleUpdate(id)
                        }}>
                            Update
                        </button>
                    </div>
                </>
            )}


        </div >
    )
}