import { useEffect } from 'react'
import { Table, Select } from 'antd'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '../../redux/store'
import { getOrderDetail, updateOrderDetail } from '../../redux/actions/orderDetail.action'
import { OrderDetail } from '../../types/orderDetail.type'

const { Option } = Select

const OrderDetailManagement = () => {
  const dispatch = useAppDispatch()
  const { orderDetail, loading } = useSelector((state: RootState) => state.orderDetail)

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

  const columns = [
    {
      title: 'Customer Name',
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
      render: (_: any, record: OrderDetail) =>
        `${record.address}, ${record.ward}, ${record.district}, ${record.province}`
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email'
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
      render: (_: any, record: OrderDetail) => (
        <Select value={record.orderStatus} onChange={(value) => handleStatusChange(record, value)}>
          <Option value='pending'>Pending</Option>
          <Option value='shipped'>Shipped</Option>
          <Option value='delivered'>Delivered</Option>
          <Option value='cancelled'>Cancelled</Option>
        </Select>
      )
    },
    {
      title: 'User Type',
      dataIndex: 'userId',
      key: 'userId',
      render: (userId: number | undefined) => (userId ? 'Registered User' : 'Guest')
    }
  ]

  return <Table dataSource={orderDetail} columns={columns} rowKey='id' loading={loading} />
}

export default OrderDetailManagement
