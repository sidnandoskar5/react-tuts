import { useRef } from "react"

export default function UseRefForm({addTodo}) {
    const todo = useRef()
    const location = useRef()
    const submitHandler = (e) => {
        e.preventDefault()
        if(todo !== ''){
            const event = {
                title: todo.current.value,
                id: Math.floor(Math.random() * 10000),
                isCompleted: false,
                location: location.current.value
            }
            addTodo(event)
            resetForm()
        }
    }

    const resetForm = () => {
        todo.current.value = ''
        location.current.value = ''
    }

    return (
        <form onSubmit={submitHandler}>
            <input className="form-input" type="text" placeholder="Add Todo with UseRef" ref={todo} />
            <select className="form-input" ref={location} >
                <option>Select Location</option>
                <option value="Bulgeria">Bulgeria</option>
                <option value="India">India</option>
                <option value="Pakistan">Pakistan</option>
            </select>
            <button className="success" type="submit">Add</button>
        </form>
    )
}
