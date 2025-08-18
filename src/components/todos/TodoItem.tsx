import React, { KeyboardEvent, useState } from 'react';
import { TodoType } from '../../types/todoType';
type TodoItemProps = {
  todo: TodoType;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newTitle: string) => void;
};

const TodoItem = ({ todo, onToggle, onDelete, onEdit }: TodoItemProps) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editTitle, setEditTitle] = useState<string>(todo.title);

  const handleEdit = () => {
    setIsEdit(true);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleEditSave();
    }
    if (e.key === 'Escape') {
      handleEditCancel();
    }
  };

  const handleEditSave = () => {
    if (editTitle.trim()) {
      onEdit(todo.id, editTitle);
      setIsEdit(false);
    }
  };

  const handleEditCancel = () => {
    setEditTitle(todo.title);
    setIsEdit(false);
  };

  return (
    <li>
      {isEdit ? (
        <>
          <input
            type="text"
            value={editTitle}
            onChange={e => setEditTitle(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button onClick={handleEditSave}>저장</button>
          <button onClick={handleEditCancel}>취소</button>
        </>
      ) : (
        <>
          <input type="checkbox" onChange={() => onToggle(todo.id)} checked={todo.completed} />
          <span>{todo.title}</span>
          <button onClick={handleEdit}>수정</button>
          <button onClick={() => onDelete(todo.id)}>삭제</button>
        </>
      )}
    </li>
  );
};

export default TodoItem;
