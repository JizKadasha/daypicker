/* eslint-disable no-confusing-arrow */

export function* daysOfMonth(d) {
  const date = new Date(d);
  date.setDate(1);
  while (date.getMonth() === d.getMonth()) {
    yield new Date(date);
    date.setDate(date.getDate() + 1);
  }
}

export const isTheSameDay = (a, b) => a.getDate() === b.getDate()
  && a.getMonth() === b.getMonth()
  && a.getFullYear() === b.getFullYear();

export const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Th', 'Fri', 'Sat'];

export const monthNames = ['Jan', 'Feb', 'March', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const toFormatObject = x => ({ value: x, result: [] });

const initUnits = (num, fn) => ({ value, result = [] }) => (x => ({
  value: value % num,
  result: x ? [...result, `${x} ${fn(x)}`] : result,
}))(Math.floor(value / num));

const pluralOr = (a, b) => x => x === 1 ? a : b;

const years = initUnits(24 * 60 * 60 * 1000 * 365, pluralOr('year', 'years'));
const months = initUnits(24 * 60 * 60 * 1000 * 30, pluralOr('month', 'months'));
const days = initUnits(24 * 60 * 60 * 1000, pluralOr('day', 'days'));
const hours = initUnits(60 * 60 * 1000, pluralOr('hour', 'hours'));

const pipe = (...fns) => fns.reduce((a, b) => (...args) => b(a(...args)));

const lessThanHour = ({ value, result }) => value < 60 * 60 * 1000 ? ({ value: 0, result: ['less than 1 day'] }) : ({ value, result });

export const format = pipe(
  Math.abs,
  toFormatObject,
  lessThanHour,
  years,
  months,
  days,
  hours,
);

export const trimHours = (x) => {
  const newDate = new Date(x);
  newDate.setHours(0, 0, 0, 0);
  return newDate;
};
