import {Outlet} from 'react-router-dom';
import Navigation from './pages/Auth/Navigation.jsx';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function App() {
  return (
    <>
      <ToastContainer />
      <div className="min-h-screen bg-[#0f0f0f] flex">
      <Navigation />
      <main className="flex-1 ml-[4%]">
        <Outlet />
      </main>
    </div>

    </>
  )
}

export default App
