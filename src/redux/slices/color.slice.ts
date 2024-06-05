import { createSlice } from '@reduxjs/toolkit'
import { FulfilledAction, PendingAction, RejectedAction } from '../../types/redux.types'
import initialColorState from '../types/colorRedux,type'
import { getAllColor } from '../actions/color.action'

const colorSlice = createSlice({
  name: 'size',
  initialState: initialColorState,
  reducers: {
    removeEditSize: (state) => {
      state.editColor = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllColor.fulfilled, (state, action) => {
        state.colors = action.payload
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

export const { removeEditSize } = colorSlice.actions

export default colorSlice.reducer
