import { createAsyncThunk } from '@reduxjs/toolkit'
import toast from 'react-hot-toast'
import { ResponseData } from '../../types/response.type'
import { http } from '../../utils/http'
import { Accessory } from '../../types/accessory.type'

interface signal {
  signal: AbortSignal
}

export const getAccessory = createAsyncThunk('accessory/getAccessory', async ({ signal }: signal, thunkAPI) => {
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
      toast.error(errorMessage) // Hiển thị toast khi có lỗi
      return thunkAPI.rejectWithValue(error.response?.data || error)
    }
    throw error
  }
})
