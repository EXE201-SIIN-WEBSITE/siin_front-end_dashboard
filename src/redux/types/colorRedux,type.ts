import { Color } from '../../types/color.type'

interface ColorState {
  colors: Color[]
  editColor: Color | null
  loading: boolean
  error: null | any
  currentRequestId: undefined | string
}

const initialColorState: ColorState = {
  colors: [],
  editColor: null,
  loading: true,
  error: null,
  currentRequestId: undefined
}

export default initialColorState
