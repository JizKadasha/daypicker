import React from 'react';
import PropTypes from 'prop-types';

import { dayNames, monthNames } from '../../utils/date';
import buttonize from '../../utils/buttonize';

const Header = ({ currentDate, onMonthChange }) => (
  <div className="header">
    <div className="header__top">
      <div className="control control--left" {...buttonize(onMonthChange(-1))}>
        <div className="control__item" />
      </div>
      <div className="control control--right" {...buttonize(onMonthChange(1))}>
        <div className="control__item" />
      </div>
      <div className="header__title">{`${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`}</div>
    </div>
    <ul className="header__list">
      {dayNames.map(x => (
        <li className="header__item" key={x}>
          {x}
        </li>
      ))}
    </ul>
  </div>
);

Header.propTypes = {
  currentDate: PropTypes.instanceOf(Date).isRequired,
  onMonthChange: PropTypes.func.isRequired,
};

export default Header;
