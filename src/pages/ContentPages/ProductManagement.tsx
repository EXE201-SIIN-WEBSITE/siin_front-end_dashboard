import { Button, Input, Switch, Table, TableProps } from 'antd'
import { RootState, useAppDispatch } from '../../redux/store'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { deleteProduct, getProductId, getProducts } from '../../redux/actions/product.actions'
import { EditOutlined } from '@ant-design/icons'
import { Product } from '../../types/product.type'
import ProductModal from './Modal/ProductModal'
import { getCategory } from '../../redux/actions/category.action'
import { getAccessory } from '../../redux/actions/accessory.action'
import { getMaterials } from '../../redux/actions/material.action'

const ProductManagement = () => {
  const dispatch = useAppDispatch()
  const [search, setSearch] = useState<string>('')
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    dispatch(getProducts({ signal }))
    dispatch(getCategory({ signal }))
    dispatch(getAccessory({ signal }))
    dispatch(getMaterials({ signal }))

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
  const { accessories } = useSelector((state: RootState) => state.accessory)
  const { materials } = useSelector((state: RootState) => state.materials)

  const categoryFilters = categories.map((category) => ({
    text: category.name,
    value: category.id
  }))

  const accessoryFilters = accessories.map((accessory) => ({
    text: accessory.name,
    value: accessory.id
  }))

  const materialFilters = materials.map((material) => ({
    text: `${material.colorName} - ${material.size}`,
    value: material.id
  }))

  const filteredProducts = products.filter((product) => product.name.toLowerCase().includes(search.toLowerCase()))

  const columns: TableProps<Product>['columns'] = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => a.id - b.id,
      width: '3%',
      render: (_text, _record, index) => index + 1 // Auto-incrementing ID
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      width: '20%'
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      sorter: (a, b) => a.price - b.price,
      render: (price: number) => `${price.toLocaleString()} VND`,
      width: '15%'
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      sorter: (a, b) => a.quantity - b.quantity,
      width: '3%'
    },
    {
      title: 'Category',
      dataIndex: 'categoryId',
      key: 'categoryId',
      sorter: (a, b) => {
        const categoryA = categories.find((cat) => cat.id === a.categoryId)?.name || ''
        const categoryB = categories.find((cat) => cat.id === b.categoryId)?.name || ''
        return categoryA.localeCompare(categoryB)
      },
      filters: categoryFilters,
      onFilter: (value, record) => record.categoryId === value,
      width: '12%',
      render: (categoryId: number) => {
        const category = categories.find((cat) => cat.id === categoryId)
        return category ? category.name : 'Unknown'
      }
    },
    {
      title: 'Accessory',
      dataIndex: 'accessoryId',
      key: 'accessoryId',
      sorter: (a, b) => {
        const accessoryA = accessories.find((acc) => acc.id === a.accessoryId)?.name || ''
        const accessoryB = accessories.find((acc) => acc.id === b.accessoryId)?.name || ''
        return accessoryA.localeCompare(accessoryB)
      },
      filters: accessoryFilters,
      onFilter: (value, record) => record.accessoryId === value,
      width: '12%',
      render: (accessoryId: number) => {
        const accessory = accessories.find((acc) => acc.id === accessoryId)
        return accessory ? accessory.name : 'Unknown'
      }
    },
    {
      title: 'Material',
      dataIndex: 'materialId',
      key: 'materialId',
      sorter: (a, b) => {
        const materialA = materials.find((mat) => mat.id === a.materialId)?.colorName || ''
        const materialB = materials.find((mat) => mat.id === b.materialId)?.colorName || ''
        return materialA.localeCompare(materialB)
      },
      filters: materialFilters,
      onFilter: (value, record) => record.materialId === value,
      width: '12%',
      render: (materialId: number) => {
        const material = materials.find((mat) => mat.id === materialId)
        return material ? `${material.colorName} - ${material.size}` : 'Unknown'
      }
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
