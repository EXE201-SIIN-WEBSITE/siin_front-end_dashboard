import { Route, Routes } from 'react-router-dom'
import DashBoard from '../pages/ContentPages/Dashboard'
import LayoutPage from '../pages/Layout'
import UserManagement from '../pages/ContentPages/UserManagement'
import OrderManagement from '../pages/ContentPages/OrderManagement'
import ProductManagement from '../pages/ContentPages/ProductManagement'
import BlogManagement from '../pages/ContentPages/BlogManagement'
import FeedbackManagement from '../pages/ContentPages/FeedbackManagement'
import CreateBlog from '../pages/ContentPages/CreateBlog'
import EditBlog from '../pages/ContentPages/EditBlog'
import NotFoundPage from '../pages/ContentPages/404'

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
        path='/blog'
        element={
          <LayoutPage>
            <BlogManagement />
          </LayoutPage>
        }
      >
        <Route path='new' element={<CreateBlog />} /> {/*A nested route!*/}
        <Route path=':id' element={<EditBlog />} /> {/*A nested route!*/}
      </Route>
      <Route
        path='/feedback'
        element={
          <LayoutPage>
            <FeedbackManagement />
          </LayoutPage>
        }
      />
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  )
}
