import { createAsyncThunk } from '@reduxjs/toolkit'
import { http } from '../../utils/http'
import { ResponseData } from '../../types/response.type'
import { Product } from '../../types/product.type'

interface GetProductsParams {
  signal: AbortSignal
}

export const getProducts = createAsyncThunk('product/getProducts', async ({ signal }: GetProductsParams, thunkAPI) => {
  try {
    const response = await http.get<ResponseData<Product[]>>(`/product/get-all/-1?pageSize=5&field=name`, {
      signal // Pass the abort signal for request cancellation
    })
    return response.data.data
  } catch (error: any) {
    if (error.name === 'AbortError') {
      return thunkAPI.rejectWithValue({ message: 'Request was cancelled' })
    }
    return thunkAPI.rejectWithValue(error.response?.data || error)
  }
})

// export const getProduct = createAsyncThunk('product/getProduct', async (id: number, thunkAPI) => {})
// export const createProduct = createAsyncThunk('product/createProduct', async (body: any, thunkAPI) => {})
// export const updateProduct = createAsyncThunk('product/updateProduct', async (body: any, thunkAPI) => {})
// export const deleteProduct = createAsyncThunk('product/deleteProduct', async (id: number, thunkAPI) => {})
