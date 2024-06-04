import { Button, Image, Input, Switch, Table, TableProps } from 'antd'
import { RootState, useAppDispatch } from '../../redux/store'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { deleteProduct, getProductId, getProducts } from '../../redux/actions/product.actions'
import { EditOutlined } from '@ant-design/icons'
import { Product } from '../../types/product.type'
import ProductModal from './Modal/ProductModal'
import { getCategory } from '../../redux/actions/category.action'

import { Link } from 'react-router-dom'

const ProductManagement = () => {
  const dispatch = useAppDispatch()
  const [search, setSearch] = useState<string>('')
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    dispatch(getProducts({ signal }))
    dispatch(getCategory({ signal }))

    return () => {
      abortController.abort()
    }
  }, [dispatch])

  const handleOpenModalEdit = (id: number) => {
    const abortController = new AbortController()
    const signal = abortController.signal
    dispatch(getProductId({ id, signal }))
    setIsOpenModal(true)
  }

  const handleDeleteProduct = (id: number, product: Product) => {
    const abortController = new AbortController()
    const signal = abortController.signal
    dispatch(deleteProduct({ id, product, signal }))
  }

  const { loading, products } = useSelector((state: RootState) => state.product)
  const { categories } = useSelector((state: RootState) => state.category)

  const categoryFilters = categories.map((category) => ({
    text: category.name,
    value: category.id
  }))

  const filteredProducts = products.filter((product) => product.name.toLowerCase().includes(search.toLowerCase()))

  const columns: TableProps<Product>['columns'] = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: '5%',
      align: 'center',
      sorter: {
        compare: (a, b) => a.id - b.id
      },
      sortDirections: ['ascend', 'descend'],
      defaultSortOrder: 'ascend'
    },

    {
      title: 'Name',
      key: 'name',
      align: 'center',
      width: '30%',
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (record) => (
        <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
          <Image src={record.coverImage} alt='cover' width={'100px'} />
          <Link target='_blank' to={`${record.id}`}>
            {record.name}
          </Link>
        </div>
      )
    },
    {
      title: 'Price',
      dataIndex: 'price',
      align: 'center',
      key: 'price',
      sorter: (a, b) => a.price - b.price,
      render: (price: number) => `${price.toLocaleString()} VND`,
      width: '25%'
    },
    {
      title: 'Category',
      dataIndex: 'categoryId',
      key: 'categoryId',
      align: 'center',
      sorter: (a, b) => {
        const categoryA = categories.find((cat) => cat.id === a.categoryId)?.name || ''
        const categoryB = categories.find((cat) => cat.id === b.categoryId)?.name || ''
        return categoryA.localeCompare(categoryB)
      },
      filters: categoryFilters,
      onFilter: (value, record) => record.categoryId === value,
      width: '25%',
      render: (categoryId: number) => {
        const category = categories.find((cat) => cat.id === categoryId)
        return category ? category.name : 'Unknown'
      }
    },

    {
      title: 'Action',
      key: 'id',
      width: '15%',
      align: 'center',
      render: (record: Product) => {
        return (
          <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
            <EditOutlined onClick={() => handleOpenModalEdit(record.id)} />
            <Switch defaultChecked={record.status} onChange={() => handleDeleteProduct(record.id, record)} />
          </div>
        )
      }
    }
  ]

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
      <Table columns={columns} rowKey='id' dataSource={filteredProducts} loading={loading} />
      <ProductModal isOpenModal={isOpenModal} setOpenModal={setIsOpenModal} />
    </>
  )
}

export default ProductManagement
