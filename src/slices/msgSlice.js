import { createSlice } from "@reduxjs/toolkit";


export const msgSlice = createSlice({
    name: "user",
    initialState: {
        value: ""
    },
    reducers: {
        msgInfo: (state, actions) => {
            state.value = actions.payload
        },
        middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    }
})

export const { msgInfo } = msgSlice.actions
export default msgSlice.reducer