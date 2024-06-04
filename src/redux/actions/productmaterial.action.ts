import { createAsyncThunk } from '@reduxjs/toolkit'
import { http } from '../../utils/http'
import { ProductMaterial } from '../../types/productMaterial.type'
import { ResponseData } from '../../types/response.type'

interface signal {
  signal: AbortSignal
}

export const getProductMaterial = createAsyncThunk(
  'productmaterial/getProductMaterial',
  async ({ signal }: signal, thunkAPI) => {
    try {
      const response = await http.get<ResponseData<ProductMaterial[]>>(
        '/product-material/get-all/-1?pageSize=5&field=id',
        {
          signal
        }
      )
      return response.data.data
    } catch (error: any) {
      if (error.name === 'AbortError') {
        return thunkAPI.rejectWithValue({ message: 'Request was cancelled' })
      }
      if (error.name === 'AxiosError') {
        return thunkAPI.rejectWithValue(error.response?.data || error)
      }
      throw error
    }
  }
)

export const getProductMaterialByProductId = createAsyncThunk(
  'productmaterial/getProductMaterialByProductId',
  async ({ productId, signal }: { productId: number; signal: AbortSignal }, thunkAPI) => {
    try {
      const response = await http.get<ResponseData<ProductMaterial[]>>(
        `/product-material/get-by-productId/${productId}`,
        { signal }
      )
      return response.data.data
    } catch (error: any) {
      if (error.name === 'AbortError') {
        return thunkAPI.rejectWithValue({ message: 'Request was cancelled' })
      }
      if (error.name === 'AxiosError') {
        return thunkAPI.rejectWithValue(error.response?.data || error)
      }
      throw error
    }
  }
)
