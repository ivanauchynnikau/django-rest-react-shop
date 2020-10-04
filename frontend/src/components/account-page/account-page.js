import React, {Component} from 'react';
import {connect} from "react-redux";
import UserProvider from "../../providers/user";
import {push} from "react-router-redux";
import {LOCAL_STORAGE_KEYS} from "../../utils/js/config";
import {
  getError,
  handleValueChange
} from "../../utils/js/utils";
import {NotificationManager} from 'react-notifications';


class AccountPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditMode: false,
      newLastName: props.user.lastName,
      newFirstName: props.user.firstName
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
      .catch(() => {
        this.props.redirectToHomePage();
      });
  }

  changeMode = () => {
    this.setState({isEditMode: !this.state.isEditMode});
  }

  updateUserData = () => {
    const token = localStorage.getItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
    if (!token) {
      this.props.redirectToHomePage();
      return;
    }

    this.props.userProvider.updateUser({
      firstName: this.state.newFirstName,
      lastName: this.state.newLastName,
      authToken: token,
    })
      .then(() => {
        this.setState({isEditMode: false});
        NotificationManager.success('User details was updated!');
      })
      .catch((error) => {
        NotificationManager.error(getError(error));
      });
  }

  render() {
    const {
      email,
      lastName,
      firstName,
      isEditMode,
      newFirstName,
      newLastName
    } = this.state;

    return (
      <div className="account-page">
        <div className="account-page__top">
          <h2>My account</h2>
          <button
            className="account-page__edit-button"
            onClick={this.changeMode}
          >
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M34.8538 1.14613C36.1662 2.45854 36.1641 4.58582 34.8538 5.89823L33.2701 7.48191L28.517 2.7298L30.1006 1.14613C31.413 -0.165175 33.5413 -0.166291 34.8538 1.14613ZM11.0966 20.1524L9.51401 26.487L15.8487 24.9034L31.6864 9.06559L26.9333 4.31348L11.0966 20.1524ZM26.8786 17.0419V31.5202H4.47977V9.12135H18.9591L23.4378 4.64158H0V35.9999H31.3583V12.561L26.8786 17.0419Z" fill="#1BA098"/></svg>
          </button>
        </div>
        <div className="account-page__content">
          <div className="form-item">
            <label className="form-item__label" htmlFor="user-email">Email:</label>
            <input className="form-item__input"
                   type="text"
                   value={email}
                   name="email"
                   id="user-email"
                   disabled
            />
          </div>
          <div className="form-item">
            <label className="form-item__label" htmlFor="first-name">First name:</label>
            {
              isEditMode ?
              <input
                className="form-item__input"
                type="text"
                value={newFirstName}
                name="newFirstName"
                id="first-name"
                onChange={(e) => {
                 handleValueChange(this, e.target.name, e.target.value)
                }}
              />
              :
              <input
                className="form-item__input"
                type="text"
                disabled
                value={firstName}
                name="firstName"
                id="first-name"
              />
            }
          </div>
          <div className="form-item">
            <label className="form-item__label" htmlFor="last-name">Last name:</label>
            {
              isEditMode ?
                <input
                  className="form-item__input"
                  type="text"
                  value={newLastName}
                  name="newLastName"
                  id="last-name"
                  onChange={(e) => {
                  handleValueChange(this, e.target.name, e.target.value)
                  }}
                />
                :
                <input
                  className="form-item__input"
                  type="text"
                  disabled
                  value={lastName}
                  name="lastName"
                  id="last-name"
                />
            }
          </div>
          {
            isEditMode ?
            <button
              className="account-page__button button"
              onClick={this.updateUserData}
            >
              Save
            </button>
            : null
          }
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
)(AccountPage);
