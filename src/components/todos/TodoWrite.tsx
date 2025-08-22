import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import { TodoType } from '../../types/todoType';
import { ConfigProvider, TimePicker } from 'antd';
import { endTime, format, startTime } from '../ui/TimePicker';
import dayjs, { Dayjs } from 'dayjs';

type TodoWriteType = {
  handleTodoUpdate: (newTodo: TodoType) => void;
};

const TodoWrite = ({ handleTodoUpdate }: TodoWriteType) => {
  const [title, setTitle] = useState<string>('');
  const [time, setTime] = useState<[Dayjs | null, Dayjs | null]>([null, null]);

  const handleTimeChange = (
    values: [Dayjs | null, Dayjs | null] | null,
    dateStrings: [string, string],
  ) => {
    setTime(values ?? [null, null]);
    console.log(dateStrings);
  };

  const handlechange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAdd();
    }
  };

  const handleAdd = () => {
    if (!time || time[0] === null || time[1] === null) {
      return;
    }

    if (title.trim()) {
      const newTodo: TodoType = {
        id: Date.now().toString(),
        title: title,
        completed: false,
        startTime: time[0],
        endTime: time[1],
      };
      handleTodoUpdate(newTodo);
      setTitle('');
      setTime([null, null]);
    }
  };

  const isButtonDisabled = !title.trim() || !time[0] || !time[1];

  return (
    <div className="flex items-center gap-2">
      <TimePicker.RangePicker
        format={format}
        className="w-36 py-2 rounded-lg border-red-100 bg-white px-3 focus:!outline-none focus:!border-red-300"
        value={time}
        onChange={handleTimeChange}
      />
      <input
        type="text"
        value={title}
        onChange={e => handlechange(e)}
        onKeyDown={handleKeyDown}
        className="flex-1 rounded-lg border border-neutral-300 bg-white px-3 py-2 outline-none focus:ring-1 focus:ring-red-300"
      />
      <button
        onClick={handleAdd}
        className={`rounded-lg border px-3 py-2 text-white transition-all duration-200 ${
          isButtonDisabled
            ? 'border-gray-300 bg-gray-300 cursor-not-allowed opacity-50 pointer-events-none'
            : 'border-red-300 bg-red-300 hover:opacity-80 active:opacity-70 cursor-pointer'
        }`}
        disabled={isButtonDisabled}
        type="button"
      >
        등록
      </button>
    </div>
  );
};

export default TodoWrite;
