import { useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '../redux/store'
import { getOrderDetailById } from '../redux/actions/orderDetail.action'
import { getProducts } from '../redux/actions/product.actions'
import { getAccessory } from '../redux/actions/accessory.action'
import { getAllColor } from '../redux/actions/color.action'
import { getAllSize } from '../redux/actions/size.action'
import { Spin, Divider, Table, Button } from 'antd'
import { OrderItem } from '../types/orderItem.type'
import { getOrderItemsByOrderDetailId } from '../redux/actions/orderItem.action'
import ReactToPrint from 'react-to-print'

const BillToPrint = () => {
  const { orderid } = useParams<{ orderid: string }>()
  const dispatch = useAppDispatch()
  const componentRef = useRef(null)
  const { OneOrderDetail, loading: orderDetailLoading, error } = useSelector((state: RootState) => state.orderDetail)
  const { loading: productLoading, products } = useSelector((state: RootState) => state.product)
  const { loading: accessoryLoading } = useSelector((state: RootState) => state.accessory)
  const { loading: colorLoading, colors } = useSelector((state: RootState) => state.color)
  const { loading: sizeLoading, sizes } = useSelector((state: RootState) => state.size)
  const { orderItem, loading: orderItemLoading } = useSelector((state: RootState) => state.orderItem)

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal
    dispatch(getOrderDetailById({ id: Number(orderid), signal }))
    dispatch(getProducts({ signal }))
    dispatch(getAccessory({ signal }))
    dispatch(getAllColor({ signal }))
    dispatch(getAllSize({ signal }))
    dispatch(getOrderItemsByOrderDetailId({ id: Number(orderid), signal }))
    return () => {
      abortController.abort()
    }
  }, [dispatch, orderid])

  if (orderDetailLoading || productLoading || accessoryLoading || colorLoading || sizeLoading || orderItemLoading) {
    return (
      <div className='mt-4 text-center'>
        <Spin />
      </div>
    )
  }

  if (error) {
    return <div className='mt-4 text-center text-red-500'>Error: {error}</div>
  }

  if (!OneOrderDetail) {
    return <div className='mt-4 text-center'>No order details found.</div>
  }

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

  const columns = [
    {
      title: 'Item',
      dataIndex: 'item',
      key: 'item'
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity'
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price'
    }
  ]

  const dataSource = orderItem.map((item: OrderItem, index: number) => {
    if (!item.accessoryName) {
      return {
        key: index,
        item: getProductName(item.productId || 0),
        quantity: item.quantity,
        price: getPriceProduct(item.productId || 0)
      }
    } else {
      return {
        key: index,
        item: `Custom: ${item.accessoryName} - ${item.colorName} - ${item.sizeName}`,
        quantity: item.quantity,
        price: getColorPrice(item.colorName) + getSizePrice(item.sizeName)
      }
    }
  })

  return (
    <div className='flex flex-col'>
      <div className='flex justify-end mb-4'>
        <ReactToPrint trigger={() => <Button type='primary'>Print</Button>} content={() => componentRef.current} />
      </div>
      <div ref={componentRef}>
        <h1 className='mb-5 text-4xl text-center'>Order Details</h1>
        <div className='mx-10'>
          <p className='mb-2'>Order ID: #{OneOrderDetail.id}</p>
          <p className='mb-2'>Customer Name: {OneOrderDetail.nameCustomer}</p>
          <p className='mb-2'>Phone Number: {OneOrderDetail.phone}</p>
          <p className='mb-2'>
            Address: {OneOrderDetail.address}, {OneOrderDetail.ward}, {OneOrderDetail.district},{' '}
            {OneOrderDetail.province}
          </p>
          <Divider />
          <Table dataSource={dataSource} columns={columns} pagination={false} />
          <Divider />
          <p className='mb-2 text-xl'>Total: {OneOrderDetail.total}</p>
        </div>
      </div>
    </div>
  )
}

export default BillToPrint
