import { createAsyncThunk } from '@reduxjs/toolkit'
import { http } from '../../utils/http'
import { ResponseData } from '../../types/response.type'
import { Size } from '../../types/size.type'
import toast from 'react-hot-toast'
import { updateSizeValuesType } from '../../schema/size.schema'

interface signal {
  signal: AbortSignal
}

export const getAllSize = createAsyncThunk('size/getAllSize', async ({ signal }: signal, thunkAPI) => {
  try {
    const response = await http.get<ResponseData<Size[]>>('/size/get-all/-1?pageSize=5&field=id', { signal })
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
})

export const getSizeById = createAsyncThunk(
  'size/getSizeById',
  async ({ id, signal }: { id: number; signal: AbortSignal }, thunkAPI) => {
    try {
      const response = await http.get<ResponseData<Size>>(`/size/${id}`, { signal })
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

export const updateSize = createAsyncThunk(
  'size/updateSize',
  async ({ data, signal }: { data: updateSizeValuesType; signal: AbortSignal }, thunkAPI) => {
    try {
      const response = await http.put<ResponseData<Size>>(
        `/size/${data.id}`,
        {
          id: data.id,
          name: data.name,
          price: data.price
        },
        { signal }
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

export const createSize = createAsyncThunk(
  'size/createSize',
  async ({ size }: { size: updateSizeValuesType }, thunkAPI) => {
    try {
      const response = await http.post<ResponseData<Size>>(
        '/accessory',
        {
          name: size.name,
          price: size.price
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
