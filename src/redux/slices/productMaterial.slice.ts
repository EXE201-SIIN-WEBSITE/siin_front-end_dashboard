import { createSlice } from '@reduxjs/toolkit'
import initialProductMaterialState from '../types/productMaterialRedux.type'
import { getProductMaterial } from '../actions/productmaterial.action'
import { FulfilledAction, PendingAction, RejectedAction } from '../../types/redux.types'

const productMaterialSlice = createSlice({
  name: 'productMaterial',
  initialState: initialProductMaterialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProductMaterial.fulfilled, (state, action) => {
        state.productMaterial = action.payload
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

export default productMaterialSlice.reducer
