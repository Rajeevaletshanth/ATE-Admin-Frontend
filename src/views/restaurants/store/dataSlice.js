import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import  { getAllRestaurants } from 'services/RestaurantApiServices'

export const getRestaurants = createAsyncThunk('manageRestaurants/data/getRestaurants',async () => {
    const response = await getAllRestaurants()
    return response.data
})


export const initialFilterData = {
    status: '',
}

const dataSlice = createSlice({
    name: 'manageRestaurants/data',
    initialState: {
        loading: true,
        restaurant: {},
    },
    reducers: {   
    },
    extraReducers: {
        [getRestaurants.fulfilled]: (state, action) => {
            state.restaurant = action.payload
            state.loading = false
        },
        [getRestaurants.pending]: (state) => {
            state.loading = true
        }
    }
})


export default dataSlice.reducer
