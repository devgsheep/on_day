import React, { KeyboardEvent, useState } from 'react';
import { TodoType } from '../../types/todoType';
type TodoItemProps = {
  todo: TodoType;
  isEdit: boolean;
  onToggle: (id: string) => void;
  getDelete: (id: string) => void;
  getEdit: (id: string) => void;
  getSaveEdit: (id: string, newTitle: string) => void;
  getCancel: () => void;
};

const TodoItem = ({
  todo,
  isEdit,
  onToggle,
  getDelete,
  getEdit,
  getSaveEdit,
  getCancel,
}: TodoItemProps) => {
  const [editTitle, setEditTitle] = useState<string>(todo.title);

  const handleEdit = () => {
    getEdit(todo.id);
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
      getSaveEdit(todo.id, editTitle);
    }
  };

  const handleEditCancel = () => {
    setEditTitle(todo.title);
    getCancel();
  };

  const handleDelete = () => {
    getDelete(todo.id);
  };

  return (
    <li
      className={[
        'flex w-full items-center justify-between gap-2 rounded-lg border px-3 py-2',
      ].join(' ')}
    >
      {isEdit ? (
        <>
          <input
            type="text"
            value={editTitle}
            onChange={e => setEditTitle(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 rounded-lg border bg-white px-3 py-2 outline-none focus:ring-1 focus:ring-red-300"
          />
          <div className="flex items-center gap-2">
            <button
              onClick={handleEditSave}
              className="min-w-12 border border-red-300 bg-red-300 rounded-md px-1.5 py-0.5 text-white hover:opacity-80 active:opacity-70"
            >
              저장
            </button>
            <button
              onClick={handleEditCancel}
              className="min-w-12 border border-neutral-400 bg-neutral-400 rounded-md px-1.5 py-0.5 text-white hover:opacity-80 active:opacity-70"
            >
              취소
            </button>
          </div>
        </>
      ) : (
        <div className="flex w-full items-center justify-between gap-3">
          <input
            type="checkbox"
            onChange={() => onToggle(todo.id)}
            checked={todo.completed}
            className="min-h-3.5 min-w-3.5 max-h-3.5 max-w-3.5 accent-neutral-500"
          />
          <span
            className={[
              'flex-1 whitespace-nowrap overflow-hidden text-ellipsis',
              todo.completed ? 'text-neutral-400 line-through' : 'text-neutral-700',
            ].join(' ')}
          >
            {todo.title}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handleEdit}
              className="min-w-12 border border-red-300 bg-red-300 rounded-md px-1.5 py-0.5 text-white hover:opacity-80 active:opacity-70"
            >
              수정
            </button>
            <button
              onClick={handleDelete}
              className="min-w-12 border border-neutral-400 bg-neutral-400 rounded-md px-1.5 py-0.5 text-white hover:opacity-80 active:opacity-70"
            >
              삭제
            </button>
          </div>
        </div>
      )}
    </li>
  );
};

export default TodoItem;
