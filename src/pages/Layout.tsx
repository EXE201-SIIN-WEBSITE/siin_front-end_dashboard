import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { Button, Layout, theme } from 'antd'
import React, { useState } from 'react'
import MenuNav from './UI/MenuNav'
import { Outlet, useLocation, useParams } from 'react-router-dom'

const { Header, Sider, Content } = Layout

type Props = {
  children: React.ReactNode
}
const LayoutPage = ({ children }: Props) => {
  const location = useLocation()
  const { id } = useParams()
  const [collapsed, setCollapsed] = useState(false)
  const {
    token: { colorBgContainer, borderRadiusLG }
  } = theme.useToken()

  const isNestedRoute = location.pathname.includes('/blog/new') || id

  return (
    <Layout>
      <Sider theme={'light'} trigger={null} collapsible collapsed={collapsed} style={{ minHeight: '100vh' }}>
        <div className='demo-logo-vertical' />
        <MenuNav />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type='text'
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64
            }}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG
          }}
        >
          {isNestedRoute ? <Outlet /> : children}
        </Content>
      </Layout>
    </Layout>
  )
}

export default LayoutPage
