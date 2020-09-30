import React, {Component} from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";


class Loader extends Component {
  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    isLoading: false,
  };

  constructor(props) {
    super(props);

    this.state = {}
  }

  render() {
    if (!this.props.isLoading) return null;

    return (
      <div className="lds-ellipsis__wrapper">
        <div className="lds-ellipsis">
          <div/><div/><div/><div/>
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    isLoading: state.loading.isLoading
  }),
  dispatch => ({})
)(Loader);
