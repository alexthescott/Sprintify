import { Navigate, useNavigate } from 'react-router-dom'

import { SetBpmIcon, FilterPlaylistIcon,GeneratePlaylistIcon, LogoutIcon } from '../assets/icons'
import { hasToken, cleanCacheForLogout } from '../utils/cache'

function AppNav () {
    const navigate = useNavigate()

    const logout = () => {
        cleanCacheForLogout()
        navigate('/login')
    }

    if (!hasToken()) return <Navigate to='/login' />

    return (
    <>
    <div className="text-white bg-stone-900 fixed px-2 bottom-0 right-0 left-0 flex text-center text-[12px] md:left-0 md:top-0 md:right-auto md:w-21 md:pt-40 md:h-full md:justify-flex md:flex-d md:flex-col">
        <div className="flex-1 my-1" onClick={() => navigate("/set-bpm")}>
            <SetBpmIcon className="fill-white block mx-auto"/>
            <span>Set Bpm</span>
        </div>
        <div className="flex-1 my-1" onClick={() => navigate("/filter-playlist")}>
            <FilterPlaylistIcon className="fill-white block mx-auto"/>
            <span>Filter Playlist</span>
        </div>
        <div className="flex-1 my-1" onClick={() => navigate("/generate-playlist")}>
            <GeneratePlaylistIcon className="fill-white block mx-auto"/>
            <span>Generate Playlist</span>
        </div>
        <div className="flex-1 my-1" onClick={logout}>
            <LogoutIcon className="fill-white block mx-auto"/>
            <span>Logout</span>
        </div>
    </div>
    </>
    )
}

export default AppNav