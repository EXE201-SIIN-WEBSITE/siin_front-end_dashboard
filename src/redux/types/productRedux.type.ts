import { Product } from '../../types/product.type'

interface ProductState {
  products: Product[]
  editProduct: Product | null
  loading: boolean
  error: null | any
  currentRequestId: undefined | string
}

const initialProductState: ProductState = {
  products: [],
  editProduct: null,
  loading: true,
  error: null,
  currentRequestId: undefined
}

export default initialProductState
