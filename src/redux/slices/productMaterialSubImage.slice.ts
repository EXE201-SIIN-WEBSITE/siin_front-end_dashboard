import { createSlice } from '@reduxjs/toolkit'
import initialProductMaterialSubImageState from '../types/productMaterialSubImageRedux.type'
import { getProductMaterialSubImage } from '../actions/productMaterialSubImage.action'
import { FulfilledAction, PendingAction, RejectedAction } from '../../types/redux.types'

const ProductMaterialSubImageSlice = createSlice({
  name: 'ProductMaterialSubImage',
  initialState: initialProductMaterialSubImageState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProductMaterialSubImage.fulfilled, (state, action) => {
        state.productMaterialSubImage = action.payload
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

export default ProductMaterialSubImageSlice.reducer
