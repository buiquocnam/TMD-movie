import { default as dayjs } from 'dayjs';

export const formatDate = (date: string | number | Date) =>
  dayjs(date).format('MMMM D, YYYY h:mm A');
