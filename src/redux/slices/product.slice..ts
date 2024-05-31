import { createSlice } from '@reduxjs/toolkit'
import { createProduct, deleteProduct, getProductId, getProducts, updateProduct } from '../actions/product.actions'
import initialProductState from '../types/productRedux.type'
import { FulfilledAction, PendingAction, RejectedAction } from '../../types/redux.types'

const productSlice = createSlice({
  name: 'product',
  initialState: initialProductState,
  reducers: {
    removeEditProduct: (state) => {
      state.editProduct = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.fulfilled, (state, action) => {
        state.products = action.payload
      })
      .addCase(getProductId.fulfilled, (state, action) => {
        state.editProduct = action.payload
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        const updatedProduct = action.payload
        const index = state.products.findIndex((product) => product.id === updatedProduct.id)
        if (index !== -1) {
          state.products[index] = updatedProduct
        }
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const updatedProduct = action.payload
        const index = state.products.findIndex((product) => product.id === updatedProduct.id)
        if (index !== -1) {
          state.products[index] = updatedProduct
        }
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.products.push(action.payload)
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
export const { removeEditProduct } = productSlice.actions
export default productSlice.reducer
