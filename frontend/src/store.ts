import { configureStore } from '@reduxjs/toolkit'
import currentSessionReducer from '@/slices/auth/currentSessionSlice'

export const store = configureStore({
    reducer: {
        currentSession: currentSessionReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
