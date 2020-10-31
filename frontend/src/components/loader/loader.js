import * as React from "react";
import * as PropTypes from "prop-types";
import {Component} from 'react';
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
      <div
        data-locator="loading"
        className="lds-ellipsis__wrapper"
      >
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
