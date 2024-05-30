import { Toaster } from 'react-hot-toast'
import './App.css'
import ContentRouter from './router/Router.tsx'

function App() {
  return (
    <>
      <Toaster position='top-center' containerStyle={{ animation: 'ease-in-out' }} />
      <ContentRouter />
    </>
  )
}

export default App
