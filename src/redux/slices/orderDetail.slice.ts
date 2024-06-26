import { createSlice } from '@reduxjs/toolkit'
import initialOrderDetailState from '../types/orderDetailRedux.type'
import { getOrderDetail, getOrderDetailById, updateOrderDetail } from '../actions/orderDetail.action'
import { FulfilledAction, PendingAction, RejectedAction } from '../../types/redux.types'

const OrderDetailSlice = createSlice({
  name: 'orderDetail',
  initialState: initialOrderDetailState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrderDetail.fulfilled, (state, action) => {
        state.orderDetail = action.payload
      })
      .addCase(updateOrderDetail.fulfilled, (state, action) => {
        state.orderDetail = state.orderDetail.map((orderDetail) =>
          orderDetail.id === action.payload.id ? action.payload : orderDetail
        )
      })
      .addCase(getOrderDetailById.fulfilled, (state, action) => {
        state.OneOrderDetail = action.payload
      })
      .addMatcher<PendingAction>(
        (action) => action.type.endsWith('/pending'),
        (state, action) => {
          state.loading = true
          state.currentRequestId = action.meta.requestId
        }
      )
      .addMatcher<RejectedAction | FulfilledAction>(
        (action) => action.type.endsWith('/rejected') || action.type.endsWith('/fulfilled'),
        (state, action) => {
          if (state.loading && state.currentRequestId === action.meta.requestId) {
            state.loading = false
            state.currentRequestId = undefined
          }
        }
      )
      .addMatcher<RejectedAction>(
        (action) => action.type.endsWith('/rejected'),
        (state, action) => {
          state.loading = false
          state.error = action.payload
        }
      )
      .addMatcher<FulfilledAction>(
        (action) => action.type.endsWith('/fulfilled'),
        (state) => {
          state.loading = false
          state.error = null
        }
      )
  }
})

export default OrderDetailSlice.reducer
