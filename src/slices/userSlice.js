import { createSlice } from "@reduxjs/toolkit";


export const UserSlice = createSlice({
    name: "user",
    initialState:{
        value: localStorage.getItem("UserInfo") ? JSON.parse(localStorage.getItem("UserInfo")) : null
    },
    reducers: {
        userLoginInfo: (state, actions) => {
            state.value = actions.payload
        },
        middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    }
})

export const { userLoginInfo } = UserSlice.actions
export default UserSlice.reducer