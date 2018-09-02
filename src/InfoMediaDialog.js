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
import User from './api/User';
import {firebaseApp} from "./firebase";

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class InfoMediaDialog extends React.Component {

  state = {
    screenWidth: window.innerWidth,
    showNewClip: false,
    clipName: "",
    startHour: 0,
    startMin: 0,
    startSeg: 0,
    endHour: 0,
    endMin: 0,
    endSeg: 0,
    currentClips: {}
  };

  componentDidMount() {
    User.getClipsByIdVideo(this.props.currentMedia.pk, (response) => {
      this.setState({currentClips: response.data});
      console.log("CLIPS VIDEO: " + response.data)
    })
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  addClip = () => {
    User.postClip({
      name: this.state.clipName,
      start: (Number(this.state.startSeg) + Number(this.state.startMin * 60) + Number(this.state.startHour * 60 * 60)),
      end: (Number(this.state.endSeg) + Number(this.state.endMin * 60) + Number(this.state.endHour * 60 * 60)),
      idUser: this.props.currentUser.uid,
      idMedia: this.props.currentMedia.pk,
    })

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
                {this.state.currentClips.map((actual, i) => (
                  <Clip clipName={actual.fields.name} currentMedia={this.props.currentMedia}
                        startSeg={actual.fields.seg_initial} endSeg={actual.fields.seg_final} key={actual + i} />))}

                <Typography variant="headline" color="inherit"
                            className="info-media-dialog__add-clip-title">Agrega un clip</Typography>
                <div className="info-media-dialog__text-field-container">
                  <Typography variant="body1" color="inherit"
                              className="info-media-dialog__name-clip">Nombre del clip</Typography>
                  <TextField
                    id="name"
                    label="Name"
                    className="info-media-dialog__text-field-clip-name"
                    value={this.state.name}
                    onChange={this.handleChange('name')}
                    margin="normal"
                  />
                  <Typography variant="body1" color="inherit"
                              className="info-media-dialog__start-hour-clip">Tiempo de inicio del clip</Typography>
                  <div>
                    <TextField
                      id="number"
                      label="Horas"
                      value={this.state.hour}
                      onChange={this.handleChange('startHour')}
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
                      onChange={this.handleChange('startMin')}
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
                      onChange={this.handleChange('startSeg')}
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
                      onChange={this.handleChange('endHour')}
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
                      onChange={this.handleChange('endMin')}
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
                      onChange={this.handleChange('endSeg')}
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
                  <Button className="Info-media-dialog__add-clip-button" onClick={this.addClip}>
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