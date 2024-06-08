import { createAsyncThunk } from '@reduxjs/toolkit'
import { http } from '../../utils/http'
import { ResponseData } from '../../types/response.type'
import { OrderItem } from '../../types/orderItem.type'

export const getOrderItemsByOrderDetailId = createAsyncThunk(
  'orderItem/getOrderItemsByOrderDetailId',
  async ({ id, signal }: { id: number; signal: AbortSignal }, thunkAPI) => {
    try {
      const response = await http.get<ResponseData<OrderItem[]>>(`/order-item/get-by-order-detail/${id}`, {
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
    }
  }
)
