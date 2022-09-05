// Sprintify
// https://dev.to/dom_the_dev/how-to-use-the-spotify-api-in-your-react-js-app-50pn

import {useEffect, useState} from 'react';
import axios from 'axios';

function App() {
  const CLIENT_ID = "a71dee236b8946cdab38e88e7ed0467e"
  const REDIRECT_URI = "http:localhost:3000"
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
  const RESPONSE_TYPE = "token"

  const [token, setToken] = useState("")
  const [playlists, setPlaylists] = useState("")


  useEffect(() => {
    const hash = window.location.hash
    let token = window.localStorage.getItem("token")

    if (!token && hash) {
      token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]
      window.location.hash = ""
      window.localStorage.setItem("token", token)
    }
    
    setToken(token)
  }, [])

  const logout = () => {
    setToken("")
    setPlaylists("")
    window.localStorage.removeItem("token")
    window.localStorage.removeItem("playlists")
  }

  const getPlaylists = async (e) => {
    e.preventDefault()
    const {data} = await axios.get("https://api.spotify.com/v1/me/playlists", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    setPlaylists(data.items)
  }

  const renderPlaylists = () => {
    if (playlists){
      return playlists.map(playlist => (
        <div key={playlist.id}>
          {playlist.images.length ? <img width={"25%"} src={playlist.images[0].url} alt="" /> : <div>No Image</div>}
          {playlist.name}
        </div>
      ))
    }
  }

  return (
    <div className="h-screen text-center bg-neutral-900 text-white">
      <header>
        <h1 className="text-2xl ">Sprintify</h1>
      </header>
      <div className="grid h-screen place-items-center">
        {!token ?
          <button className="account_btn">
          <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>
            Login to Spotify
            </a>
          </button>
          :
          <div>
          <button className="account_btn" onClick={logout}>Logout</button>
          <button className="account_btn" onClick={getPlaylists}>getPlaylists()</button>
          </div>
        }

        {renderPlaylists()}
      </div>
    </div>
  );
}

export default App;
