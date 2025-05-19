import './App.css'
import Navbar from './components/Navbar.jsx'
import ToDo from './components/ToDo.jsx'
import Login from './components/Login.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <><Navbar/><ToDo/></>
    },
    {
      path: '/login',
      element: <><Login/></>
    }
  ])

  return (
    <>
      <div className='container mx-auto my-16 bg-[#4e6760] w-3/4 border-solid border-2 rounded-md border-[#0f0e17] shadow-xl selection:bg-[#be9d63] selection:text-[#454242] min-h-[80vh]'>
        <RouterProvider router={router}/>
        {/* <Navbar /> */}
        {/* <ToDo /> */}
      </div>
    </>
  )
}

export default App
