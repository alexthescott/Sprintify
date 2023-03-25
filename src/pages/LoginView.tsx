import React, { useEffect, useState } from "react"
import { AUTH_URL } from "../services/spotify/auth"
import { hasToken } from "../utils/cache"

import { useNavigate } from "react-router-dom"
import Modal from "../components/Modal"
import InfoPane from "../components/InfoPane"

function LoginView() {
  const navigate = useNavigate()
  const [aboutOpen, setAboutOpen] = useState(false)

  useEffect(() => {
    if (hasToken()) navigate("/app")
  }, [navigate])

  return (
    <div className="overflow-auto fixed left-0 md:bottom-0 w-full justify-center items-center h-full bg-black text-white left-21">
      <span className={"flex justify-center items-center h-screen bg-black " + (aboutOpen ? "blur-sm" : "blur-none")}>
        <div>
          {/* Login icon and AppInfo link? */}

          <div className="relative container grid place-items-center gap-4">
            <h1 className="fixed top-10 text-2xl text-white p-0">Filter Your Spotify Playlists by BPM</h1>
            <a href={AUTH_URL}>
              <div className="account_btn items-center">Sign in with Spotify</div>
            </a>
            {/* App info 'What is this button?' */}
            <button
              className="bg-stone-900 px-6 py-2.5 text-xs leading-tight uppercase rounded shadow-md"
              onClick={() => setAboutOpen(true)}
            >
              About
            </button>
          </div>
        </div>
      </span>
      <Modal isOpen={aboutOpen}>
        <div className="bg-black border-0 rounded-lg shadow-lg relative flex flex-col w-full outline-none focus:outline-none">
          <InfoPane />
          <button
            onClick={() => setAboutOpen(false)}
            className="mt-8 mx-auto w-fit text-center bg-green-600 text-white font-medium text-sm leading-tight rounded p-1 px-2"
          >
            OK
          </button>
        </div>
      </Modal>
    </div>
  )
}

export default LoginView
