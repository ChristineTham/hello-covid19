import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { Navbar } from './components/Navbar'
import { About } from './pages/About'
import { Home } from './pages/Home'
import { fetchData } from './features/data/dataSlice'

const App: React.FC = () => {
  const dispatch = useDispatch()
  dispatch(fetchData())

  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <div className="container">
          <Route path="/" component={Home} exact />
          <Route path="/about" component={About} />
        </div>
      </Switch>
    </BrowserRouter>
  )
}

export default App
