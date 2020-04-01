import React from 'react'
import { HashRouter, Switch, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { Navbar } from './components/Navbar'
import { About } from './pages/About'
import { Home } from './pages/Home'
import { Country } from './pages/Country'
import { Cohort } from './pages/Cohort'
import { fetchData } from './features/data/dataSlice'

const App: React.FC = () => {
  const dispatch = useDispatch()
  dispatch(fetchData())

  return (
    <HashRouter>
      <Navbar />
      <Switch>
        <div className="container">
          <Route path="/" component={Home} exact />
          <Route path="/about" component={About} />
          <Route path="/bycountry" component={Country} />
          <Route path="/cohort" component={Cohort} />        </div>
      </Switch>
    </HashRouter>
  )
}

export default App
