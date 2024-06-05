import { createSlice } from '@reduxjs/toolkit'
import initialSizeState from '../types/sizeRedux.type'
import { getAllSize } from '../actions/size.action'
import { FulfilledAction, PendingAction, RejectedAction } from '../../types/redux.types'

const sizeSlice = createSlice({
  name: 'size',
  initialState: initialSizeState,
  reducers: {
    removeEditSize: (state) => {
      state.editSize = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllSize.fulfilled, (state, action) => {
        state.sizes = action.payload
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

export const { removeEditSize } = sizeSlice.actions

export default sizeSlice.reducer
