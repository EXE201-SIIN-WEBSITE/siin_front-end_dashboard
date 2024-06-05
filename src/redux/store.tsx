import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import productSlice from './slices/product.slice.'
import categorySlice from './slices/category.slice'
import accessorySlice from './slices/accessory.slice'
import materialSlice from './slices/material.slice'
import productMaterialSlice from './slices/productMaterial.slice'
import sizeSlice from './slices/size.slice'
import colorSlice from './slices/color.slice'
import productMaterialSubImageSlice from './slices/productMaterialSubImage.slice'

export const store = configureStore({
  reducer: {
    product: productSlice,
    category: categorySlice,
    accessory: accessorySlice,
    materials: materialSlice,
    productMaterial: productMaterialSlice,
    size: sizeSlice,
    color: colorSlice,
    productMaterialSubImage: productMaterialSubImageSlice
  }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
