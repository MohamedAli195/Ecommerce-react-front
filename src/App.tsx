
import { RouterProvider } from 'react-router-dom'
import router from './router'
import Drawer from './components/Drawer'

function App() {

  return (
    <>
          <RouterProvider router={router} />
          <Drawer />
    </>
  )
}

export default App
