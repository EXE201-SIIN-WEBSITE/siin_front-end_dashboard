import { createSlice } from '@reduxjs/toolkit'
import { FulfilledAction, PendingAction, RejectedAction } from '../../types/redux.types'
import initialColorState from '../types/colorRedux,type'
import { createColor, getAllColor, getColorById, updateColor } from '../actions/color.action'

const colorSlice = createSlice({
  name: 'size',
  initialState: initialColorState,
  reducers: {
    removeColorEidt: (state) => {
      state.editColor = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllColor.fulfilled, (state, action) => {
        state.colors = action.payload
      })
      .addCase(getColorById.fulfilled, (state, action) => {
        state.editColor = action.payload
      })
      .addCase(updateColor.fulfilled, (state, action) => {
        const updated = action.payload
        const index = state.colors.findIndex((size) => size.id === size.id)
        if (index !== -1) {
          state.colors[index] = updated
        }
      })
      .addCase(createColor.fulfilled, (state, action) => {
        state.colors.push(action.payload)
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

export const { removeColorEidt } = colorSlice.actions

export default colorSlice.reducer
