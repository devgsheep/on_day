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
    <div>
      <input type="text" value={title} onChange={e => handlechange(e)} onKeyDown={handleKeyDown} />
      <button onClick={handleAdd}>등록</button>
    </div>
  );
};

export default TodoWrite;
