import React from 'react';
import './SimpleDialogSigUp.css';
import Dialog from '@material-ui/core/Dialog';
import {firebaseApp} from "./firebase";
import User from './api/User';

class SimpleDialogSigIn extends React.Component {
  state = {
    nombre: "",
    apellido: "",
    email: "",
    pais: "",
    ciudad: "",
    password: ""
  };
  handleClose = () => {
    this.props.onClose(this.props.selectedValue);
  };

  handleListItemClick = value => {
    this.props.onClose(value);
  };
  singUp = () => {
    const {email, password} = this.state;
    firebaseApp.auth().createUserWithEmailAndPassword(email, password)
      .then((reponse)=> {
        User.post({
          name: this.state.nombre,
          lastName: this.state.apellido,
          email: this.state.email,
          country: this.state.pais,
          city: this.state.ciudad,
          password: this.state.password,
          idUser: reponse.user.uid
        })
      })
      .catch(error =>{
        console.log("error", error);
      });
  };

  render() {
    const {classes, onClose, selectedValue, ...other} = this.props;

    return (
      <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" {...other} className="sig-in-dialog">
        <div className="sig-up-dialog">
          <div className="log-in-page__inputs-container">
            <div className="logo-container">
              <img src="/images/logo.png" className="log-in-page__logo"/>
            </div>
            <div className="log-in-page__elements-container">
              <input type="text" placeholder="Nombres" value={this.state.nombre}
                     onChange={event => this.setState({nombre: event.target.value})}/>
            </div>
            <div className="log-in-page__line"/>
            <div className="log-in-page__elements-container">
              <input type="text" placeholder="Apellidos" value={this.state.apellido}
                     onChange={event => this.setState({apellido: event.target.value})}/>
            </div>
            <div className="log-in-page__line"/>
            <div className="log-in-page__elements-container">
              <input type="text" placeholder="Email" value={this.state.email}
                     onChange={event => this.setState({email: event.target.value})}/>
            </div>
            <div className="log-in-page__line"/>
            <div className="log-in-page__elements-container">
              <input type="text" placeholder="País" value={this.state.pais}
                     onChange={event => this.setState({pais: event.target.value})}/>
            </div>
            <div className="log-in-page__line"/>
            <div className="log-in-page__elements-container">
              <input type="text" placeholder="Ciudad" value={this.state.ciudad}
                     onChange={event => this.setState({ciudad: event.target.value})}/>
            </div>
            <div className="log-in-page__line"/>
            <div className="log-in-page__elements-container">
              <input type="text" placeholder="Password" value={this.state.password}
                     onChange={event => this.setState({password: event.target.value})}/>
            </div>
            <div className="log-in-page__line"/>
            <div>
              <button className="sign-up-button" onClick={this.singUp}>Sign Up</button>
            </div>
          </div>
        </div>
      </Dialog>
    );
  }
}

export default SimpleDialogSigIn;
