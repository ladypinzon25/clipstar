import React, {Component} from 'react';
import Lock from '@material-ui/icons/LockOutline';
import Identity from '@material-ui/icons/PermIdentity';
import User from './api/User';
import './LogInPage.css';

class LogInPage extends Component {
  state = {
    email: "",
    password: ""
  };

  singIn = () => {
    const {email, password} = this.state;

    User.signIn({login:email, password}, (response)=>{
      const user = response.data[0].fields;
      this.props.changeUser(user);
      this.setState({email: '', password: ''});
    });
  };

  render() {
    return (
      <div className="log-in-page">
        <div className="log-in-page__inputs-container">
          <div className="logo-container">
            <img src="/images/logo.png" className="log-in-page__logo"/>
          </div>
          <div className="log-in-page__elements-container">
            <Identity className="log-in-page__icon"/>
            <input type="text" placeholder="username" value={this.state.email} onChange={event => this.setState({email: event.target.value})}/>
          </div>
          <div className="log-in-page__line"/>
          <div className="log-in-page__elements-container">
            <Lock className="log-in-page__icon"/>
            <input type="password" placeholder="password" value={this.state.password} onChange={event => this.setState({password: event.target.value})}/>
          </div >
          <div className="log-in-page__line"/>
          <div className="log-in-page__container-text-forgot-password">
            <div className="log-in-page__forgot-password">Forgot password</div>
          </div>
          <button className="sign-in-button" onClick={this.singIn}>Sign In</button>
          <div className="log-in-page__container-text-new-account">
            <div className="log-in-page__new-account">Don´t have an account? Sign Up</div>
          </div>
        </div>
      </div>
    );
  }
}

export default LogInPage;
