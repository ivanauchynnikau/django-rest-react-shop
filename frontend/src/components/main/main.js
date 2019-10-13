import React, {Component} from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";

class Main extends Component {
  // static propTypes = {
  //   school: PropTypes.shape({
  //     name: PropTypes.string,
  //   }),
  // };

  // static defaultProps = {
  //   school: 'asd'
  // };

  constructor(props) {
    super(props);

    this.state = {
      test: 'test'
    };
  }


  render() {
    const {
      test
    } = this.state;

    return (
      <div>hello {test}</div>
    )
  }
}

export default connect(
  null
)(Main);
