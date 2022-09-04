import {useEffect, useState} from 'react';

// https://dev.to/dom_the_dev/how-to-use-the-spotify-api-in-your-react-js-app-50pn

function App() {
  const CLIENT_ID = "a71dee236b8946cdab38e88e7ed0467e"
  const REDIRECT_URI = "http:localhost:3000"
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
  const RESPONSE_TYPE = "token"

  const [token, setToken] = useState("")

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
    window.localStorage.removeItem("token")
  }

  return (
    <div class="h-screen text-center bg-indigo-50">
      <header class="">
        <h1 class="text-2xl">Sprintify</h1>
      </header>
        {!token ?
          <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login to Spotify</a>
          :
          <button onClick={logout}>Logout</button>
        }

    </div>
  );
}

export default App;
