import {
  ContainerOutlined,
  PieChartOutlined,
  ProductOutlined,
  ShoppingCartOutlined,
  StarOutlined,
  UserOutlined,
  LogoutOutlined
} from '@ant-design/icons'
import { Menu } from 'antd'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function MenuNav() {
  const [selectedKey, setSelectedKey] = useState<string>(() => {
    return sessionStorage.getItem('selectedKey') || ''
  })
  const navigate = useNavigate()

  const handleMenuClick = ({ key }: { key: string }) => {
    navigate(`/${key}`)
    setSelectedKey(key)
  }

  useEffect(() => {
    sessionStorage.setItem('selectedKey', selectedKey)
  }, [selectedKey])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <div style={{ justifyContent: 'center', textAlign: 'center', padding: '15% 0 15% 0' }}>
        <img src='/public/logo.png' style={{ height: '50%', width: '50%' }} alt='logo' />
      </div>
      <Menu
        mode='inline'
        selectedKeys={[selectedKey]}
        defaultSelectedKeys={['1']}
        onClick={handleMenuClick}
        items={[
          {
            key: '',
            icon: <PieChartOutlined />,
            label: 'Dashboard'
          },
          {
            key: 'user',
            icon: <UserOutlined />,
            label: 'User'
          },
          {
            key: 'order',
            icon: <ShoppingCartOutlined />,
            label: 'Order'
          },
          {
            key: 'product',
            icon: <ProductOutlined />,
            label: 'Product'
          },
          {
            key: 'accessory',
            icon: <ProductOutlined />,
            label: 'Accessory'
          }
        ]}
      />
      <div
        style={{
          alignItems: 'center',
          display: 'flex',
          gap: '5%',
          textAlign: 'center'
        }}
      >
        <LogoutOutlined />
        <span>SignOut</span>
      </div>
    </div>
  )
}
