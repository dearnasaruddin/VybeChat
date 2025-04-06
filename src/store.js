import { configureStore } from '@reduxjs/toolkit'
import  UserSlice  from './slices/userSlice'

export default configureStore({
  reducer: {
    userInfo : UserSlice
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
})