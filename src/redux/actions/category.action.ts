import { createAsyncThunk } from '@reduxjs/toolkit'
import toast from 'react-hot-toast'
import { Category } from '../../types/category.type'
import { ResponseData } from '../../types/response.type'
import { http } from '../../utils/http'

interface signal {
  signal: AbortSignal
}

export const getCategory = createAsyncThunk('category/getCategorys', async ({ signal }: signal, thunkAPI) => {
  try {
    const response = await http.get<ResponseData<Category[]>>(`/product-category/get-all/-1?pageSize=5&field=id`, {
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
