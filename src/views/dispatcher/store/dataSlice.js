import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import  { allOrdersApi, editStatus } from 'services/RestaurantApiServices'

export const getOrders = createAsyncThunk('manageOrders/data/getAllOrders',async (restaurant_id) => {
    const response = await allOrdersApi(restaurant_id)
    return response.data
})

export const putOrder = createAsyncThunk('manageOrders/data/putOrder',async (order_id, data) => {
    const response = await editStatus(order_id, data)
    return response.data 
})


export const initialFilterData = {
    status: '',
}

const dataSlice = createSlice({
    name: 'manageOrders/data',
    initialState: {
        loading: true,
        orders: {},
    },
    reducers: {   
    },
    extraReducers: {
        [getOrders.fulfilled]: (state, action) => {
            state.orders = action.payload
            state.loading = false
        },
        [getOrders.pending]: (state) => {
            state.loading = true
        }
    }
})


export default dataSlice.reducer
