import { createAsyncThunk } from '@reduxjs/toolkit'
import toast from 'react-hot-toast'
import { ResponseData } from '../../types/response.type'
import { http } from '../../utils/http'
import { ProductMaterialSubImage } from '../../types/productMaterialSubImage.type'

export const getProductMaterialSubImage = createAsyncThunk(
  'productMaterialSubImage/getProductMaterialSubImage',
  async ({ id, signal }: { id: number; signal: AbortSignal }, thunkAPI) => {
    try {
      const response = await http.get<ResponseData<ProductMaterialSubImage[]>>(
        `product-sub-image/productMaterialId?productMaterialId=${id}`,
        {
          signal
        }
      )
      return response.data.data
    } catch (error: any) {
      if (error.name === 'AbortError') {
        toast.error('Request was cancelled')
        return thunkAPI.rejectWithValue({ message: 'Request was cancelled' })
      }

      if (error.name === 'AxiosError') {
        const errorMessage = error.response?.data?.message || 'Something went wrong'
        toast.error(errorMessage)
        return thunkAPI.rejectWithValue(error.response?.data || error)
      }
      throw error
    }
  }
)

export const deleteProductSubImage = createAsyncThunk('product/deleteProductImage', async (id: number, thunkAPI) => {
  try {
    const response = await http.delete<ResponseData<string>>(`/product-sub-image/{id}?id=${id}`, {
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
