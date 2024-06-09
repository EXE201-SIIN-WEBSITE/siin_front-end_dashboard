import { createAsyncThunk } from '@reduxjs/toolkit'
import { http } from '../../utils/http'
import { ResponseData } from '../../types/response.type'
import { OrderDetail } from '../../types/orderDetail.type'
import toast from 'react-hot-toast'

interface signal {
  signal: AbortSignal
}

export const getOrderDetail = createAsyncThunk('order/getOrderDetail', async ({ signal }: signal, thunkAPI) => {
  try {
    const res = await http.get<ResponseData<OrderDetail[]>>(`/order-detail/get-all/-1?pageSize=5&field=id`, {
      signal
    })
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
})

export const updateOrderDetail = createAsyncThunk(
  'order/updateOrderDetail',
  async (orderDetail: OrderDetail, thunkAPI) => {
    try {
      console.log(orderDetail.id)

      const res = await http.put<ResponseData<OrderDetail>>(`/order-detail/${orderDetail.id}`, orderDetail)
      toast.success('Update Status Order Detail Successfully!')
      return res.data.data
    } catch (error: any) {
      if (error.name === 'AbortError') {
        toast.error('Request was cancelled')
        return thunkAPI.rejectWithValue({ message: 'Request was cancelled' })
      }
      if (error.name === 'AxiosError') {
        toast.error(error.response?.data.message)
        return thunkAPI.rejectWithValue(error.response?.data || error)
      }
      throw error
    }
  }
)

export const getOrderDetailById = createAsyncThunk(
  'order/getOrderDetailById',
  async ({ id, signal }: { id: number; signal: AbortSignal }, thunkAPI) => {
    try {
      const res = await http.get<ResponseData<OrderDetail>>(`/order-detail/${id}`, {
        signal
      })
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
