import { type Todo } from "../models/Todo";

const url = 'https://jsonplaceholder.typicode.com/todos';

async function fetchTodos(
    { page = 1, limit = 10, signal}: {page?: number; limit?: number; signal?: AbortSignal}){
    const res = await fetch(`${url}?_page=${page}&_per_page=${limit}`, {signal});
    if(!res.ok){
        throw new Error('Failed to fetch todos.');
    }
    return res.json() as Promise<Todo[]>;
};

async function fetchTodo(
    { id, signal}: {id: number; signal?: AbortSignal}){
    const res = await fetch(`${url}/${id}`, {signal});
    if(!res.ok){
        throw new Error('Failed to fetch todo.');
    }
    return res.json() as Promise<Todo>;
};

async function createTodo({title}: {title: string}) {
    const res = await fetch(`${url}`, {
        method: 'POST', 
        headers: {'Content-Type': 'application/json' },
        body: JSON.stringify({title, completed: false})
    })
    if(!res.ok){
        throw new Error('Failed to create todo.');
    }
    return res.json() as Promise<Todo>;
};

async function toggleTodo({id, completed}: {id: number; completed:boolean}) {
    const res = await fetch(`${url}/${id}`, {
        method: 'PATCH', 
        headers: {'Content-Type': 'application/json' },
        body: JSON.stringify({ completed })
    })
    if(!res.ok){
        throw new Error('Failed to update todo.');
    }
    return res.json() as Promise<Todo>;
};

async function deleteTodo({id}: {id: number}) {
    const res = await fetch(`${url}/${id}`, {
        method: 'DELETE'
    })
    if(!res.ok){
        throw new Error('Failed to delete todo.');
    }
    return { id };
};

export {fetchTodos, fetchTodo, createTodo, toggleTodo, deleteTodo};