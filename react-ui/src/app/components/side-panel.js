import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '../../styles/side-panel.scss';

// on update/save too, check the link, jam a http:// in front of whatever is there if it doesn't have one. just additiona;l error prevention...

class SidePanel extends Component {

  fullPanel(slice, updateSlice, deleteSlice, closePanel) {
    return (
      <div className="side-panel-container">
        <button onClick={() => closePanel()}>
          Close Panel
        </button>
        <h2> Full woo </h2>
        <p> {slice.id} </p>
        <p> {slice.height} </p>
        <p> Link:
          <input ref="href" type="text" placeholder={slice.href} />
        </p>
        <p> Alt/Title:
          <input ref="title" type="text" placeholder={slice.title} />
        </p>
        <div className="side-panel-update-button">
          <button onClick={() => updateSlice(this.refs.href.value, this.refs.title.value, slice)}> Update/Save </button>
        </div>
        <div className="side-panel-delete-button">
          <button onClick={() => deleteSlice(slice)}>
            Delete Slice
          </button>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.props.isPanelActive === true && (
          this.fullPanel(
            this.props.selectedSlice, this.props.updateSlice, this.props.deleteSlice, this.props.closePanel,
          )
          )
        }
      </div>
    );
  }
}

SidePanel.PropTypes = {
  selectedSlice: PropTypes.object.isRequired,
};

export default SidePanel;
