import { EditOutlined } from '@ant-design/icons'
import { Table, TableProps } from 'antd'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getAllColor } from '../../redux/actions/color.action'
import { RootState, useAppDispatch } from '../../redux/store'
import { Color } from '../../types/color.type'

const ColorManagement = () => {
  const dispatch = useAppDispatch()
  const { colors, loading: colorsLoading } = useSelector((state: RootState) => state.color)

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal
    dispatch(getAllColor({ signal }))
  }, [dispatch])

  const handleOpenModalEdit = (id: number) => {
    console.log(id)
  }

  const columns: TableProps<Color>['columns'] = [
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
      render: (record: Color) => {
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
      <Table dataSource={colors} columns={columns} rowKey='id' loading={colorsLoading} />
    </>
  )
}

export default ColorManagement
