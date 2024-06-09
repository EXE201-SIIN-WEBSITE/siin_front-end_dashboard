import { EditOutlined } from '@ant-design/icons'
import { Table, TableProps } from 'antd'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getAllSize } from '../../redux/actions/size.action'
import { RootState, useAppDispatch } from '../../redux/store'
import { Size } from '../../types/size.type'

const SizeManagement = () => {
  const dispatch = useAppDispatch()
  const { sizes, loading: sizesLoading } = useSelector((state: RootState) => state.size)

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal
    dispatch(getAllSize({ signal }))
  }, [dispatch])

  const handleOpenModalEdit = (id: number) => {
    console.log(id)
  }

  const columns: TableProps<Size>['columns'] = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price'
    },
    {
      title: 'Action',
      key: 'action',
      width: '15%',
      align: 'center',
      render: (record: Size) => {
        return (
          <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
            <EditOutlined onClick={() => handleOpenModalEdit(record.id)} />
          </div>
        )
      }
    }
  ]

  return (
    <>
      <Table dataSource={sizes} columns={columns} rowKey='id' loading={sizesLoading} />
    </>
  )
}

export default SizeManagement
