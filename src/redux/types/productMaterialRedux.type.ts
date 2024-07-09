/* eslint-disable @typescript-eslint/no-explicit-any */
import { ProductMaterial } from '../../types/productMaterial.type'

interface ProductMaterialState {
  productMaterial: ProductMaterial[]
  editproductMaterial: ProductMaterial | null
  loading: boolean
  error: null | any
  currentRequestId: undefined | string
}

const initialProductMaterialState: ProductMaterialState = {
  productMaterial: [],
  editproductMaterial: null,
  loading: true,
  error: null,
  currentRequestId: undefined
}

export default initialProductMaterialState
