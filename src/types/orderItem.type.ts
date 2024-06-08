export interface OrderItem {
  id: number
  quantity: number
  sizeName: string
  colorName: string
  accessoryName: null | number
  productId: number | null
  orderDetailId: number
  status: boolean
}
