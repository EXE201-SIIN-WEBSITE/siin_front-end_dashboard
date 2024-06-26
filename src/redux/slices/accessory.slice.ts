import { createSlice } from '@reduxjs/toolkit'
import { FulfilledAction, PendingAction, RejectedAction } from '../../types/redux.types'
import { createAccessory, getAccessory, getAccessoryById, updateAccessory } from '../actions/accessory.action'
import initialAccessoryState from '../types/accessoryRedux.type'

const accessorySlice = createSlice({
  name: 'accessory',
  initialState: initialAccessoryState,
  reducers: {
    removeEditAccessory: (state) => {
      state.editAccessory = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAccessory.fulfilled, (state, action) => {
        state.accessories = action.payload
      })
      .addCase(getAccessoryById.fulfilled, (state, action) => {
        state.editAccessory = action.payload
      })
      .addCase(updateAccessory.fulfilled, (state, action) => {
        const updatedAccessory = action.payload
        const index = state.accessories.findIndex((accessory) => accessory.id === updatedAccessory.id)
        if (index !== -1) {
          state.accessories[index] = updatedAccessory
        }
      })
      .addCase(createAccessory.fulfilled, (state, action) => {
        state.accessories.push(action.payload)
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
export const { removeEditAccessory } = accessorySlice.actions
export default accessorySlice.reducer
