import { EditOutlined } from '@ant-design/icons'
import { Button, Image, Input, Switch, Table, TableProps } from 'antd'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { deleteAccessory, getAccessory, getAccessoryById } from '../../redux/actions/accessory.action'
import { RootState, useAppDispatch } from '../../redux/store'
import { Accessory } from '../../types/accessory.type'
import UploadAccessoryImage from '../../utils/UploadAccessoryImage'
import AccessoryModal from './Modal/AccessoryModal'

const AccessoryManagement = () => {
  const dispatch = useAppDispatch()
  const [search, setSearch] = useState<string>('')
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    dispatch(getAccessory({ signal }))

    return () => {
      abortController.abort()
    }
  }, [dispatch])

  const handleOpenModalEdit = (id: number) => {
    const abortController = new AbortController()
    const signal = abortController.signal
    dispatch(getAccessoryById({ id, signal }))
    setIsOpenModal(true)
  }

  const handleDeleteAccessory = (accessory: Accessory) => {
    const abortController = new AbortController()
    const signal = abortController.signal

    dispatch(deleteAccessory({ product: accessory, signal }))
  }

  const { loading, accessories } = useSelector((state: RootState) => state.accessory)

  const filteredAccessories = accessories.filter((accessory) =>
    accessory.name.toLowerCase().includes(search.toLowerCase())
  )

  const columns: TableProps<Accessory>['columns'] = [
    {
      title: 'ID',
      dataIndex: 'id',
      align: 'center',
      key: 'id',
      sorter: (a, b) => a.id - b.id,
      width: '10%',
      render: (_text, _record, index) => index + 1 // Auto-incrementing ID
    },
    {
      title: 'Name',
      dataIndex: 'name',
      align: 'center',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      width: '45%'
    },
    {
      title: 'Image',
      key: 'name',
      align: 'center',
      width: '15%',
      render: (record: Accessory) => {
        return <UploadAccessoryImage product={record} />
      }
    },
    {
      title: 'Action',
      key: 'id',
      width: '30%',
      align: 'center',
      render: (record: Accessory) => {
        return (
          <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
            <EditOutlined onClick={() => handleOpenModalEdit(record.id)} />
            <Switch defaultChecked={record.status} onChange={() => handleDeleteAccessory(record)} />
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
      <Table columns={columns} rowKey='id' dataSource={filteredAccessories} loading={loading} />
      <AccessoryModal isOpenModal={isOpenModal} setOpenModal={setIsOpenModal} />
    </>
  )
}

export default AccessoryManagement
