import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface CurrentSessionSliceState {
    isFetched: boolean,
    isFetchInProcess: boolean,
    username: string,
    token: string
}

const initialState: CurrentSessionSliceState = {
    isFetched: false,
    isFetchInProcess: false,
    username: "",
    token: ""
}

export const CurrentSessionSlice = createSlice({
    name: 'currentSession',
    initialState,
    reducers: {
        setUsername: (state, action: PayloadAction<string>) => {
            state.username = action.payload;
        },
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
        },
        setIsFetched: (state, action: PayloadAction<boolean>) => {
            state.isFetched = action.payload;
        },
        setIsFetchInProcess: (state, action: PayloadAction<boolean>) => {
            state.isFetchInProcess = action.payload;
        }
    },
})

export const {
    setUsername,
    setToken,
    setIsFetched,
    setIsFetchInProcess
} = CurrentSessionSlice.actions

export default CurrentSessionSlice.reducer