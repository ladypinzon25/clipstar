import React, {Component} from 'react';
import './App.css';
import Media from './Media'
import axios from 'axios';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import SimpleDialogSignIn from './SimpleDialogSigIn';
import SimpleDialogSignUp from './SimpleDialogSigUp';
import EditUserFormDialog from './EditUserFormDialog';
import {firebaseApp} from "./firebase";
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import User from './api/User';

const emails = ['username@gmail.com', 'user02@gmail.com'];

class App extends Component {
  state = {
    media: [],
    openSignIn: false,
    openSignUp: false,
    openEditUserForm: false,
    openMediaDialog: false,
    selectedValue: emails[1],
    loggedIn: false,
    currentUser: null,
    auth: true,
    anchorEl: null,
    lastSignUpInfo: {}
  };

  componentWillMount() {
    this.auth();
  }
  handleChange = (event, checked) => {
    this.setState({ auth: checked });
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
    this.logout();
  };

  auth = () => {
    firebaseApp.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({loggedIn: true, currentUser: user, openSignIn: false, openSignUp: false});
        this.getUser(user.uid);
      }
      else {
        this.setState({loggedIn: false});
      }
    })
  };

  getUser = (id) => {
    User.get(id, (response) => {
      console.log(response);
    })
  };

  logout = () => {
    firebaseApp.auth().signOut()
      .then(() => {
        this.setState({
          currentUser: null,
          loggedIn: false
        });
      });
  };

  handleClickOpenSignIn = () => {
    this.setState({
      openSignIn: true,
    });
  };

  handleCloseSignIn = value => {
    this.setState({selectedValue: value, openSignIn: false});
  };

  handleCloseInfo = value => {
    this.setState({selectedValue: value, openInfo: false});
  };

  handleClickOpenSignUp = () => {
    this.setState({
      openSignUp: true,
    });
  };

  handleCloseSignUp = value => {
    this.setState({selectedValue: value, openSignUp: false});
  };

  toggleMediaDialog = () => {
    this.setState({openMediaDialog: !this.state.openMediaDialog})
  };

  componentDidMount() {
    axios.get(`https://agile-gallery.herokuapp.com/api/v1/gallery/media/`)
      .then(res => {
        console.log(res);
        const media = res.data;
        this.setState({media});
      })
  }

  handleClickOpenEditUserForm = () => {
    this.setState({
      openEditUserForm: true,
    });
  };
  handleClickCloseEditUserForm = value => {
    this.setState({
      openEditUserForm: false, 
    });
  };
  render() {
    const { auth, anchorEl } = this.state;
    const open = Boolean(anchorEl);
    return (
      <div className="App">
        <div className="root">
          <AppBar position="static">
            <Toolbar>
              <Typography variant="title" color="inherit" className="flex">
                <img src="/images/logo.png" className="logo-bar"/>
              </Typography>
              {this.state.currentUser === null ?
                <div className="container-app-buttons">
                  <Button color="inherit" onClick={this.handleClickOpenSignIn}>Sign In</Button>
                  <Button color="inherit" onClick={this.handleClickOpenSignUp}>Sign Up</Button>
                </div> :
                <div>
                  <div>
                    <div className="container-info-user-tab">
                      <div>{this.state.currentUser.email}</div>
                    <IconButton
                      aria-owns={open ? 'menu-appbar' : null}
                      aria-haspopup="true"
                      onClick={this.handleMenu}
                      color="inherit"
                    >
                      <AccountCircle />
                    </IconButton>
                    </div>
                    <Menu
                      id="menu-appbar"
                      anchorEl={anchorEl}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      open={open}
                      onClose={this.handleClose}
                    >
                      <MenuItem onClick={this.handleClickOpenEditUserForm}>Profile</MenuItem>
                      <MenuItem onClick={this.handleClose}>Sign out</MenuItem>
                    </Menu>
                  </div>
                  <div>
                  <EditUserFormDialog
                  open={this.state.openEditUserForm}
                  onClose={()=> this.setState({openEditUserForm: false})}
                  currentIdUser={this.state.currentUser.uid}/>
        </div>
                </div>
              }
            </Toolbar>
          </AppBar>
        </div>
        <div>
          <SimpleDialogSignIn
            selectedValue={this.state.selectedValue}
            open={this.state.openSignIn}
            onClose={this.handleCloseSignIn}
          />
        </div>
        <div>
          <SimpleDialogSignUp
            selectedValue={this.state.selectedValue}
            open={this.state.openSignUp}
            onClose={this.handleCloseSignUp}
            createUser={(data)=> this.setState({lastSignUpInfo: {...data}})}
          />
        </div>
        <Media media={this.state.media} currentUser={this.state.currentUser} toggleMediaDialog={this.toggleMediaDialog}/>
      </div>
    );
  }
}

export default App;
