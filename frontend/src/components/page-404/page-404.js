import React, {Component} from 'react';

export default class Page404 extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="page-404">
        <div className="page-404__container">
          <div className="page-404__title">404</div>
          <div className="page-404__text">Sorry, the page is missing</div>
          <a  href="/" className="button">Go to homepage</a>
        </div>
      </div>
    )
  }
}
