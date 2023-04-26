import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    flightList: [],
    isLoading: false,
};

export const flightSlice = createSlice({
    name: 'flightSlice',
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.isLoading = action.payload
        },
        setFlightList: (state, action) => {
            state.flightList = action.payload;
            state.isLoading = false;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setFlightList, setLoading } = flightSlice.actions;

export default flightSlice.reducer

