import React, {Component} from 'react';
import './Media.css';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import InfoMediaDialog from "./InfoMediaDialog";

class Media extends Component {
  state = {
    value: 0,
    screenWidth: window.innerWidth,
    mediaDialogOpen: false,
    currentObjectMedia: null
  };

  componentDidMount() {
    window.onresize = () => this.setState({screenWidth: window.innerWidth});
  }

  handleChange = (event, value) => {
    this.setState({value});
  };

  handleChangeIndex = index => {
    this.setState({value: index});
  };

  openMediaDialog = (mediaObject) => {

    this.setState({mediaDialogOpen: true, currentObjectMedia: mediaObject});
  };

  render() {
    const {screenWidth} = this.state;

    return (
      <Card className="player-card-media">
        <CardContent className="player-card-social-media__media-container">
          <div className="player-card-social-media__content">
            <AppBar position="static" color="default">
              <Tabs value={this.state.value} onChange={this.handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    fullWidth>
                <Tab label="Videos" className="player-card-media__media-bar-value"/>
                <Tab label="Audios" className="player-card-media__media-bar-value"/>
              </Tabs>
            </AppBar>
            <SwipeableViews index={this.state.value} onChangeIndex={this.handleChangeIndex}>
              <div className="media-container__option">
                <div className="player-card-media__grid-container">
                  <GridList cellHeight={180} className="player-card-media__grid-list"
                            cols={screenWidth < 750 ? 2 : screenWidth < 1360 ? 3 : Math.floor(screenWidth / 350)}>
                    {this.props.media.filter((o) => (o.fields.mediaType === "Video")).map((tile, i) => (
                      <GridListTile key={tile + i}>
                        <iframe width="100vw" height="180"
                                src={tile.fields.url} frameBorder="0"
                                allow="autoplay; encrypted-media" allowFullScreen
                                className={screenWidth < 750 ? "media-container-videos-2" : screenWidth < 1360 ? "media-container-videos-3" : ("media-container-videos-" + Math.floor(screenWidth / 350))}/>
                        <GridListTileBar
                          title={tile.fields.author}
                          subtitle={<span>by: user1</span>}
                          className="info"
                          actionIcon={
                            <IconButton className="player-card-media__icon">
                              <InfoIcon onClick = {() => this.openMediaDialog(tile)}/>
                            </IconButton>
                          }
                        />
                      </GridListTile>
                    ))}
                  </GridList>
                </div>
              </div>
              <div className="media-container__option">
                <div className="player-card-media__grid-container">
                  <GridList cellHeight={180} className="player-card-media__grid-list"
                            cols={screenWidth < 750 ? 2 : screenWidth < 1360 ? 3 : Math.floor(screenWidth / 350)}>
                    {this.props.media.filter((o) => (o.fields.mediaType === "Audio")).map((tile, i) => (
                      <GridListTile key={tile + i}>
                        <iframe width="100vw" height="180"
                                src={tile.fields.url} frameBorder="0"
                                allow="autoplay; encrypted-media" allowFullScreen
                                className={screenWidth < 750 ? "media-container-videos-2" : screenWidth < 1360 ? "media-container-videos-3" : ("media-container-videos-" + Math.floor(screenWidth / 350))}/>
                        <GridListTileBar
                          title={tile.fields.author}
                          subtitle={<span>by: user1</span>}
                          className="info"
                          actionIcon={
                            <IconButton className="player-card-media__icon">
                              <InfoIcon onClick = {() => this.openMediaDialog(tile)}/>
                            </IconButton>
                          }
                        />
                      </GridListTile>
                    ))}
                  </GridList>
                </div>
              </div>
            </SwipeableViews>
          </div>
        </CardContent>
        <InfoMediaDialog
          open={this.state.mediaDialogOpen}
          onClose={()=> this.setState({mediaDialogOpen: false})}
          currentMedia = {this.state.currentObjectMedia}
        />
      </Card>
    );
  }
}

export default Media;