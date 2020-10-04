import React, {Component} from 'react';
import {connect} from "react-redux";
import UserProvider from "../../providers/user";
import {push} from "react-router-redux";


class OrdersListPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // isEditMode: false,
      // newLastName: props.user.lastName,
      // newFirstName: props.user.firstName
    };
  }

  // static defaultProps = {
  //   user: {},
  // };

  // static getDerivedStateFromProps(props) {
  //   return {
  //     email: props.user.email,
  //     lastName: props.user.lastName,
  //     firstName: props.user.firstName
  //   };
  // }

  // componentDidMount() {
  //   const token = localStorage.getItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
  //   if (!token) {
  //     this.props.redirectToHomePage();
  //     return;
  //   }
  //
  //   this.props.userProvider.getUser(token)
  //     .catch(() => {
  //       this.props.redirectToHomePage();
  //     });
  // }

  render() {
    const {} = this.state;

    return (
      <div className="orders-list-page">
        <h2>My orders</h2>
        <div className="orders-list-page__list">
          <div className="orders-list-page__list-item">
            123
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    user: state.user.user
  }),
  dispatch => ({
    userProvider: new UserProvider(dispatch),
    redirectToHomePage: () => {dispatch(push('/'))},
  })
)(OrdersListPage);
