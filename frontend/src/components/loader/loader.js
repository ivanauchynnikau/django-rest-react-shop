import React, {Component} from 'react';

export class Loader extends Component {
  constructor(props) {
    super(props);

    this.state = {}
  }

  static defaultProps = {
    isSeen: false,
  };

  render() {
    const {
      isSeen
    } = this.props;

    if (!isSeen) return null;

    return (
      <div className="lds-ellipsis__wrapper">
        <div className="lds-ellipsis">
          <div/><div/><div/><div/>
        </div>
      </div>
    );
  }
}
