import { TodoPreview } from '../cmps/TodoPreview'
export function TodoList({ todos }) {
    return (
        <div className="todo-list">
            {todos.map(todo => <TodoPreview key={todo.id} todo={todo} />)}
        </div>
    )
}