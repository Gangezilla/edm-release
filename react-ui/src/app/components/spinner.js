import React from 'react';

const Spinner = (props) => (
  <div className="spinner__container">
    {props.spinner &&
      <span> Spinner </span>
    }
  </div>
);

export default Spinner;
