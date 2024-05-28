import { Table, TableProps } from 'antd'
import { RootState, useAppDispatch } from '../../redux/store'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getProducts } from '../../redux/actions/product.actions'

const columns: TableProps['columns'] = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    sorter: true,
    width: '10%'
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    sorter: true,
    width: '20%'
  },
  {
    title: 'Cover Image',
    dataIndex: 'coverImage',
    key: 'coverImage',
    render: (coverImage: string | null) =>
      coverImage ? <img src={coverImage} alt='cover' style={{ width: 50, height: 50 }} /> : 'No Image',
    width: '15%'
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
    sorter: true,
    render: (price: number) => `${price.toLocaleString()} VND`,
    width: '15%'
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (status: boolean) => (status ? 'Available' : 'Unavailable'),
    filters: [
      { text: 'Available', value: true },
      { text: 'Unavailable', value: false }
    ],
    width: '10%'
  },
  {
    title: 'Quantity',
    dataIndex: 'quantity',
    key: 'quantity',
    sorter: true,
    width: '10%'
  },
  {
    title: 'Category ID',
    dataIndex: 'categoryId',
    key: 'categoryId',
    sorter: true,
    width: '10%'
  },
  {
    title: 'Accessory ID',
    dataIndex: 'accessoryId',
    key: 'accessoryId',
    sorter: true,
    width: '10%'
  },
  {
    title: 'Material ID',
    dataIndex: 'materialId',
    key: 'materialId',
    sorter: true,
    width: '10%'
  }
]

const ProducManagement = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    dispatch(getProducts({ signal }))

    return () => {
      abortController.abort()
    }
  }, [dispatch])

  const { loading, products } = useSelector((state: RootState) => state.product)

  return <Table columns={columns} rowKey='id' dataSource={products} loading={loading} />
}

export default ProducManagement
