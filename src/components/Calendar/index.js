import React from 'react';
import PropTypes from 'prop-types';
import DayPicker from './DayPicker';
import Header from './Header';
import DateRange from './DateRange';
import { trimHours } from '../../utils/date';

import './style.css';

class Calendar extends React.Component {
  state = {
    // избегаем использовния constructor(), startDate - seed value для currentDate
    // eslint-disable-next-line react/destructuring-assignment
    currentDate: this.props.startDate,
    selectedDay: undefined,
  };


  onDaySelect = (x) => {
    this.setState({ selectedDay: trimHours(x) });
  }

  onMonthChange = value => () => this.setState((state) => {
    const newDate = new Date(state.currentDate);
    newDate.setMonth(newDate.getMonth() + value);
    return {
      currentDate: newDate,
    };
  });

  render() {
    const { selectedDay, currentDate } = this.state;
    return (
      <div className="calendar">
        <Header
          currentDate={currentDate}
          onMonthChange={this.onMonthChange}
        />
        <DayPicker
          currentDate={currentDate}
          onSelect={this.onDaySelect}
          selectedDay={selectedDay}
        />
        {selectedDay && <DateRange currentDate={selectedDay} />}
      </div>
    );
  }
}

Calendar.propTypes = {
  startDate: PropTypes.instanceOf(Date),
};

Calendar.defaultProps = {
  startDate: new Date(),
};

export default Calendar;
