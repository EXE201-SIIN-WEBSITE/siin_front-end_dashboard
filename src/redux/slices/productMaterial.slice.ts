import { createSlice } from '@reduxjs/toolkit'
import initialProductMaterialState from '../types/productMaterialRedux.type'
import { FulfilledAction, PendingAction, RejectedAction } from '../../types/redux.types'
import {
  getProductMaterialById,
  getProductMaterialByProductId,
  updateProductMaterial
} from '../actions/productmaterial.action'

const productMaterialSlice = createSlice({
  name: 'productMaterial',
  initialState: initialProductMaterialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProductMaterialByProductId.fulfilled, (state, action) => {
        state.productMaterial = action.payload
      })
      .addCase(getProductMaterialById.fulfilled, (state, action) => {
        state.editproductMaterial = action.payload
      })
      .addCase(updateProductMaterial.fulfilled, (state, action) => {
        const index = state.productMaterial.findIndex((item) => item.id === action.payload.id)
        if (index !== -1) {
          state.productMaterial[index] = action.payload
        }
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
