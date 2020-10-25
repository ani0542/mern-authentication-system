import React from 'react'
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from './auth/Login';
import Register from './auth/Register';
import UserContext from './context/UserContext';
import Navbar from './layout/Navbar';
import Home from './pages/Home';
import './style.css'
function App() {
  return (
    <div>
          <BrowserRouter>
               <UserContext>

              
              <Navbar/>
                  <div className="container">
                    <Switch>
                      <Route exact path="/" component={Home} />
                      <Route path="/login" component={Login} />
                     <Route path="/register" component={Register} />
                    </Switch>
                  </div>
           </UserContext>  
      </BrowserRouter>
    </div>
  )
}

export default App
