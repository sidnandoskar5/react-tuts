import { useState } from "react"

export default function Form({addTodo}) {
    const [todo, setTodo] = useState('')
    const [location, setLocation] = useState()
    const submitHandler = (e) => {
        e.preventDefault()
        if(todo !== ''){
            const event = {
                title:todo,
                id: Math.floor(Math.random() * 10000),
                isCompleted: false,
                location: location
            }
            addTodo(event)
            resetForm()
        }
    }

    const resetForm = () => {
        setTodo('');
        setLocation('');
    }

    return (
        <form onSubmit={submitHandler}>
            <input className="form-input" type="text" onChange={(e) => setTodo(e.target.value) } placeholder="Add Todo" value={todo}/>
            <select className="form-input" onChange={(e) => {setLocation(e.target.value)}} value={location}>
                <option>Select Location</option>
                <option value="Bulgeria">Bulgeria</option>
                <option value="India">India</option>
                <option value="Pakistan">Pakistan</option>
            </select>
            <button className="success" type="submit">Add</button>
        </form>
    )
}
