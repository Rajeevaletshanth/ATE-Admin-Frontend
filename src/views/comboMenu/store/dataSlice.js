import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import  { getAllComboMenu } from 'services/RestaurantApiServices'

export const getComboMenu = createAsyncThunk('manageCombo/data/getAllComboMenu',async (restaurant_id) => {
    const response = await getAllComboMenu(restaurant_id)
    return response.data
})


export const initialFilterData = {
    status: '',
}

const dataSlice = createSlice({
    name: 'manageCombo/data',
    initialState: {
        loading: true,
        comboMenu: {},
    },
    reducers: {   
    },
    extraReducers: {
        [getComboMenu.fulfilled]: (state, action) => {
            state.comboMenu = action.payload
            state.loading = false
        },
        [getComboMenu.pending]: (state) => {
            state.loading = true
        }
    }
})


export default dataSlice.reducer
