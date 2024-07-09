import { Product } from '../../types/product.type'

interface ProductState {
  products: Product[]
  editProduct: Product | null
  productSelected: Product | null
  loading: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: null | any
  currentRequestId: undefined | string
}

const initialProductState: ProductState = {
  products: [],
  editProduct: null,
  productSelected: null,
  loading: true,
  error: null,
  currentRequestId: undefined
}

export default initialProductState
