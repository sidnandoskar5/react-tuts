import style from '../styles/TodoList.module.css'
import Button from './Button'

export default function TodoList({ list, deletetodo, completetodo }) {
    return (
        <>
        {list && <ul className={style.todo}>
            {list.map((todo, index) => {
                return (
                    <li key={todo.id} className={todo.isCompleted ? style.complete : ''}>
                        <span>{index+1 + '. ' + todo.title}</span>
                        {todo.location && <span>Location: {todo.location}</span>}
                        <div className={style.btnWrapper}>
                            <Button label="Delete" btnClass="danger" eventHandler={deletetodo} eventParam={todo.id} />
                            <Button label={todo.isCompleted ? 'Incomplete' : 'Complete'} btnClass="primary" eventHandler={completetodo} eventParam={todo.id} />
                        </div>
                    </li>
                )
            })}
        </ul>}
        </>
    )
}
