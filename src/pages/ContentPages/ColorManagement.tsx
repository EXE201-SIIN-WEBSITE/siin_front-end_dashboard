import { EditOutlined } from '@ant-design/icons'
import { Button, Input, Table, TableProps } from 'antd'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getAllColor, getColorById } from '../../redux/actions/color.action'
import { RootState, useAppDispatch } from '../../redux/store'
import { Color } from '../../types/color.type'
import ColorModal from './Modal/ColorModal'

const ColorManagement = () => {
  const dispatch = useAppDispatch()
  const { colors, loading: colorsLoading } = useSelector((state: RootState) => state.color)
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false)
  const [, setSearch] = useState<string>('')

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal
    dispatch(getAllColor(signal))
  }, [dispatch])

  const handleOpenModalEdit = (id: number) => {
    setOpenModalEdit(true)
    dispatch(getColorById({ id, signal: new AbortController().signal }))
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
            setOpenModalEdit(true)
          }}
        >
          Add New
        </Button>
      </div>
      <ColorModal isOpenModal={openModalEdit} setOpenModal={setOpenModalEdit} />
      <Table dataSource={colors} columns={columns} rowKey='id' loading={colorsLoading} />
    </>
  )
}

export default ColorManagement
