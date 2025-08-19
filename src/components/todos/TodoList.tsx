import { TodoType } from '../../types/todoType';
import TodoItem from './TodoItem';

type TodoListProps = {
  todos: TodoType[];
  isEdit: string | null;
  setIsEdit: React.Dispatch<React.SetStateAction<string | null>>;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  getEdit: (id: string) => void;
  getSaveEdit: (id: string, newTitle: string) => void;
};

const TodoList = ({
  todos,
  isEdit,
  setIsEdit,
  onToggle,
  onDelete,
  getEdit,
  getSaveEdit,
}: TodoListProps) => {
  const getCancel = () => {
    setIsEdit(null);
  };

  const getDelete = (id: string) => {
    onDelete(id);
    if (isEdit === id) {
      setIsEdit(null);
    }
  };

  return (
    <div>
      <h2 className="text-xl flex items-center justify-center font-semibold">할일목록</h2>
      {todos.length === 0 ? (
        <p className="mt-3 text-neutral-400">목록이 없습니다.</p>
      ) : (
        <ul className="mt-5 space-y-3 flex flex-col items-center justify-center ">
          {todos.map(item => (
            <TodoItem
              key={item.id}
              todo={item}
              isEdit={isEdit === item.id}
              onToggle={onToggle}
              getDelete={getDelete}
              getEdit={getEdit}
              getSaveEdit={getSaveEdit}
              getCancel={getCancel}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default TodoList;
