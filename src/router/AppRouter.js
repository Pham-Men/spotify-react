import {Route, Routes} from "react-router-dom";
import Master from "../layouts/Master/Master";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import PlayList from "../components/playlist/PlayList";
import AlbumTracks from "../components/AlbumTracks/AlbumTracks";

function AppRouter() {
    return (
        <>
            <Routes>
                <Route path={"/login"} element={<Login/>} />
                <Route path={"/"} element={<Master/>}>
                    <Route index element={<Home/>}/>
                    <Route path={"/playlist/:id"} element={<PlayList/>}/>
                    <Route path={"/album/:id"} element={<AlbumTracks/>}/>
                </Route>
            </Routes>
        </>
    )
}

export default AppRouter;