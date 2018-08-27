import React from 'react';
import './SimpleDialogInfoMedia.css';
import Dialog from '@material-ui/core/Dialog';
import CircularProgress from "@material-ui/core/CircularProgress";

class SimpleDialogSigIn extends React.Component {

  render() {
    const {classes, onClose, selectedValue, ...other} = this.props;

    return (
      <Dialog open={this} onClose={this.props.onClose} aria-labelledby="simple-dialog-title" {...other}
              className="sig-in-dialog">
        <div className="info-dialog">
          {this.props.currentMedia ?
            <div className="log-in-page__inputs-container">
              <div className="logo-container">
                <img src="/images/logo.png" className="log-in-page__logo"/>
              </div>
              <div className="log-in-page__elements-container">
                Tìtulo: {this.props.currentMedia.fields.title}
              </div>
              <div className="log-in-page__elements-container">
                Autor: {this.props.currentMedia.fields.author}
              </div>
              <div className="log-in-page__elements-container">
                Descripción: {this.props.currentMedia.fields.description}
              </div>
              <div className="log-in-page__elements-container">
                País: {this.props.currentMedia.fields.country}
              </div>
              <div className="log-in-page__elements-container">
                Ciudad: {this.props.currentMedia.fields.city}
              </div>
              <div className="log-in-page__elements-container">
                Usuario: {this.props.currentMedia.fields.user}
              </div>
            </div>
            :
            <CircularProgress/>
          }
        </div>
      </Dialog>
    );
  }
}

export default SimpleDialogSigIn;
