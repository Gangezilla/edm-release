import React, { Component } from 'react';

import '../../styles/image-canvas.scss';

class ImageCanvas extends Component {

  constructor(props) {
    super(props);
    this._onMouseMove = this._onMouseMove.bind(this);
    this.sliceAction = this.sliceAction.bind(this);
    this.state = { x: 0, y: 0 };
  }

  _onMouseMove(e) {
    const rect = document.getElementById('image-overlay').getBoundingClientRect();
    this.setState(
      {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      },
    );
  }

  sliceAction(x, y, sliceType) {
    if (sliceType === 'edit') {
      this.props.updateSidePanel(x, y);
    } else {
      this.props.newSlice(x, y, sliceType);
    }
  }

  renderSlices(slices, imageDimensions, moveStart, moveEnd) {
    return (
      <div
        className="image-canvas-slice-container"
        style={{
          height: imageDimensions.height,
          width: imageDimensions.width,
        }}
      >
        {slices.map(slice => (
          <div
            key={slice.id}
            className="image-canvas-rendered-slice"
            onDragStart={() => moveStart(slice)}
            onDragEnd={() => moveEnd()}
            style={{
              top: slice.y1,
              left: slice.x1,
              height: slice.y2 - slice.y1,
              width: slice.x2 - slice.x1,
            }}
          />
        ))}
      </div>
    )
  };

  render() {
    const { x, y } = this.state;
    return (
      <div className="image-canvas-image-canvas">
        <span> Mouse coords { x } { y } </span>
        <p>{ this.props.uploadedImage.name }</p>
        <div
          id="image-overlay"
          className="image-canvas-image-overlay"
          onClick={() => this.sliceAction(x, y, this.props.sliceMode)}
          onMouseMove={this._onMouseMove}
        >
          {this.renderSlices(
            this.props.slicePositions, this.props.imageDimensions, this.props.moveStart, this.props.moveEnd,
            )}
          <img
            className="image-canvas-uploaded-image"
            src={this.props.uploadedImage.preview}
            alt={this.props.uploadedImage.name}
          />
        </div>
      </div>
    );
  }
}

export default ImageCanvas;
