import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import  { getAllCategory } from 'services/RestaurantApiServices'

export const getCategory = createAsyncThunk('manageCategory/data/getCategory',async (restaurant_id) => {
    const response = await getAllCategory(restaurant_id)
    return response.data
})


export const initialFilterData = {
    status: '',
}

const dataSlice = createSlice({
    name: 'manageCategory/data',
    initialState: {
        loading: true,
        category: {},
    },
    reducers: {   
    },
    extraReducers: {
        [getCategory.fulfilled]: (state, action) => {
            state.category = action.payload
            state.loading = false
        },
        [getCategory.pending]: (state) => {
            state.loading = true
        }
    }
})


export default dataSlice.reducer
