import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getTableList, editTable } from 'services/RestaurantApiServices'

export const getTableData = createAsyncThunk('manageTables/data/getTableData ',async (id) => {
    const response = await getTableList(id)
    return response.data
})

export const putTableData = createAsyncThunk('manageTables/data/putTableData',async (id, data) => {
    const response = await editTable (id, data)
    return response.data 
}) 

const dataSlice = createSlice({
    name: 'manageTables/data',
    initialState: {
        loading: true,
        getTableData : {},
    },
    reducers: {   
    },
    extraReducers: {
        [getTableData.fulfilled]: (state, action) => {
            state.getTableData  = action.payload
            state.loading = false
        },
        [getTableData.pending]: (state) => {
            state.loading = true
        }
    }
})


export default dataSlice.reducer
