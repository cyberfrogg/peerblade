import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface CurrentSessionSliceState {
    isFetched: boolean,
    isFetchInProcess: boolean,

    isAuthorized: boolean,
    username: string,
    token: string
}

const initialState: CurrentSessionSliceState = {
    isFetched: false,
    isFetchInProcess: false,
    isAuthorized: false,
    username: "",
    token: ""
}

export const CurrentSessionSlice = createSlice({
    name: 'currentSession',
    initialState,
    reducers: {
        setIsFetched: (state, action: PayloadAction<boolean>) => {
            state.isFetched = action.payload;
        },
        setIsFetchInProcess: (state, action: PayloadAction<boolean>) => {
            state.isFetchInProcess = action.payload;
        },

        setIsAuthorized: (state, action: PayloadAction<boolean>) => {
            state.isAuthorized = action.payload;
        },
        setUsername: (state, action: PayloadAction<string>) => {
            state.username = action.payload;
        },
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
        }
    },
})

export const {
    setIsFetched,
    setIsFetchInProcess,

    setIsAuthorized,
    setToken,
    setUsername
} = CurrentSessionSlice.actions

export default CurrentSessionSlice.reducer