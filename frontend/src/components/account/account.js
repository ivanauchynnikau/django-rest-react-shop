import React, {Component} from 'react';
import {connect} from "react-redux";
import UserProvider from "../../providers/user";
import {push} from "react-router-redux";
import {LOCAL_STORAGE_KEYS} from "../../utils/js/config";
import {handleValueChange} from "../../utils/js/utils";


class Account extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: props.user.email,
      lastName: props.user.lastName,
      firstName: props.user.firstName
    };
  }

  static defaultProps = {
    user: {},
  };

  static getDerivedStateFromProps(props) {
    return {
      email: props.user.email,
      lastName: props.user.lastName,
      firstName: props.user.firstName
    };
  }

  componentDidMount() {
    const token = localStorage.getItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
    if (!token) {
      this.props.redirectToHomePage();
      return;
    }

    this.props.userProvider.getUser(token)
      .then((user) => {
        // TODO
      })
      .catch(() => {
        this.props.redirectToHomePage();
      });
  }

  updateUserData = () => {
    console.log('update user data');
  }

  render() {
    const {
      email,
      lastName,
      firstName
    } = this.state;

    return (
      <div className="account">
        <h2>My account</h2>
        <div className="form-item">
          <label className="form-item__label" htmlFor="user-email">Email:</label>
          <input className="form-item__input"
                 type="text"
                 value={email}
                 name="email"
                 id="user-email"
                 disabled
                 onChange={(e) => {
                   handleValueChange(this, e.target.name, e.target.value)
                 }}
          />
        </div>
        <div className="form-item">
          <label className="form-item__label" htmlFor="first-name">First name:</label>
          <input className="form-item__input"
                 type="text"
                 value={firstName}
                 name="firstName"
                 id="first-name"
                 onChange={(e) => {
                   handleValueChange(this, e.target.name, e.target.value)
                 }}
          />
        </div>
        <div className="form-item">
          <label className="form-item__label" htmlFor="last-name">Last name:</label>
          <input className="form-item__input"
                 type="text"
                 value={lastName}
                 name="lastName"
                 id="last-name"
                 onChange={(e) => {
                   handleValueChange(this, e.target.name, e.target.value)
                 }}
          />
        </div>
        <button
          className="account__button button"
          onClick={this.updateUserData}
        >
          Save
        </button>
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
)(Account);
