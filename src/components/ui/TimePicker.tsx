import { TimePicker } from 'antd';
import dayjs from 'dayjs';

export const format = 'HH:mm';

// 시간
export const startTime = dayjs('12:00', 'HH:mm');
export const endTime = dayjs('12:00', 'HH:mm');

<TimePicker.RangePicker defaultValue={[startTime, endTime]} format={format} />;
