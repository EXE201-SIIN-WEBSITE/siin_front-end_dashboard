import { Button, Input, Switch, Table, TableProps } from 'antd'
import { RootState, useAppDispatch } from '../../redux/store'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { getProductId, getProducts } from '../../redux/actions/product.actions'
import { EditOutlined } from '@ant-design/icons'
import { Product } from '../../types/product.type'
import ProductModal from './Modal/ProductModal'

const ProducManagement = () => {
  const columns: TableProps['columns'] = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      sorter: true,
      width: '3%'
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
      width: '10%'
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
      width: '3%'
    },
    {
      title: 'Category ID',
      dataIndex: 'categoryId',
      key: 'categoryId',
      sorter: true,
      width: '12%'
    },
    {
      title: 'Accessory ID',
      dataIndex: 'accessoryId',
      key: 'accessoryId',
      sorter: true,
      width: '12%'
    },
    {
      title: 'Material ID',
      dataIndex: 'materialId',
      key: 'materialId',
      sorter: true,
      width: '12%'
    },
    {
      title: 'Action',
      key: 'id',
      width: '5%',
      align: 'center',
      render: (record: Product) => {
        return (
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <EditOutlined onClick={() => handleOpenModalEdit(record.id)} />
            {/* <Switch defaultChecked={record.status} onChange={() => handleDelete(record.id)} /> */}
          </div>
        )
      }
    }
  ]
  const dispatch = useAppDispatch()
  const [search, setSearch] = useState<string>('')
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    dispatch(getProducts({ signal }))

    return () => {
      abortController.abort()
    }
  }, [dispatch])

  const handleOpenModalEdit = (id: number) => {
    dispatch(getProductId(id))
    setIsOpenModal(true)
  }

  const { loading, products } = useSelector((state: RootState) => state.product)

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '1%' }}>
        <Input.Search
          style={{ width: '30%' }}
          placeholder='Tìm kiếm'
          onChange={(e) => {
            setSearch(e.target.value)
          }}
        />
        <Button
          style={{ width: '10%' }}
          type='primary'
          block
          onClick={() => {
            setIsOpenModal(true)
          }}
        >
          Add New
        </Button>
      </div>
      <Table columns={columns} rowKey='id' dataSource={products} loading={loading} />
      <ProductModal isOpenModal={isOpenModal} setOpenModal={setIsOpenModal} />
    </>
  )
}

export default ProducManagement
