import { useState } from 'react';
import TodoList from './components/todos/TodoList';
import TodoWrite from './components/todos/TodoWrite';
import { TodoType } from './types/todoType';

const initialTodos: TodoType[] = [];

function App() {
  // ts 자리
  const [todos, setTodos] = useState<TodoType[]>(initialTodos);

  const handleTodoUpdate = (newTodo: TodoType): void => {
    const arr: TodoType[] = [newTodo, ...todos];
    setTodos(arr);
  };

  const onToggle = (id: string): void => {
    const arr: TodoType[] = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo,
    );
    setTodos(arr);
  };

  const onDelete = (id: string): void => {
    const arr: TodoType[] = todos.filter(todo => todo.id !== id);
    setTodos(arr);
  };

  const onEdit = (id: string, newTitle: string): void => {
    const arr: TodoType[] = todos.map(item =>
      item.id === id ? { ...item, title: newTitle } : item,
    );
    setTodos(arr);
  };
  // tsx 자리
  return (
    <div>
      <h1>온데이 TODO</h1>
      <TodoWrite handleTodoUpdate={handleTodoUpdate} />
      <TodoList todos={todos} onToggle={onToggle} onDelete={onDelete} onEdit={onEdit} />
    </div>
  );
}

export default App;
