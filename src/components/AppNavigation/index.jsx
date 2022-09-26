import { NavLink, Link } from 'react-router-dom';

import { ReactComponent as SetBpmIcon } from '../../resources/icons/set_bpm.svg'
import { ReactComponent as FilterPlaylistIcon } from '../../resources/icons/filter_playlist.svg'
import { ReactComponent as GeneratePlaylist } from '../../resources/icons/generate_playlist.svg'



export default () => (
    <div className="text-white bg-stone-900 fixed px-2 bottom-0 right-0 left-0 flex text-center text-[12px] md:left-0 md:top-0 md:right-auto md:w-21 md:pt-40 md:h-full md:justify-flex md:flex-d md:flex-col">
        <div className="flex-1 my-1">
            <NavLink activeClassName="active"  to="/set-bpm">
                <SetBpmIcon className="fill-white block mx-auto"/>
                <div className="">Set Bpm</div>
            </NavLink>
        </div>
        <div className="flex-1 my-1">
            <NavLink activeClassName="active" className="flex-1 my-1" to="/filter-playlist">
                <FilterPlaylistIcon className="fill-white block mx-auto"/>
                <span className="">Filter Playlist</span>
            </NavLink>
        </div>
        <div className="flex-1 my-1">
            <NavLink activeClassName="active" className="flex-1 my-1" to="/generate-playlist">
                <GeneratePlaylist className="fill-white block mx-auto"/>
                <span className="">Generate Playlist</span>
        </NavLink>
        </div >
    </div>
)