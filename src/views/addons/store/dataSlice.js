import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import  { getAllAddons } from 'services/RestaurantApiServices'

export const getAddons = createAsyncThunk('manageAddons/data/getAddons',async (restaurant_id) => {
    const response = await getAllAddons(restaurant_id)
    return response.data
})


export const initialFilterData = {
    status: '',
}

const dataSlice = createSlice({
    name: 'manageAddons/data',
    initialState: {
        loading: true,
        addons: {},
    },
    reducers: {   
    },
    extraReducers: {
        [getAddons.fulfilled]: (state, action) => {
            state.addons = action.payload
            state.loading = false
        },
        [getAddons.pending]: (state) => {
            state.loading = true
        }
    }
})


export default dataSlice.reducer
