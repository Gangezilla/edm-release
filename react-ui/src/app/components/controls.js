import React from 'react';
import PropTypes from 'prop-types';

function Controls(props) {
  return (
    <div className="controls__btn-container">
      <button
        onClick={() => props.changeToHorizontal()}
      >
        Horizontal
      </button>
      <button
        onClick={() => props.changeToVertical()}
      >
        Vertical
      </button>
      <button
        onClick={() => props.setEdit()}
      >
        Edit
      </button>
      <button
        onClick={() => props.completeSlice()}
      >
        Complete
      </button>
    </div>
  );
}

Controls.PropTypes = {
  changeToHorizontal: PropTypes.func.isRequired,
  changeToVertical: PropTypes.func.isRequired,
};

export default Controls;
