import { Accessory } from '../../types/accessory.type'

interface AccessoryState {
  accessories: Accessory[]
  editAccessory: Accessory | null
  loading: boolean
  error: null | any
  currentRequestId: undefined | string
}

const initialAccessoryState: AccessoryState = {
  accessories: [],
  editAccessory: null,
  loading: true,
  error: null,
  currentRequestId: undefined
}

export default initialAccessoryState
