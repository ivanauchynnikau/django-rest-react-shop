import React, {Component} from 'react';

export default class Modal extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (!this.props.isOpen) return null;

    return (
      <div>
        <div className="modal">
          <div className="modal__wrapper">
            <button
              className="close-button"
              onClick={this.props.closeModal}
            >
              &#10005;
            </button>
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
}
