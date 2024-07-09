import { Button, Image, Switch, Table, TableProps, Typography } from 'antd'
import { ProductMaterial } from '../../types/productMaterial.type'
import { EditOutlined } from '@ant-design/icons'
import { RootState, useAppDispatch } from '../../redux/store'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { getProductMaterialById, getProductMaterialByProductId } from '../../redux/actions/productmaterial.action'
import { getProductId } from '../../redux/actions/product.actions'
import { useParams } from 'react-router-dom'
import { getAllSize } from '../../redux/actions/size.action'
import { getAllColor } from '../../redux/actions/color.action'
import ProductDetailModalUpdate from './Modal/ProductDetailModalUpdate'
import UploadCoverImageProductMaterial from '../../utils/UploadCoverImageProductMaterial'
import CreateProductMaterialModal from './Modal/CreateProductMaterial'
import { getAccessory } from '../../redux/actions/accessory.action'

export default function ProductDetail() {
  const dispatch = useAppDispatch()
  const { loading, productMaterial } = useSelector((state: RootState) => state.productMaterial)
  const { editProduct } = useSelector((state: RootState) => state.product)
  const propSize = useSelector((state: RootState) => state.size)
  const propColor = useSelector((state: RootState) => state.color)
  const propAccesory = useSelector((state: RootState) => state.accessory)

  const param = useParams<{ id: string }>()
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  const [isOpenModalCreate, setIsOpenModalCreate] = useState<boolean>(false)

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal
    dispatch(getProductMaterialByProductId({ productId: Number(param.id), signal }))
    dispatch(getProductId({ id: Number(param.id), signal }))
    dispatch(getAllSize({ signal }))
    dispatch(getAllColor(signal))
    dispatch(getAccessory({ signal }))
    return () => {
      abortController.abort()
    }
  }, [dispatch, param.id])

  useEffect(() => {
    if (editProduct === null) {
      return
    } else {
      document.title = `Product Detail - ${editProduct?.name}`
    }
  }, [editProduct])

  const handleOpenModalEdit = (id: number) => {
    const abortController = new AbortController()
    const signal = abortController.signal
    dispatch(getProductMaterialById({ id, signal }))
    setIsOpenModal(true)
  }

  const handleDeleteProduct = (id: number, obj: ProductMaterial) => {
    console.log(id)
    console.log(obj)
  }

  const getColorNameById = (id: number) => {
    const color = propColor.colors.find((color) => color.id === id)
    return color ? color.name : ''
  }

  const getSizeNameById = (id: number) => {
    const size = propSize.sizes.find((size) => size.id === id)
    return size ? size.name : ''
  }

  const getAccessoryName = (id: number) => {
    const accessory = propAccesory.accessories.find((accessory) => accessory.id === id)
    return accessory ? accessory.name : ''
  }

  const columns: TableProps<ProductMaterial>['columns'] = [
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
      title: 'Color Name',
      dataIndex: 'colorId',
      key: 'colorName',
      align: 'center',
      width: '10%',
      render: (colorId: number) => getColorNameById(colorId)
    },
    {
      title: 'Size Name',
      dataIndex: 'sizeId',
      key: 'sizeName',
      align: 'center',
      width: '10%',
      render: (sizeId: number) => getSizeNameById(sizeId)
    },
    {
      title: 'Accessory',
      dataIndex: 'accessoryId',
      align: 'center',
      key: 'accessory',
      render: (accessoryId: number) => getAccessoryName(accessoryId),
      width: '15%'
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      align: 'center',
      key: 'quantity',
      sorter: (a, b) => a.quantity - b.quantity,
      width: '25%'
    },
    {
      title: 'Price',
      dataIndex: 'price',
      align: 'center',
      key: 'price',
      sorter: (a, b) => a.price - b.price,
      width: '25%',
      render: (price: number) => `${price.toLocaleString()} VND`
    },
    {
      title: 'Image',
      align: 'center',
      render: (record: ProductMaterial) => <UploadCoverImageProductMaterial product={record} />
    },
    {
      title: 'Action',
      key: 'action',
      width: '15%',
      align: 'center',
      render: (record: ProductMaterial) => {
        return (
          <div style={{ display: 'flex', justifyContent: 'space-evenly', gap: '10px' }}>
            <EditOutlined onClick={() => handleOpenModalEdit(record.id)} />
            <Switch defaultChecked={record.status} onChange={() => handleDeleteProduct(record.id, record)} />
          </div>
        )
      }
    }
  ]

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '1%' }}>
        <Image src={editProduct?.coverImage} alt={editProduct?.name} height={300} />
        <Typography.Title level={2}>Name: {editProduct?.name}</Typography.Title>
        <Button
          style={{ width: '10%' }}
          type='primary'
          block
          onClick={() => {
            setIsOpenModalCreate(true)
          }}
        >
          Add New
        </Button>
      </div>
      <Table
        columns={columns}
        rowKey='id'
        dataSource={productMaterial}
        loading={loading || propSize.loading || propColor.loading || propAccesory.loading}
      />
      <CreateProductMaterialModal
        isOpenModalCreate={isOpenModalCreate}
        setOpenModal={setIsOpenModalCreate}
        productId={Number(param.id)}
      />
      <ProductDetailModalUpdate isOpenModal={isOpenModal} setOpenModal={setIsOpenModal} />
    </>
  )
}
