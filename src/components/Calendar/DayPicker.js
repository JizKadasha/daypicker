import React from 'react';
import PropTypes from 'prop-types';
import { daysOfMonth, isTheSameDay, dayNames } from '../../utils/date';
import buttonize from '../../utils/buttonize';

const Day = ({ num, day }) => (
  <div className="day">
    <div className="day__value">
      {num}
    </div>
    <div className="day__tooltip">
      {dayNames[day]}
    </div>
  </div>
);

Day.propTypes = {
  num: PropTypes.number.isRequired,
  day: PropTypes.number.isRequired,
};

const DayPicker = ({
  currentDate = new Date(),
  selectedDay,
  onSelect,
}) => {
  const days = Array.from(daysOfMonth(currentDate))
    .map(x => ({
      value: x,
      num: x.getDate(),
      day: x.getDay(),
    }));
  const emptyDays = Array(days[0].day).fill();
  const selectHandler = date => () => onSelect(date);

  return (
    <div className="day-picker">
      <ul className="day-picker__list">
        {emptyDays.map((_, i) => (
          // ничего уникального у пустых элементов
          // eslint-disable-next-line react/no-array-index-key
          <li key={`empty-${i}`} className="day-picker__item day-picker__item--empty" />
        ))}
        {days.map(x => (
          <li
            className={`day-picker__item ${isTheSameDay(selectedDay, x.value) ? 'day-picker__item--active' : ''}`}
            key={x.value}
            {...buttonize(selectHandler(x.value))}
          >
            <Day {...x} />
          </li>
        ))}
      </ul>
    </div>
  );
};

DayPicker.propTypes = {
  currentDate: PropTypes.instanceOf(Date).isRequired,
  selectedDay: PropTypes.instanceOf(Date),
  onSelect: PropTypes.func.isRequired,
};

DayPicker.defaultProps = {
  selectedDay: new Date(),
};

export default DayPicker;
