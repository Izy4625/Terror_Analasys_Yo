import { routes } from './components/routes';
import { RouterProvider } from 'react-router-dom';
import Navbar from './components/navbar';

function App() {

  return (
    <>
   
      <Navbar/>
      <RouterProvider router={routes} />
    </>
  )
}

export default App
