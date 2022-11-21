import { Route, Routes, Navigate } from 'react-router-dom'
import AppNav from '../components/AppNav'
import BpmInput from '../components/BpmInput'
import FilterPlaylist from '../components/FilterPlaylist'


function AppView() {
    return (
        <div className="pt-0">
            <div className="relative min-h-full pb-12">
                {/*Popups?*/}
                <div className="overflow-y-auto App-content fixed left-0 bottom-4 md:bottom-0 md:left-[52px] w-full flex justify-center items-center h-screen bg-black text-white left-21">
                    <Routes>
                        <Route path="*" element={<Navigate to="/set-bpm" replace/>} />
                        <Route path="set-bpm" element={<BpmInput onChange={console.log} />}></Route>{/* Pretty broken right now */}
                        <Route path="filter-playlist" element={<FilterPlaylist />}></Route>
                        <Route path="generate-playlist" element={<p>generate-playlist</p>}></Route>
                    </Routes>
                </div>
                <AppNav />
            </div>
        </div>
    )
}

export default AppView