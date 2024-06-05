import { OrderDetail } from '../../types/orderDetail.type'

interface OrderDetailState {
  orderDetail: OrderDetail[]
  editOrderDetail: OrderDetail | null
  loading: boolean
  error: null | any
  currentRequestId: undefined | string
}

const initialOrderDetailState: OrderDetailState = {
  orderDetail: [],
  editOrderDetail: null,
  loading: true,
  error: null,
  currentRequestId: undefined
}

export default initialOrderDetailState
