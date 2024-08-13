import CapitalDeployed from './pages/CapitalDeployed/CapitalDeployed'
import ExitTrade from './pages/ExitTrade/ExitTrade'
import Positions from './pages/Positions/Positions'
import Summary from './pages/Summary/Summary'
import Symbols from './pages/Symbols/Symbols'
import Trades from './pages/Trade/Trades'
import Journal from './pages/Journal/Journal'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Journal/>,
  },
  {
    path: '/:id/trades',
    element: <Trades/>,
  },
  {
    path: '/:id/positions',
    element: <Positions/>
  },
  {
    path: '/:id/summary',
    element: <Summary/>
  },
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
