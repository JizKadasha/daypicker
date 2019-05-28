import React from 'react';
import PropTypes from 'prop-types';
import { format } from '../../utils/date';

const DateRange = ({ currentDate }) => {
  const difference = new Date() - currentDate;
  const prefix = difference > 0 ? 'Past due' : 'Time left';
  const formatted = `${prefix}: ${format(difference).result.join(' ')}`;
  return (
    <div className="range">
      {formatted}
    </div>
  );
};

DateRange.propTypes = {
  currentDate: PropTypes.instanceOf(Date).isRequired,
};

export default DateRange;
