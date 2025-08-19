import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import { TodoType } from '../../types/todoType';

type TodoWriteType = {
  handleTodoUpdate: (newTodo: TodoType) => void;
};

const TodoWrite = ({ handleTodoUpdate }: TodoWriteType) => {
  const [title, setTitle] = useState<string>('');

  const handlechange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAdd();
    }
  };

  const handleAdd = () => {
    if (title.trim()) {
      const newTodo: TodoType = {
        id: Date.now().toString(),
        title: title,
        completed: false,
      };
      handleTodoUpdate(newTodo);
      setTitle('');
    }
  };

  return (
    <div className="flex items-center gap-2">
      <input
        type="text"
        value={title}
        onChange={e => handlechange(e)}
        onKeyDown={handleKeyDown}
        className="flex-1 rounded-lg border border-neutral-300 bg-white px-3 py-2 outline-none focus:ring-1 focus:ring-red-300"
      />
      <button
        onClick={handleAdd}
        className="rounded-lg border border-red-300 px-3 py-2 text-white bg-red-300 hover:opacity-80 active:opacity-70"
      >
        등록
      </button>
    </div>
  );
};

export default TodoWrite;
