import { TodoPreview } from '../cmps/TodoPreview'
export function TodoList({ todos, onSaveTodo, onRemoveTodo }) {
    return (
        <div className="todo-list">
            {todos.map(todo => <TodoPreview key={todo.id} todo={todo} onSaveTodo={onSaveTodo} onRemoveTodo={onRemoveTodo} />)}
        </div>
    )
}