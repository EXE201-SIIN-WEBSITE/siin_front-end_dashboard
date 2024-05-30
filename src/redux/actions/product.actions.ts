import { createAsyncThunk } from '@reduxjs/toolkit'
import { http } from '../../utils/http'
import { ResponseData } from '../../types/response.type'
import { Product } from '../../types/product.type'
import toast from 'react-hot-toast'

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
      toast.error('Request was cancelled')
      return thunkAPI.rejectWithValue({ message: 'Request was cancelled' })
    }

    if (error.name === 'AxiosError') {
      const errorMessage = error.response?.data?.message || 'Something went wrong'
      toast.error(errorMessage) // Hiển thị toast khi có lỗi
      return thunkAPI.rejectWithValue(error.response?.data || error)
    }
    throw error
  }
})

export const getProductId = createAsyncThunk('product/getProductId', async (id: number, thunkAPI) => {
  try {
    // Make the API call to fetch product details by ID
    const response = await http.get<ResponseData<Product>>(`/product/${id}`)
    return response.data.data
  } catch (error: any) {
    // Handle abort errors
    if (error.name === 'AbortError') {
      toast.error('Request was cancelled')
      return thunkAPI.rejectWithValue({ message: 'Request was cancelled' })
    }

    // Handle Axios errors
    if (error.name === 'AxiosError') {
      const errorMessage = error.response?.data?.message || 'Something went wrong'
      toast.error(errorMessage) // Display toast on error
      return thunkAPI.rejectWithValue(error.response?.data || error)
    }
    throw error
  }
})

// export const getProduct = createAsyncThunk('product/getProduct', async (id: number, thunkAPI) => {})
// export const createProduct = createAsyncThunk('product/createProduct', async (body: any, thunkAPI) => {})
// export const updateProduct = createAsyncThunk('product/updateProduct', async (body: any, thunkAPI) => {})
// export const deleteProduct = createAsyncThunk('product/deleteProduct', async (id: number, thunkAPI) => {})
