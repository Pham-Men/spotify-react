import { configureStore } from '@reduxjs/toolkit';
import isPlayingReducer from './features/isPlayingSlice';

const store = configureStore({
    reducer: {
        isPlaying: isPlayingReducer,
    },
})

export default store;