import React from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import Navbar from "react-bootstrap/NavBar"
import Nav from "react-bootstrap/Nav"
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

//https://github.com/jmperez/spotify-web-api-js

// local Imports
import Playlist from './Components/Playlists/Playlists.js'
import NavBar from './Segments/Sprint_Navbar.jsx'

class App extends React.Component {
  constructor(){
    super();
    const params = this.getHashParams();
    const token = params.access_token;
    const spotifyApi = new SpotifyWebApi();
    
    if (token){
      spotifyApi.setAccessToken(token);
    }
    this.state = {
      loggedIn: token ? true : false,
      nowPlaying: { name: 'Not Checked', albumArt: ' '},
    }
  }
  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    e = r.exec(q)
    while (e) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
      e = r.exec(q);
    }
    return hashParams;
  }

  render() {
    if (!this.state.loggedIn){
      return (
        <div className='App'>
          <NavBar loggedIn={this.state.loggedIn}/>
        </div>
      );
    } else {
      return(
        <Playlist/>
      );
    }
  }
}

export default App;
