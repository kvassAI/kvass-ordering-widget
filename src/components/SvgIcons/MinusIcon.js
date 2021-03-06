import React from 'react';
import PropTypes from 'prop-types';

const MinusIcon = (props) => {
  const {className} = props;
  return (
    <svg className={className} height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
      <path d="M19 13H5v-2h14v2z"/>
      <path d="M0 0h24v24H0z" fill="none"/>
    </svg>
  );
};

MinusIcon.propTypes = {
  className: PropTypes.string
};

export default MinusIcon;
