import React, {Component} from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import Button from '@material-ui/core/Button';
import ProductList from './../product-list/product-list';

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
    return (
      <div>
        <ProductList/>
      </div>
    )
  }
}

export default connect(
  null
)(Main);
