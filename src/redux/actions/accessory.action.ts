import { createAsyncThunk } from '@reduxjs/toolkit'
import toast from 'react-hot-toast'
import { ResponseData } from '../../types/response.type'
import { http } from '../../utils/http'
import { Accessory } from '../../types/accessory.type'
import { updateAccessoryValuesType } from '../../schema/accessory.schema'

interface RequestConfig {
  signal: AbortSignal
}

export const getAccessory = createAsyncThunk('accessory/getAccessory', async ({ signal }: RequestConfig, thunkAPI) => {
  try {
    const response = await http.get<ResponseData<Accessory[]>>(`/accessory/get-all/-1?pageSize=5&field=name`, {
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
      toast.error(errorMessage) // Show toast on error
      return thunkAPI.rejectWithValue(error.response?.data || error)
    }
    throw error
  }
})

export const getAccessoryById = createAsyncThunk(
  'accessory/getAccessoryById',

  async ({ id, signal }: { id: number; signal: AbortSignal }, thunkAPI) => {
    try {
      const response = await http.get<ResponseData<Accessory>>(`/accessory/${id}`, {
        signal
      })
      return response.data.data
    } catch (error: any) {
      if (error.name === 'AbortError') {
        toast.error('Request was cancelled')
        return thunkAPI.rejectWithValue({ message: 'Request was cancelled' })
      }
      if (error.name === 'AxiosError') {
        const errorMessage = error.response?.data?.message || 'Something went wrong'
        toast.error(errorMessage) // Show toast on error
        return thunkAPI.rejectWithValue(error.response?.data || error)
      }
      throw error
    }
  }
)

export const deleteAccessoryImage = createAsyncThunk(
  'accessory/deleteAccessoryImage',
  async ({ id }: { id: number }, thunkAPI) => {
    try {
      const response = await http.delete<ResponseData<string>>(`/accessory/delete-image/${id}`, {
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

export const createAccessory = createAsyncThunk(
  'accessory/createAccessory',
  async ({ accessory }: { accessory: updateAccessoryValuesType }, thunkAPI) => {
    try {
      const response = await http.post<ResponseData<Accessory>>(
        '/accessory',
        {
          name: accessory.name,
          image: null,
          status: true
        },
        {
          signal: thunkAPI.signal
        }
      )
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

export const updateAccessory = createAsyncThunk(
  'accessory/updateAccessory',
  async ({ accessory }: { accessory: updateAccessoryValuesType }, thunkAPI) => {
    try {
      const response = await http.put<ResponseData<Accessory>>(
        `/accessory/${accessory.id}`,
        {
          id: accessory.id,
          name: accessory.name,
          image: accessory.image,
          status: accessory.status
        },
        {
          signal: thunkAPI.signal
        }
      )
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

export const deleteAccessory = createAsyncThunk(
  'accessory/deleteAccessory',
  async ({ product, signal }: { product: Accessory; signal: AbortSignal }, thunkAPI) => {
    try {
      const response = await http.put<ResponseData<Accessory>>(
        `/product/${product.id}`,
        {
          id: product.id,
          name: product.name,
          image: product.image,
          status: !product.status
        },
        { signal }
      )
      toast.success('Accessory status updated successfully')
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
