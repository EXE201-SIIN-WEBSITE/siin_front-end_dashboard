import { ProductMaterialSubImage } from '../../types/productMaterialSubImage.type'

interface ProductMaterialSubImageState {
  productMaterialSubImage: ProductMaterialSubImage[]
  loading: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: null | any
  currentRequestId: undefined | string
}

const initialProductMaterialSubImageState: ProductMaterialSubImageState = {
  productMaterialSubImage: [],
  loading: true,
  error: null,
  currentRequestId: undefined
}

export default initialProductMaterialSubImageState
