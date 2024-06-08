import { createSlice } from '@reduxjs/toolkit'
import initialOrderItemState from '../types/orderItemRedux.type'
import { getOrderItemsByOrderDetailId } from '../actions/orderItem.action'
import { FulfilledAction, PendingAction, RejectedAction } from '../../types/redux.types'

const OrderDetailSlice = createSlice({
  name: 'orderDetail',
  initialState: initialOrderItemState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrderItemsByOrderDetailId.fulfilled, (state, action) => {
        state.orderItem = action.payload ?? [] //?? [] wtf is this eslint blame me ????
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
