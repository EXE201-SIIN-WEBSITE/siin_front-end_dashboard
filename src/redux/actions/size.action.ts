import { createAsyncThunk } from '@reduxjs/toolkit'
import { http } from '../../utils/http'
import { ResponseData } from '../../types/response.type'
import { Size } from '../../types/size.type'
import toast from 'react-hot-toast'

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
