import React from 'react'


export default function TodoList(props) {

    return (
        <div>
            <span>{props.id}</span>
            <h1>{props.title}</h1>
            <p>{props.content}</p>
            <div>
                <button onClick={() => props.onDelete(props.id)}>Delete</button>
                <button onClick={() => props.onUpdate(props.id)}>Update</button>
            </div>
        </div>
    )
}