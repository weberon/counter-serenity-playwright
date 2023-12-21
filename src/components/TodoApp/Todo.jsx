import { useState, useEffect } from "react";

export const TODO_URL = 'https://jsonplaceholder.typicode.com/todos/1';

const commonStyle = {
    border: "2px solid black",
    borderRadius: "0.25rem",
    padding: "0.5rem"
}

const errorStle = {
    ...commonStyle,
    color: "red",
    backgroundColor: "yellow",
    
}

const todoStyle = {
    ...commonStyle,
    backgroundColor: "dodgerblue",
}

const todoContainer = {
    ...commonStyle,
    display: "flex",
    gap: "0.5rem"
}

const Error = ({err: error}) => {
    if(error == null)return;
    return (
        <span className="todo-error" style={errorStle}>{error}</span>
    )
}

const TodoItem = ({todo}) => {
    if(todo == null)return;
    return (
        <span className="todo-title" style={todoStyle}>{todo && todo.title}</span>
    )
}

const Todo = () => {
    const [todo, setTodo] = useState({title: 'Initial Todo'});
    const [error, setError] = useState(null);

    useEffect(()=>{
        let mounted = true;
        console.log('UseEffect of Todo');
        const fetchTodoAndUpdateTodo = () => {
            console.log('Going to send Request', TODO_URL);
            fetch(TODO_URL)
                .then(response => {
                    console.log('Received Raw Response', response);
                    return response.json();
                })
                .then(json => {
                    console.log('Received JSON Response', json);
                    if(mounted)setTodo(json)
                })
                .catch(err => {
                    console.error(`[ERROR] ${err}`);
                    setError(err);
                })
            ;
        }

        fetchTodoAndUpdateTodo();

        return () => {
            console.log('TODO Unmounting');
            mounted = false;
        }
    }, [])

    return  (
        <div className="todo" style={todoContainer}>
            <TodoItem todo={todo} />
            <Error error={error} />
        </div>
    )
}

export default Todo;