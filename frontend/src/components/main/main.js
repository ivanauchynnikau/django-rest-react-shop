import React, {Component} from 'react';
import {connect} from "react-redux";
import ProductList from './../product-list/product-list';
import TopBar from '../top-bar/top-bar';

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      test: 'test'
    };
  }


  render() {
    return (
      <React.Fragment>
        <TopBar/>
        <ProductList/>
      </React.Fragment>
    )
  }
}

export default connect(
  null
)(Main);
