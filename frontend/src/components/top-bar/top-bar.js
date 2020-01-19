import React, {Component} from 'react';
import {connect} from "react-redux";
import LogInModal from './../login-modal/login-modal';


// TODO add props description!

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoginModalSeen: false,
      isSignUpModalSeen: false
    };

    this.openLoginModal = this.openLoginModal.bind(this);
    this.openSignUpModal = this.openSignUpModal.bind(this);
    this.closeLoginModal = this.closeLoginModal.bind(this);
  }

  closeLoginModal () {
    this.setState({isLoginModalSeen: false});
  }

  openLoginModal () {
    this.setState({isLoginModalSeen: true});
  }

  openSignUpModal () {
    this.setState({isSignUpModalSeen: true});
  }

  render() {
    const {
      isLoginModalSeen
    } = this.state;

    return (
      <div className="top-bar">
        <div className="top-bar__wrapper">
          <div className="top-bar__left">
            <span>LOGO</span> {/*TODO add logo image*/}
          </div>
          <div className="top-bar__right">
            <button
              className="button top-bar__button"
              onClick={this.openLoginModal}
            >Login</button>

            <button
              className="button top-bar__button"
              onClick={this.openSignUpModal}
            >Register</button>
          </div>
        </div>
        {
          isLoginModalSeen ?
          <LogInModal
            closeLoginModal={this.closeLoginModal}
          />
          : null
        }

      </div>
    )
  }
}

export default connect(
  null
)(Main);
