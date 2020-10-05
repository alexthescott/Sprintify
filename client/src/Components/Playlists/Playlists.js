import React from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
//https://github.com/jmperez/spotify-web-api-js
import './Playlists.css';

const spotifyApi = new SpotifyWebApi();

class Playlists extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			dispPlaylist: false,
			loggedIn: true,
			playlist_json: {}
		}
	}

	getPlaylists(){
		spotifyApi.getUserPlaylists()
		.then((response) => {
			this.playlist_json = response;
			console.log(this.playlist_json);
			console.log(this.playlist_json.items[0].name);
			this.setState({playlists: response.items[0].name,
						   dispPlaylist: true
			});
			this.state.dispPlaylist = true;
		})
	}

	render() {
		if (!this.state.dispPlaylist){
			return (
				<div>
					<h1>Playlist List ;p</h1>
					{this.state.loggedIn && 
						<button onClick={() => this.getPlaylists()}> 
						get the playlists
						</button>
					}
				</div>
			);
		} else{
			return(
				<div className='flex-list'>
						{(this.playlist_json.items).map((item, i)=>
							<li key = {i}> {<img src={item.images[0].url}  />} {item.name} </li> 
							)}
				</div>
			)
		}
	}
}

export default Playlists;
