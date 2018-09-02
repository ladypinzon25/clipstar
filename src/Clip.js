import React from 'react';
import './Clip.css';
import PlayIcon from '@material-ui/icons/PlayCircleFilled';
import CircularProgress from "@material-ui/core/CircularProgress";

import User from './api/User';

class Clip extends React.Component {

  state = {
    screenWidth: window.innerWidth,
    showClip: false
  };

  playClip = () => {

    this.setState({showClip: true});
    setTimeout(()=> {
      var ctrlq = document.getElementById(this.props.currentMedia.fields.url);
      var player = new window.YT.Player(this.props.currentMedia.fields.url, {
        height: ctrlq.dataset.height,
        width: ctrlq.dataset.width,
        events: {
          'onReady': function (e) {
            e.target.cueVideoById({
              videoId: ctrlq.dataset.video,
              startSeconds: ctrlq.dataset.startseconds,
              endSeconds: ctrlq.dataset.endseconds
            });
          }
        }
      });
    })

  };

  render() {
    const {screenWidth} = this.state;
    return (
      <div>
        {this.props.currentMedia ?
          <div className="clip">
            <div className="clip__container">
              <div className="clip__bullet clip__margin"/>
              <div className="clip__title clip__margin">{this.props.clipName}</div>
              <PlayIcon className="clip__play-icon" onClick={this.playClip}/>
            </div>
            <div className="clip__line"/>
            {this.state.showClip ? <div data-video={this.props.currentMedia.fields.url.split("/")[4]}
                                        data-startseconds={Number(this.props.startSeg)}
                                        data-endseconds={Number(this.props.endSeg)}
                                        data-height="480"
                                        data-width="640"
                                        className="info-media-dialog__clip-video"
                                        id={this.props.currentMedia.fields.url}>
            </div> : ""}
          </div> : <CircularProgress/>
        }
      </div>
    );
  }
}

export default Clip;