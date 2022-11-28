import { Route, Routes, Navigate } from 'react-router-dom'
import AppNav from '../components/AppNav'
import BpmInput from '../components/BpmInput'
import FilterPlaylist from '../components/FilterPlaylist'


function AppView() {
    return (
        <div className="pt-0">
            <div className="relative min-h-full pb-12">
                {/*Popups?*/}
                <div className="overflow-auto fixed left-0 bottom-4 md:bottom-0 md:left-[52px] w-full justify-center items-center h-full bg-black text-white left-21">
                    <Routes>
                        <Route path="*" element={<Navigate to="/filter-playlist" replace/>} />
                        <Route path="filter-playlist" element={<FilterPlaylist />}></Route>
                    </Routes>
                </div>
                <AppNav />
            </div>
        </div>
    )
}

export default AppView