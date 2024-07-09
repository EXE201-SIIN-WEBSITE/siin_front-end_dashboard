/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from '@reduxjs/toolkit'
import { http } from '../../utils/http'
import { ResponseData } from '../../types/response.type'
import { Size } from '../../types/size.type'
import toast from 'react-hot-toast'
import { Color } from '../../types/color.type'
import { updateSizeValuesType } from '../../schema/size.schema'

export const getAllColor = createAsyncThunk('color/getAllColor', async (signal: AbortSignal, thunkAPI) => {
  try {
    const response = await http.get<ResponseData<Size[]>>('/color/get-all/-1?pageSize=5&field=id', { signal })
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

export const getColorById = createAsyncThunk(
  'color/getColorById',
  async ({ id, signal }: { id: number; signal: AbortSignal }, thunkAPI) => {
    try {
      const response = await http.get<ResponseData<Color>>(`/color/${id}`, { signal })
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

export const updateColor = createAsyncThunk(
  'color/updateColor',
  async ({ data, signal }: { data: updateSizeValuesType; signal: AbortSignal }, thunkAPI) => {
    try {
      const response = await http.put<ResponseData<Color>>(
        `/color/${data.id}`,
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

export const createColor = createAsyncThunk(
  'color/createColor',
  async ({ color }: { color: updateSizeValuesType }, thunkAPI) => {
    try {
      const response = await http.post<ResponseData<Color>>(
        '/color',
        {
          name: color.name,
          price: color.price
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
