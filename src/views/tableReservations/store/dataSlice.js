import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import  { getReservations } from 'services/RestaurantApiServices'

export const getReservation = createAsyncThunk('manageReservations/data/getAllReservations',async (data) => {
    const response = await getReservations(data)
    return response.data
})


export const initialFilterData = {
    status: '',
}

const dataSlice = createSlice({
    name: 'manageReservations/data',
    initialState: {
        loading: true,
        reservations: {},
    },
    reducers: {   
    },
    extraReducers: {
        [getReservation.fulfilled]: (state, action) => {
            state.reservations = action.payload
            state.loading = false
        },
        [getReservation.pending]: (state) => {
            state.loading = true
        }
    }
})


export default dataSlice.reducer
