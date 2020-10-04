import React from 'react'
import { BrowserRouter, Switch } from 'react-router-dom'

import Index from './pages/Index'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Index />
    </Switch>
  </BrowserRouter>
)

export default App
