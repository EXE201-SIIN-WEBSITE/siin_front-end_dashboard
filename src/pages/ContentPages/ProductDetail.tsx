import { Image, Switch, Table, TableProps, Typography } from 'antd'
import { ProductMaterial } from '../../types/productMaterial.type'
import { EditOutlined } from '@ant-design/icons'
import { RootState, useAppDispatch } from '../../redux/store'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getProductMaterialByProductId } from '../../redux/actions/productmaterial.action'
import { getProductId } from '../../redux/actions/product.actions'
import { useParams } from 'react-router-dom'

export default function ProductDetail() {
  const dispatch = useAppDispatch()
  const { loading, productMaterial } = useSelector((state: RootState) => state.productMaterial)
  const { editProduct } = useSelector((state: RootState) => state.product)
  const param = useParams<{ id: string }>()

  useEffect(() => {
    const abortController = new AbortController()

    const signal = abortController.signal
    dispatch(getProductMaterialByProductId({ productId: Number(param.id), signal }))
    dispatch(getProductId({ id: Number(param.id), signal }))
    return () => {
      abortController.abort()
    }
  }, [])

  const handleOpenModalEdit = (id: number) => {
    console.log(id)
  }

  const handleDeleteProduct = (id: number, obj: ProductMaterial) => {
    console.log(id)
    console.log(obj)
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
      key: 'name',
      align: 'center',
      width: '10%'
    },
    {
      title: 'Size Name',
      dataIndex: 'sizeId',
      key: 'name',
      align: 'center',
      width: '10%'
    },
    {
      title: 'Accessory',
      dataIndex: 'accessoryId',
      align: 'center',
      key: 'price',
      width: '15%'
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      align: 'center',
      key: 'price',
      sorter: (a, b) => a.price - b.price,
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
      dataIndex: 'image',
      align: 'center',
      render: (imgurl: string) => <Image src={imgurl} alt='cover' width={'100px'} />
    },

    {
      title: 'Action',
      key: 'id',
      width: '15%',
      align: 'center',
      render: (record: ProductMaterial) => {
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
      <div className='product_cover_containter' style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <Image src={editProduct?.coverImage} alt={editProduct?.name} style={{ width: '20%' }} />
        <Typography.Title level={2}>{editProduct?.name}</Typography.Title>
      </div>
      <Table columns={columns} rowKey='id' dataSource={productMaterial} loading={loading} />
    </>
  )
}
