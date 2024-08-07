import { Size } from '../../types/size.type'

interface SizeState {
  sizes: Size[]
  editSize: Size | null
  loading: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: null | any
  currentRequestId: undefined | string
}

const initialSizeState: SizeState = {
  sizes: [],
  editSize: null,
  loading: true,
  error: null,
  currentRequestId: undefined
}

export default initialSizeState
