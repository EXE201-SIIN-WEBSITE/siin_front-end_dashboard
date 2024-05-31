import { createAsyncThunk } from '@reduxjs/toolkit'
import { http } from '../../utils/http'
import { ResponseData } from '../../types/response.type'
import { Product } from '../../types/product.type'
import toast from 'react-hot-toast'
import { updateProductValuesType } from '../../schema/product.schema'

interface signal {
  signal: AbortSignal
}

export const getProducts = createAsyncThunk('product/getProducts', async ({ signal }: signal, thunkAPI) => {
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

export const getProductId = createAsyncThunk(
  'product/getProductId',
  async ({ id, signal }: { id: number; signal: AbortSignal }, thunkAPI) => {
    try {
      // Make the API call to fetch product details by ID
      const response = await http.get<ResponseData<Product>>(`/product/${id}`, { signal })
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
  }
)

export const deleteProduct = createAsyncThunk(
  'product/deleteProduct',
  async ({ id, product, signal }: { id: number; product: Product; signal: AbortSignal }, thunkAPI) => {
    try {
      // Make the API call to update the product status
      const response = await http.put<ResponseData<Product>>(
        `/product/${id}`,
        {
          id: product.id,
          name: product.name,
          coverImage: product.coverImage,
          price: product.price,
          status: !product.status, // Revert the status
          quantity: product.quantity,
          categoryId: product.categoryId,
          accessoryId: product.accessoryId,
          materialId: product.materialId
        },
        { signal }
      )
      toast.success('Product status updated successfully')
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
  }
)

export const updateProduct = createAsyncThunk(
  'product/updateProduct',
  async ({ product }: { product: updateProductValuesType }, thunkAPI) => {
    try {
      const response = await http.put<ResponseData<Product>>(
        `/product/${product.id}`,
        {
          id: product.id,
          name: product.name,
          coverImage: product.coverImage,
          price: product.price,
          status: product.status,
          quantity: product.quantity,
          categoryId: product.categoryId,
          accessoryId: product.accessoryId,
          materialId: product.materialId
        },
        { signal: thunkAPI.signal }
      )
      return response.data.data
    } catch (error: any) {
      if (error.name === 'AbortError') {
        toast.error('Request was cancelled')
        return thunkAPI.rejectWithValue({ message: 'Request was cancelled' })
      }
      if (error.name === 'AxiosError') {
        return thunkAPI.rejectWithValue(error.response?.data || error)
      }
      throw error
    }
  }
)

export const createProduct = createAsyncThunk(
  'product/createProduct',
  async ({ product }: { product: updateProductValuesType }, thunkAPI) => {
    try {
      const response = await http.post<ResponseData<Product>>(
        `/product`,
        {
          name: product.name,
          coverImage: product.coverImage,
          price: product.price,
          status: product.status,
          quantity: product.quantity,
          categoryId: product.categoryId,
          accessoryId: product.accessoryId,
          materialId: product.materialId
        },
        { signal: thunkAPI.signal }
      )
      return response.data.data
    } catch (error: any) {
      if (error.name === 'AbortError') {
        toast.error('Request was cancelled')
        return thunkAPI.rejectWithValue({ message: 'Request was cancelled' })
      }
      if (error.name === 'AxiosError') {
        return thunkAPI.rejectWithValue(error.response?.data || error)
      }
      throw error
    }
  }
)

export const deleteProductImage = createAsyncThunk('product/deleteProductImage', async (id: number, thunkAPI) => {
  try {
    const response = await http.delete<ResponseData<string>>(`/product/delete-image/${id}`, {
      signal: thunkAPI.signal
    })
    return response.data.data
  } catch (error: any) {
    if (error.name === 'AbortError') {
      return thunkAPI.rejectWithValue({ message: 'Request was cancelled' })
    }
    if (error.response?.data?.message) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
    return thunkAPI.rejectWithValue(error)
  }
})
