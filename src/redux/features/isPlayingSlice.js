import { createSlice } from "@reduxjs/toolkit";

const isPlayingSlice = createSlice({
    name: 'isPlaying',
    initialState: {
        artistName: '',
        img: '',
        currentTrackName: '',
        currentUrl: ''
    },
    reducers: {
        changeTrackCurrent: (state, action) => {
            state.currentUrl = action.payload.preview_url;
            state.currentTrackName = action.payload.name;
            state.artistName = action.payload.artists[0].name;
            state.img = action.payload.album.images[0].url
        },
        changeTrackCurrentInAlbum: (state, action) => {
            state.currentUrl = action.payload.preview_url;
            state.currentTrackName = action.payload.name;
            state.artistName = action.payload.artists[0].name;
            state.img = 'https://i.scdn.co/image/ab67616d0000b273a75971bdd0f5c34b86a152b4'
        }
    }
})

export const {changeTrackCurrent, changeTrackCurrentInAlbum } = isPlayingSlice.actions;
export default isPlayingSlice.reducer;