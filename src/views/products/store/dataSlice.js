import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import  { getAllProduct } from 'services/RestaurantApiServices'

export const getProducts = createAsyncThunk('manageProducts/data/getAllProducts',async (restaurant_id) => {
    const response = await getAllProduct(restaurant_id)
    return response.data
})


export const initialFilterData = {
    status: '',
}

const dataSlice = createSlice({
    name: 'manageProducts/data',
    initialState: {
        loading: true,
        products: {},
    },
    reducers: {   
    },
    extraReducers: {
        [getProducts.fulfilled]: (state, action) => {
            state.products = action.payload
            state.loading = false
        },
        [getProducts.pending]: (state) => {
            state.loading = true
        }
    }
})


export default dataSlice.reducer
