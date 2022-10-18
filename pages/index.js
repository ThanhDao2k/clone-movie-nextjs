import TodoList from "../components/TodoList";
import React, {useEffect, useState} from "react";
import FormTodo from "../components/formTodo";
import axios from "axios";
import useSWR, {useSWRConfig} from "swr";
import {url} from "../components/api/API";
import todo from "../components/Todo";

const containerStyle = {
    width: '1000px',
    backgroundColor: '#c9c9c9',
    margin: '0 auto'
}

const headerStyle = {
    textAlign: 'center',
    color: '#7d02bb',
    fontsize: '50px',
    paddingTop: '20px'
}
const btnStyle = {
    flex: 1, textAlign: 'center',
    cursor: 'pointer',
}
const fetcher = url => axios.get(url).then(res => res.data)


export default function Home() {
    const {data} = useSWR(url, fetcher)
    const {mutate} = useSWRConfig()

    const addTodo = async (todo) => {
        await axios.post(url, todo)
        await mutate(url)
    }
    const handleUpdate = (todoId, title) => {
        data?.map(async todo => {
            if (todo.id === todoId) {
                todo.title = title
                await axios.put(url + `/${todo.id}`, todo)
                await mutate(url)
            }
        })

    }
    const handleDelete = (todoId) => {
        data?.map(async todo => {
            if (todo.id === todoId) {
                await axios.delete(url + `/${todo.id}`)
                await mutate(url)
            }
        })
    }
    const [listTodo, setListTodo] = useState([])

    useEffect(() => {
        setListTodo(data)
    }, [data])

    return (
        <div style={containerStyle}>
            <h2 style={headerStyle}>List Todo !!!</h2>
            <div style={{height: '40px', width: '600px', margin: '0 auto'}}>
                <FormTodo handleClick={addTodo}/>
            </div>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <div style={btnStyle} onClick={() => setListTodo(data)}>All</div>
                <div style={btnStyle} onClick={() => {
                    const res = data?.filter(todo => todo.completed)
                    setListTodo(res)
                }}>active
                </div>
                <div style={btnStyle} onClick={() => {
                    const res = data?.filter(todo => !todo.completed)
                    setListTodo(res)
                }}>not active
                </div>
            </div>
            <TodoList data={listTodo} handleUpdate={handleUpdate} handleDelete={handleDelete}/>
        </div>
    )
}
