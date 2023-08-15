import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface CurrentSessionSliceState {
    username: string
}

const initialState: CurrentSessionSliceState = {
    username: "",
}

export const CurrentSessionSlice = createSlice({
    name: 'currentSession',
    initialState,
    reducers: {
        setUsername: (state, action: PayloadAction<string>) => {
            state.username = action.payload;
        }
    },
})

export const {
    setUsername
} = CurrentSessionSlice.actions

export default CurrentSessionSlice.reducer