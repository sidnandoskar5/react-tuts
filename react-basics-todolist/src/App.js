import './App.css'
import {useState} from 'react'
import Heading from './components/Heading'
import Card from './components/Card'
import TodoList from './components/TodoList'
import Button from './components/Button'
import Form from './components/Form'
import UseRefForm from './components/UseRefForm'
import { useFetch } from './hooks/useFetch'
import { useEffect } from 'react/cjs/react.development'

function App() {
	const [showList, setShowList] = useState(true)
	const [url, setUrl] = useState('http://localhost:3000/todolist')
	const [todos, setTodos] = useState([])

	const { data: todoData, isPending, error } = useFetch(url,{type:'GET'})

	useEffect(()=>[
		setTodos(todoData)
	],[todoData])

	const addTodo = (todo) => {
		setTodos((prev) => {
			return [todo, ...prev]
		})
	}

	const onDelete = (todoId) => {
		setTodos((prevState) => {
			return (
				prevState.filter((todo) => {
					return todoId !== todo.id
				})
			)
		})
	}

	const onComplete = (todoId) => {
		setTodos((prevState) => {
			return (
				prevState.map((todo) => {
					if(todo.id === todoId){
						return {...todo, isCompleted: !todo.isCompleted}
					}
					return todo
				})
			)
		})
	}

	const onToggle = () => {
		setShowList((prevState) => {
			return !prevState
		})
	}

	const resetList = () => {
		setUrl('http://localhost:3000/todolist');
	}

	const onFilter = () => {
		setUrl('http://localhost:3000/todolist/?location=India');
	}

    return (
        <div className="App">
    	    <Heading title="ToDo List"/>
			<Card>
				<Form addTodo={addTodo} />
				<UseRefForm addTodo={addTodo} />
			</Card>
			<Card>
				<Button label="Toggle List" btnClass="primary" eventHandler={onToggle} />
				{isPending && <div>Loading Todo List...</div>}
				{error && <div>{error}</div>}
				{showList && (<TodoList list={todos} deletetodo={onDelete} completetodo={onComplete}/>)}
				<Button label="Filter" btnClass="primary" eventHandler={onFilter} />
				<Button label="Reset Filter" btnClass="primary" eventHandler={resetList} />
			</Card>
        </div>
    );
}

export default App;