import { useEffect, useState } from 'react'
import { Table, Select, Button, Input } from 'antd'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '../../redux/store'
import { getOrderDetail, updateOrderDetail } from '../../redux/actions/orderDetail.action'
import { OrderDetail } from '../../types/orderDetail.type'
import { getOrderItemsByOrderDetailId } from '../../redux/actions/orderItem.action'
import OrderItemModal from './Modal/OrderItemModal'
import { Link } from 'react-router-dom'
import { Option } from 'antd/es/mentions'

const OrderDetailManagement = () => {
  const dispatch = useAppDispatch()
  const { orderDetail, loading: orderDetailLoading } = useSelector((state: RootState) => state.orderDetail)
  const { orderItem, loading: orderItemLoading } = useSelector((state: RootState) => state.orderItem)
  const [open, setOpen] = useState<boolean>(false)
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null)
  const [filterStatus, setFilterStatus] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState<string>('')

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    dispatch(getOrderDetail({ signal }))

    return () => {
      abortController.abort()
    }
  }, [dispatch])

  const handleStatusChange = (orderDetail: OrderDetail, value: string) => {
    dispatch(updateOrderDetail({ ...orderDetail, orderStatus: value }))
  }

  const handleOnClickShowItemDetail = (id: number) => {
    setSelectedOrderId(id)
    setOpen(true)
    if (selectedOrderId !== id) {
      const abortController = new AbortController()
      const signal = abortController.signal
      dispatch(getOrderItemsByOrderDetailId({ id, signal }))
    }
  }

  const handleFilterChange = (value: string) => {
    setFilterStatus(value)
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const handleClearFilters = () => {
    setFilterStatus(null)
    setSearchQuery('')
  }

  const filteredOrderDetail = orderDetail
    .filter((detail) => (filterStatus ? detail.orderStatus === filterStatus : true))
    .filter((detail) => detail.phone.includes(searchQuery))

  const columns = [
    {
      title: 'Name',
      dataIndex: 'nameCustomer',
      key: 'nameCustomer'
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone'
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      render: (_: any, record: OrderDetail) =>
        `${record.address}, ${record.ward}, ${record.district}, ${record.province}`
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: 'Item',
      key: 'id',
      render: (record: OrderDetail) => <Button onClick={() => handleOnClickShowItemDetail(record.id)}>Item</Button>
    },
    {
      title: 'Note',
      dataIndex: 'note',
      key: 'note'
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total'
    },
    {
      title: 'Order Status',
      dataIndex: 'orderStatus',
      key: 'orderStatus',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      render: (_: any, record: OrderDetail) => (
        <Select value={record.orderStatus} onChange={(value) => handleStatusChange(record, value)}>
          <Option style={{ color: 'orange' }} value='pending'>
            Pending
          </Option>
          <Option style={{ color: 'blue' }} value='shipping'>
            Shipping
          </Option>
          <Option style={{ color: 'green' }} value='complete'>
            Complete
          </Option>
          <Option style={{ color: 'red' }} value='cancelled'>
            Cancelled
          </Option>
        </Select>
      )
    },
    {
      title: 'User Type',
      dataIndex: 'userId',
      key: 'userId',
      render: (userId: number | undefined) => (userId ? 'Registered User' : 'Guest')
    },
    {
      title: 'Print Bill',
      key: 'print',
      render: (record: OrderDetail) => (
        <Link to={`/billtoprint/${record.id}`} target='_blank'>
          <Button type='primary'>Print Bill</Button>
        </Link>
      )
    }
  ]

  return (
    <>
      <div style={{ marginBottom: 16 }}>
        <Select
          placeholder='Filter by status'
          onChange={handleFilterChange}
          value={filterStatus}
          style={{ marginRight: 8, width: 200 }}
        >
          <Option value='pending'>Pending</Option>
          <Option value='shipping'>Shipping</Option>
          <Option value='complete'>Complete</Option>
          <Option value='cancelled'>Cancelled</Option>
        </Select>
        <Input
          placeholder='Search by phone number'
          value={searchQuery}
          onChange={handleSearchChange}
          style={{ width: 200, marginRight: 8 }}
        />
        <Button onClick={handleClearFilters}>Clear</Button>
      </div>
      <Table dataSource={filteredOrderDetail} columns={columns} rowKey='id' loading={orderDetailLoading} />
      <OrderItemModal open={open} setOpen={setOpen} ListOrderItem={orderItem} loading={orderItemLoading} />
    </>
  )
}

export default OrderDetailManagement
