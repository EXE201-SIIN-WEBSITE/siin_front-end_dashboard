import { PieChartOutlined, ProductOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons'
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
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <img src='/LOGO -05.png' style={{ height: '50%', width: '50%' }} alt='logo' />
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
          },
          {
            key: 'size',
            icon: <ProductOutlined />,
            label: 'Size'
          },
          {
            key: 'color',
            icon: <ProductOutlined />,
            label: 'Color'
          }
        ]}
      />
    </div>
  )
}
