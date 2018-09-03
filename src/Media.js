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
import Typography from "@material-ui/core/es/Typography/Typography";
import FormGroup from "@material-ui/core/es/FormGroup/FormGroup";
import FormControlLabel from "@material-ui/core/es/FormControlLabel/FormControlLabel";
import Checkbox from "@material-ui/core/es/Checkbox/Checkbox";
import Category from "./api/Category";

class Media extends Component {
  state = {
    value: 0,
    screenWidth: window.innerWidth,
    mediaDialogOpen: false,
    currentObjectMedia: null,
    categories: []
  };

  componentDidMount() {
    window.onresize = () => this.setState({screenWidth: window.innerWidth});
    this.getCategories();
  };

  getCategories() {
    Category.getAll((response) => {
      this.setState({
        categories: [{name: 'All', id: 0, selected: true}, ...response.data.map(c => {
          return {
            name: c.fields.name,
            id: c.pk,
            selected: false
          };
        })]
      });
    })
  };

  toggleCategory(index) {
    const categories = [...this.state.categories];
    categories[index].selected = !categories[index].selected;
    this.setState({categories});
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
    const {screenWidth, categories} = this.state;
    return (
      <Card className="player-card-media">
        <CardContent className="player-card-social-media__media-container">
          <div className="player-card-social-media__content">
            <Typography variant="title" color="inherit" className="header-dialog-flex">
              Media
            </Typography>
            <FormGroup row className="player-card-social-media__categories-selector">
              {categories.map((c, index) => {
                return (
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={c.selected}
                        onChange={() => this.toggleCategory(index)}
                        value={c.name}
                      />
                    }
                    label={c.name}
                  />
                )
              })
              }
            </FormGroup>
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
                    {this.props.media.filter((o) => ((o.fields.mediaType === "Video" && categories.filter(c => c.selected && c.id === o.fields.categoria || (categories.length > 0 && categories[0].selected)).length > 0))).map((tile, i) => (
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
                              <InfoIcon onClick={() => this.openMediaDialog(tile)}/>
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
                    {this.props.media.filter((o) => ((o.fields.mediaType === "Audio" && categories.filter(c => c.selected && c.id === o.fields.categoria || (categories.length > 0 && categories[0].selected)).length > 0))).map((tile, i) => (
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
                              <InfoIcon onClick={() => this.openMediaDialog(tile)}/>
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
        {this.state.mediaDialogOpen ?
          <InfoMediaDialog
            open={this.state.mediaDialogOpen}
            onClose={() => this.setState({mediaDialogOpen: false})}
            currentMedia={this.state.currentObjectMedia}
            currentUser={this.props.currentUser}
          /> : ""}
      </Card>
    );
  }
}

export default Media;