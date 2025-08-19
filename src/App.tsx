import { useState } from 'react';
import TodoList from './components/todos/TodoList';
import TodoWrite from './components/todos/TodoWrite';
import { TodoType } from './types/todoType';

const initialTodos: TodoType[] = [];

function App() {
  // ts 자리
  const [todos, setTodos] = useState<TodoType[]>(initialTodos);
  // 편집중인 ID를 관리함
  const [isEdit, setIsEdit] = useState<string | null>(null);

  const handleTodoUpdate = (newTodo: TodoType): void => {
    const arr: TodoType[] = [newTodo, ...todos];
    setTodos(arr);
    setIsEdit(null);
  };

  const onToggle = (id: string): void => {
    const arr: TodoType[] = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo,
    );
    setTodos(arr);
    setIsEdit(null);
  };

  const onDelete = (id: string): void => {
    const arr: TodoType[] = todos.filter(todo => todo.id !== id);
    setTodos(arr);
    setIsEdit(null);
  };

  const onEdit = (id: string, newTitle: string): void => {
    const arr: TodoType[] = todos.map(item =>
      item.id === id ? { ...item, title: newTitle } : item,
    );
    setTodos(arr);
  };

  const getEdit = (id: string) => {
    setIsEdit(id);
  };

  const getSaveEdit = (id: string, newTitle: string) => {
    onEdit(id, newTitle);
    setIsEdit(null);
  };

  // tsx 자리
  return (
    <div className="min-h-screen bg-red-50 text-neutral-700">
      <header className="border-b border-white text-neutral-700 bg-white">
        <div className="container-app py-6 flex items-center justify-center">
          <h1 className="flex text-2xl font-bold tracking-wide m-5 items-center justify-center">
            <img src="./images/logo2.png" alt="" />
          </h1>
        </div>
      </header>
      <main className="container-app py-6">
        <div className="bg-white rounded-2xl shadow-card font-semibold">
          <div className="flex justify-between items-center p-1.5 gap-1 mb-5">
            <div className="flex-1 flex items-center justify-center bg-red-100 rounded-xl py-2">
              할일
            </div>
            <div className="flex-1 flex items-center justify-center bg-white rounded-xl py-2">
              미정
            </div>
          </div>
        </div>
        <div className="space-y-6 rounded-xl2 bg-white p-6 shadow-card">
          <TodoWrite handleTodoUpdate={handleTodoUpdate} />
        </div>
        <div className="mt-10 space-y-6 rounded-xl2 bg-white p-6 shadow-card">
          <TodoList
            todos={todos}
            isEdit={isEdit}
            setIsEdit={setIsEdit}
            onToggle={onToggle}
            onDelete={onDelete}
            getEdit={getEdit}
            getSaveEdit={getSaveEdit}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
