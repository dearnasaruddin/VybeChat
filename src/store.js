import { configureStore } from '@reduxjs/toolkit'
import  UserSlice  from './slices/userSlice'
import  msgSlice  from './slices/msgSlice'

export default configureStore({
  reducer: {
    userInfo : UserSlice,
    msgInfo: msgSlice
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
})