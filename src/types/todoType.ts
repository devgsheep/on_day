import { Dayjs } from 'dayjs';

export type TodoType = {
  id: string;
  title: string;
  completed: boolean;
  startTime?: Dayjs;
  endTime?: Dayjs;
};
