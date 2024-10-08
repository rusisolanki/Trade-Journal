import {createBrowserRouter, Navigate, RouterProvider} from 'react-router-dom'
import CapitalDeployed from './pages/CapitalDeployed/CapitalDeployed'
import ExitTrade from './pages/ExitTrade/ExitTrade'
import Positions from './pages/Positions/Positions'
// import Summary from './pages/Summary/Summary'
import Symbols from './pages/Symbols/Symbols'
import Trades from './pages/Trade/Trades'
import Journal from './pages/Journal/Journal'
import Register from './pages/User/Register/Register'
import Login from './pages/User/Login/Login'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to='/authentication/login'/>
  },
  {
    path: '/:id/',
    element: <Journal/>,
  },
  {
    path: '/authentication/register',
    element: <Register/>,
  },
  {
    path: '/authentication/login',
    element: <Login/>,
  },
  {
    path: '/:id/trades',
    element: <Trades/>,
  },
  {
    path: '/:id/positions',
    element: <Positions/>
  },
  // {
  //   path: '/:id/summary',
  //   element: <Summary/>
  // },
  {
    path: '/:id/capital-deployed',
    element: <CapitalDeployed/>,
  },
  {
    path: '/:id/symbols',
    element: <Symbols/>
  },
  {
    path: '/:id/exit/:id',
    element: <ExitTrade/> 
  }
])

function App() {
  
  return (
    <RouterProvider router={router}/>
  )
}

export default App
