import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import  { getAllCuisines } from 'services/RestaurantApiServices'

export const getCuisines = createAsyncThunk('manageCuisines/data/getCuisine',async () => {
    const response = await getAllCuisines()
    return response.data
})


export const initialFilterData = {
    status: '',
}

const dataSlice = createSlice({
    name: 'manageCuisines/data',
    initialState: {
        loading: true,
        cuisines: {},
    },
    reducers: {   
    },
    extraReducers: {
        [getCuisines.fulfilled]: (state, action) => {
            state.cuisines = action.payload
            state.loading = false
        },
        [getCuisines.pending]: (state) => {
            state.loading = true
        }
    }
})


export default dataSlice.reducer
