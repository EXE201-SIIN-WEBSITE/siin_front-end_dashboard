import { Button, Input, Table, TableProps } from 'antd'
import { User } from '../../types/user.type'
import { RootState, useAppDispatch } from '../../redux/store'
import { useEffect, useState } from 'react'
import { getAllUsers } from '../../redux/actions/user.action'
import { useSelector } from 'react-redux'

export default function UserManagement() {
  const dispatch = useAppDispatch()
  const [search, setSearch] = useState<string>('')
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  const { loading: userloading, user } = useSelector((state: RootState) => state.user)

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    dispatch(getAllUsers(signal))

    return () => {
      abortController.abort()
    }
  }, [dispatch])

  const columns: TableProps<User>['columns'] = [
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: 'Full Name',
      dataIndex: 'fullName',
      key: 'fullName'
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone'
    },
    {
      title: 'Avatar',
      dataIndex: 'avatar',
      key: 'avatar',
      render: (avatar: string) => <img src={avatar} alt='Avatar' style={{ width: 50, borderRadius: '50%' }} />
    },
    {
      title: 'Date of Birth',
      dataIndex: 'dob',
      key: 'dob'
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
      <Table columns={columns} dataSource={user} rowKey='id' loading={userloading} />
    </>
  )
}
