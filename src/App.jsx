import './App.css'
import Navbar from './components/Navbar'
import ToDo from './components/ToDo'

function App() {


  return (
    <>
      <div className='container mx-auto my-16 bg-[#f25f4c] w-3/4 border-solid border-2 rounded-md border-[#0f0e17] shadow-xl selection:bg-[#e53170] selection:text-[#454242] min-h-[80vh]'>
        <Navbar />
        <ToDo />
      </div>
    </>
  )
}

export default App
