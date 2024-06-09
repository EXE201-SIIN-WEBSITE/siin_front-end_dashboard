import { Route, Routes } from 'react-router-dom'
import BillToPrint from '../pages/BillToPrint'
import NotFoundPage from '../pages/ContentPages/404'
import AccessoryManagement from '../pages/ContentPages/AccessoryManagement'
import ColorManagement from '../pages/ContentPages/ColorManagement'
import DashBoard from '../pages/ContentPages/Dashboard'
import OrderDetailManagement from '../pages/ContentPages/OrderDetailManagement'
import ProductDetail from '../pages/ContentPages/ProductDetail'
import ProductManagement from '../pages/ContentPages/ProductManagement'
import SizeManagement from '../pages/ContentPages/SizeManagement'
import UserManagement from '../pages/ContentPages/UserManagement'
import LayoutPage from '../pages/Layout'

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
            <OrderDetailManagement />
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
      <Route
        path='/size'
        element={
          <LayoutPage>
            <SizeManagement />
          </LayoutPage>
        }
      />
      <Route
        path='/color'
        element={
          <LayoutPage>
            <ColorManagement />
          </LayoutPage>
        }
      />
      <Route path='/billtoprint/:orderid' element={<BillToPrint />} />
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  )
}
