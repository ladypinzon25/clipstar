import React from 'react';
import './InfoMediaDialog.css';
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
import Clip from './Clip'


function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class InfoMediaDialog extends React.Component {

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
      <div>
        {this.props.currentMedia ?
          <Dialog
            fullScreen
            open={this.props.open} onClose={this.props.onClose}
            TransitionComponent={Transition}>
            <AppBar className="info-media-dialog-appBar">
              <Toolbar>
                <IconButton color="inherit" onClick={this.props.onClose} aria-label="Close">
                  <CloseIcon/>
                </IconButton>
                <Typography variant="title" color="inherit" className="info-media-dialog-flex">
                  Information about {this.props.currentMedia.fields.title}
                </Typography>
              </Toolbar>
            </AppBar>
            <Card className="Info-media-dialog__container">
              <iframe src={this.props.currentMedia.fields.url} frameBorder="0"
                      allow="autoplay; encrypted-media" allowFullScreen
                      className="Info-media-dialog__video"/>
              <Typography variant="display1" color="inherit"
                          className="info-media-dialog__title-author">{this.props.currentMedia.fields.title} por {this.props.currentMedia.fields.author}</Typography>
              <div className="Info-media-dialog__container-info">
                <Typography variant="headline" color="inherit"
                            className="info-media-dialog__description-title">Description</Typography>
                <Typography variant="body1" color="inherit"
                            className="info-media-dialog__description">{this.props.currentMedia.fields.description}</Typography>
                <Typography variant="title" color="inherit"
                            className="info-media-dialog__country-city">{this.props.currentMedia.fields.country} - {this.props.currentMedia.fields.city}</Typography>
                <Typography variant="display1" color="inherit"
                            className="info-media-dialog__clips-title">Clips</Typography>
                <Clip/>
                <Typography variant="headline" color="inherit"
                            className="info-media-dialog__add-clip-title">Agrega un clip</Typography>
                <div className="info-media-dialog__text-field-container">
                  <Typography variant="body1" color="inherit"
                              className="info-media-dialog__start-hour-clip">Tiempo de inicio del clip</Typography>
                  <div>
                    <TextField
                      id="number"
                      label="Horas"
                      value={this.state.hour}
                      onChange={this.handleChange('hour')}
                      type="number"
                      className="info-media-dialog__text-field-min"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      margin="normal"
                    />
                    <TextField
                      id="number"
                      label="Minutos"
                      value={this.state.min}
                      onChange={this.handleChange('min')}
                      type="number"
                      className="info-media-dialog__text-field-min"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      margin="normal"
                    />
                    <TextField
                      id="number"
                      label="Segundos"
                      value={this.state.seg}
                      onChange={this.handleChange('seg')}
                      type="number"
                      className="info-media-dialog__text-field-seg-right"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      margin="normal"
                    />
                  </div>
                    <Typography variant="body1" color="inherit"
                                className="info-media-dialog__start-hour-clip">Tiempo de fin del clip</Typography>
                  <div>
                  <TextField
                      id="number"
                      label="Horas"
                      value={this.state.hour}
                      onChange={this.handleChange('hour')}
                      type="number"
                      className="info-media-dialog__text-field-min"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      margin="normal"
                    />
                    <TextField
                      id="number"
                      label="Minutos"
                      value={this.state.min}
                      onChange={this.handleChange('min')}
                      type="number"
                      className="info-media-dialog__text-field-min"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      margin="normal"
                    />
                    <TextField
                      id="number"
                      label="Segundos"
                      value={this.state.seg}
                      onChange={this.handleChange('seg')}
                      type="number"
                      className="info-media-dialog__text-field-seg-right"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      margin="normal"
                    />
                  </div>
                </div>
                <div className="Info-media-dialog__add-clip-button-container">
                  <Button className="Info-media-dialog__add-clip-button">
                    <Typography variant="body1" color="inherit"
                                className="info-media-dialog__add-clip-title-button">Agregar clip</Typography>
                  </Button>
                </div>
              </div>
            </Card>
          </Dialog> :
          <CircularProgress/>
        }
      </div>
    );
  }
}

export default InfoMediaDialog;