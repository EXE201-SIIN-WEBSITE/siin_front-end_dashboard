import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import productSlice from './slices/product.slice.'
import categorySlice from './slices/category.slice'
import accessorySlice from './slices/accessory.slice'
import materialSlice from './slices/material.slice'
import productMaterialSlice from './slices/productMaterial.slice'

export const store = configureStore({
  reducer: {
    product: productSlice,
    category: categorySlice,
    accessory: accessorySlice,
    materials: materialSlice,
    productMaterial: productMaterialSlice
  }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
