import React from 'react';
import './EditUserFormDialog.css';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from "@material-ui/core/CircularProgress";
import Card from '@material-ui/core/Card';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import User from './api/User';


function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class EditUserFormDialog extends React.Component {
state = {
  screenWidth: window.innerWidth,
  userEdit:{} 
}
  

  componentWillMount() {
    console.log('componentWillMount ---->'+this.props.currentIdUser);

    this.getUser(this.props.currentIdUser);

  }

  componentDidMount() {
    console.log('componentDidMount ---->'+this.props.currentIdUser);
    
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  getUser = (id) => {
  User.get(id, (response) => {
  // this.setState(() => ({ userEdit : response.data[0].fields}))
  // this.setState({
  //   nombre:this.state.userEdit.name,
  //   apellido:this.state.userEdit.lastName,
  //   email:this.state.userEdit.email,
  //   pais:this.state.userEdit.country,
  //   ciudad:this.state.userEdit.city,
  //   password:this.state.userEdit.password
  // });
    });
/*
const url = 'https://jsonplaceholder.typicode.com/users/1';
   
axios.get(url)
.then((userEdit) => {

  this.setState(() => ({ userEdit : userEdit.data}))
  this.setState({ 
    nombre:this.state.userEdit.name,
    apellido:this.state.userEdit.lastName,
    email:this.state.userEdit.email,
    pais:this.state.userEdit.country,
    ciudad:this.state.userEdit.city,
    password:this.state.userEdit.password
  });
  console.log('userEdit====='+this.state.userEdit.name);
      })
    .catch(err => {
        console.log(err);
    })*/

  };

  updateUser = () => {
    User.post({
      name: this.state.nombre,
      lastName: this.state.apellido,
      email: this.state.email,
      country: this.state.pais,
      city: this.state.ciudad,
      password: this.state.password,
      idUser: this.props.currentIdUser
    });
  };

  render() {
    const {screenWidth} = this.state;
    return (
      <Dialog  fullScreen
      open={this.props.open} onClose={this.props.onClose}
      TransitionComponent={Transition}>

       <AppBar className="header-dialog-appBar">
              <Toolbar>
                <IconButton color="inherit" onClick={this.props.onClose} aria-label="Close">
                  <CloseIcon/>
                </IconButton>
                <Typography variant="title" color="inherit" className="header-dialog-flex">
                  Edit User Information 
                </Typography>
              </Toolbar>
            </AppBar>
            <Card className="content-dialog__container">
        
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
              <button className="sign-up-button" onClick={this.updateUser}>Update</button>
            </div>
          </div>
        </div>
      </Card>
      </Dialog>
      
    );
  }
}

export default EditUserFormDialog;