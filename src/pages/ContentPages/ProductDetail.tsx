import { Image, Switch, Table, TableProps } from 'antd'
import { ProductMaterial } from '../../types/productMaterial.type'
import { EditOutlined } from '@ant-design/icons'
import { RootState, useAppDispatch } from '../../redux/store'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getProductMaterial } from '../../redux/actions/productmaterial.action'

export default function ProductDetail() {
  const dispatch = useAppDispatch()
  const { loading, productMaterial } = useSelector((state: RootState) => state.productMaterial)

  useEffect(() => {
    const abortController = new AbortController()

    const signal = abortController.signal
    dispatch(getProductMaterial({ signal }))
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
      width: '30%'
    },
    {
      title: 'Size Name',
      dataIndex: 'sizeId',
      key: 'name',
      align: 'center',
      width: '30%'
    },
    {
      title: 'Accessory',
      dataIndex: 'accessoryId',
      align: 'center',
      key: 'price',
      width: '25%'
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      align: 'center',
      key: 'price',
      sorter: (a, b) => a.price - b.price,
      render: (price: number) => `${price.toLocaleString()} VND`,
      width: '25%'
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
      <div className='product_cover_containter'></div>
      <Table columns={columns} rowKey='id' dataSource={productMaterial} loading={loading} />
    </>
  )
}
