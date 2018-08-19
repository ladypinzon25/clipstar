import React, { Component } from 'react';
import './App.css';
import Media from './Media'
import axios from 'axios';

class App extends Component {
  state = {
    media: []
  }
  componentDidMount() {
    axios.get(`https://agile-gallery.herokuapp.com/api/v1/gallery/media/`)
      .then(res => {
        console.log(res);
        const media = res.data;
        this.setState({media});
      })
  }

    render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Clipstar</h1>
        </header>
        <Media media = {this.state.media}/>
      </div>
    );
  }
}

export default App;
