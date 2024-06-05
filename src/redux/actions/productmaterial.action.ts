import { createAsyncThunk } from '@reduxjs/toolkit'
import { http } from '../../utils/http'
import { ProductMaterial } from '../../types/productMaterial.type'
import { ResponseData } from '../../types/response.type'
import { updateProductDetailValuesType } from '../../schema/productDetail.schema'

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

export const getProductMaterialById = createAsyncThunk(
  'productmaterial/getProductMaterialById',
  async ({ id, signal }: { id: number; signal: AbortSignal }, thunkAPI) => {
    try {
      const response = await http.get<ResponseData<ProductMaterial>>(`/product-material/${id}`, {
        signal
      })
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
export const updateProductMaterial = createAsyncThunk(
  'productmaterial/updateProductMaterial',
  async (
    { productMaterial, signal }: { productMaterial: updateProductDetailValuesType; signal: AbortSignal },
    thunkAPI
  ) => {
    try {
      const res = await http.put<ResponseData<ProductMaterial>>(
        `/product-material/${productMaterial.id}`,
        productMaterial,
        { signal }
      )
      return res.data.data
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

export const deleteProductMaterialImage = createAsyncThunk(
  'productmaterial/deleteProductMaterialImage',
  async (id: number, thunkAPI) => {
    try {
      const response = await http.delete<ResponseData<string>>(`/product-material/delete-image/${id}`, {
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
  }
)
