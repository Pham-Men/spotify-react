import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    userName: 0,
    isLogin: false
}

export const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers: {
        setUserLogin: (state, payload) => {
            state.userName = payload.userName;
            state.isLogin = true;
        }
    }
})

export const {setUserLogin} = authSlice.actions;
export default authSlice.reducer;