import { Modal, Spin, Divider } from 'antd'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { OrderItem } from '../../../types/orderItem.type'
import { RootState, useAppDispatch } from '../../../redux/store'
import { getProducts } from '../../../redux/actions/product.actions'
import { getAccessory } from '../../../redux/actions/accessory.action'
import { getAllColor } from '../../../redux/actions/color.action'
import { getAllSize } from '../../../redux/actions/size.action'

interface OrderItemModalProps {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  ListOrderItem: OrderItem[]
  loading: boolean
}

const OrderItemModal = ({ open, setOpen, ListOrderItem, loading }: OrderItemModalProps) => {
  const dispatch = useAppDispatch()
  const handleCancel = () => {
    setOpen(false)
  }

  const { loading: productLoading, products } = useSelector((state: RootState) => state.product)
  const { loading: accessoryLoading } = useSelector((state: RootState) => state.accessory)
  const { loading: colorLoading, colors } = useSelector((state: RootState) => state.color)
  const { loading: sizeLoading, sizes } = useSelector((state: RootState) => state.size)

  useEffect(() => {
    if (open) {
      const abortController = new AbortController()
      const signal = abortController.signal

      dispatch(getProducts({ signal }))
      dispatch(getAccessory({ signal }))
      dispatch(getAllColor({ signal }))
      dispatch(getAllSize({ signal }))

      return () => {
        abortController.abort()
      }
    }
  }, [open, dispatch])

  const getProductName = (productId: number) => {
    const product = products.find((p) => p.id === productId)
    return product ? product.name : 'Unknown Product'
  }

  const getPriceProduct = (productId: number) => {
    const product = products.find((p) => p.id === productId)
    return product ? product.price : NaN
  }

  const getColorPrice = (colorName: string) => {
    const color = colors.find((c) => c.name === colorName)
    return color ? color.price : NaN
  }

  const getSizePrice = (sizeName: string) => {
    const size = sizes.find((s) => s.name === sizeName)
    return size ? size.price : NaN
  }

  return (
    <Modal title='Order Items' visible={open} onCancel={handleCancel} footer={null}>
      {loading || productLoading || accessoryLoading || colorLoading || sizeLoading ? (
        <Spin />
      ) : ListOrderItem.length > 0 ? (
        ListOrderItem.map((item, index) => (
          <div key={item.id} style={{ marginBottom: '10px' }}>
            {!item.accessoryName ? (
              <>
                <p>Product Name: {getProductName(item.productId || 0)}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Price: {getPriceProduct(item.productId || 0)}</p>
              </>
            ) : (
              <>
                <p>
                  Custom Item: {item.accessoryName} - {item.colorName} - {item.sizeName}
                </p>
                <p>Quantity: {item.quantity}</p>
                <p>Price: {getColorPrice(item.colorName) + getSizePrice(item.sizeName)}</p>
              </>
            )}
            {index < ListOrderItem.length - 1 && <Divider />} {/* Add divider between items */}
          </div>
        ))
      ) : (
        <p>No items found.</p>
      )}
    </Modal>
  )
}

export default OrderItemModal
