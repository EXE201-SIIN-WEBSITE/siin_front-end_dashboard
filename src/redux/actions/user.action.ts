/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from '@reduxjs/toolkit'
import { http } from '../../utils/http'
import { ResponseData } from '../../types/response.type'
import { User } from '../../types/user.type'

export const getAllUsers = createAsyncThunk('users/getAllUsers', async (signal: AbortSignal, thunkAPI) => {
  try {
    const res = await http.get<ResponseData<User[]>>('user/get-all/-1?pageSize=5&field=id', { signal: signal })
    return res.data.data
  } catch (error: any) {
    if (error instanceof Error) {
      throw error.message
    }
    if (error.name === 'AbortError') {
      return thunkAPI.rejectWithValue({ message: 'Request was cancelled' })
    }
    if (error.name === 'AxiosError') {
      return thunkAPI.rejectWithValue(error.response?.data || error)
    }
    throw error
  }
})
