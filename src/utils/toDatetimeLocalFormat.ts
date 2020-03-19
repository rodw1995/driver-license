import { map } from 'ramda';

const ten = (i: number) => (i < 10 ? '0' : '') + i;
const delimiters = ['-', '-', 'T', ':', ':'];

/**
 * Format a date to a value that DatetimeLocal accepts
 *
 * @param date
 */
export default (date: Date) => {
  const values = [
    date.getFullYear().toString(),
    ...map(ten)([date.getMonth() + 1, date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()]),
  ];

  return values.reduce((prev, value, index) => prev + value + (delimiters[index] || ''), '');
};
