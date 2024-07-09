import { OrderItem } from '../../types/orderItem.type'

interface OrderItemState {
  orderItem: OrderItem[]
  editOrderItem: OrderItem | null
  loading: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: null | any
  currentRequestId: undefined | string
}

const initialOrderItemState: OrderItemState = {
  orderItem: [],
  editOrderItem: null,
  loading: true,
  error: null,
  currentRequestId: undefined
}

export default initialOrderItemState
