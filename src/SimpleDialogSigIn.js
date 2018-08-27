import React from 'react';
import './SimpleDialogSigIn.css';
import Dialog from '@material-ui/core/Dialog';
import LogInPage from './LogInPage';

const emails = ['username@gmail.com', 'user02@gmail.com'];
class SimpleDialogSigIn extends React.Component {
  handleClose = () => {
    this.props.onClose(this.props.selectedValue);
  };

  handleListItemClick = value => {
    this.props.onClose(value);
  };

  render() {
    const { classes, onClose, selectedValue, ...other } = this.props;

    return (
      <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" {...other} className="sig-in-dialog">
        <div className="sig-in-dialog">
          <LogInPage/>
        </div>
      </Dialog>
    );
  }
}

export default SimpleDialogSigIn;
