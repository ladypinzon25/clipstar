import React from 'react';
import './Clip.css';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import PlayIcon from '@material-ui/icons/PlayCircleFilled';
import Slide from '@material-ui/core/Slide';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from "@material-ui/core/CircularProgress";
import Card from '@material-ui/core/Card';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';


class Clip extends React.Component {

  state = {
    screenWidth: window.innerWidth,
    hour: 0,
    min: 0,
    seg: 0
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const {screenWidth} = this.state;
    return (
      <div className="clip">
        <div className="clip__container">
        <div className="clip__bullet clip__margin"/>
        <div className="clip__title clip__margin">El mejor modo de crear un Endpoint en django</div>
        <PlayIcon className="clip__play-icon"/>
        </div>
        <div className="clip__line"/>
      </div>
    );
  }
}

export default Clip;