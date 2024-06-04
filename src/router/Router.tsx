import { Route, Routes } from 'react-router-dom'
import NotFoundPage from '../pages/ContentPages/404'
import AccessoryManagement from '../pages/ContentPages/AccessoryManagement'
import DashBoard from '../pages/ContentPages/Dashboard'
import OrderManagement from '../pages/ContentPages/OrderManagement'
import ProductManagement from '../pages/ContentPages/ProductManagement'
import UserManagement from '../pages/ContentPages/UserManagement'
import LayoutPage from '../pages/Layout'
import ProductDetail from '../pages/ContentPages/ProductDetail'

export default function ContentRouter() {
  return (
    <Routes>
      <Route
        index
        path='/'
        element={
          <LayoutPage>
            <DashBoard />
          </LayoutPage>
        }
      />
      <Route
        path='/user'
        element={
          <LayoutPage>
            <UserManagement />
          </LayoutPage>
        }
      />
      <Route
        path='/order'
        element={
          <LayoutPage>
            <OrderManagement />
          </LayoutPage>
        }
      />
      <Route
        path='/product'
        element={
          <LayoutPage>
            <ProductManagement />
          </LayoutPage>
        }
      />
      <Route
        path='/accessory'
        element={
          <LayoutPage>
            <AccessoryManagement />
          </LayoutPage>
        }
      />
      <Route
        path='/product/:id'
        element={
          <LayoutPage>
            <ProductDetail />
          </LayoutPage>
        }
      />
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  )
}
