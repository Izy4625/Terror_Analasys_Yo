import { routes } from './components/routes';
import { RouterProvider } from 'react-router-dom';
import Navbar from './components/navbar';
import { BrowserRouter as Router } from 'react-router-dom';
import ExampleRechart from './components/graf/GrafCompo/ReChartExample';
function App() {

  return (
    <>
   
      <Navbar/>
      <RouterProvider router={routes} />
    </>
  )
}

export default App
