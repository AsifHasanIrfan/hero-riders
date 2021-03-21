import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Home from './components/Home/Home';
import Destination from './components/Destination/Destination';
import Header from './components/Header/Header';
import Login from './components/Login/Login';
import { createContext, useState } from 'react';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import NotFound from './components/NotFound/NotFound';

export const userContext = createContext();

function App() {      
  const [loggedInUser, setLoggedInUser] = useState({});                              
  return (
    <userContext.Provider value={[loggedInUser, setLoggedInUser]}>
    <Router>
      <Header />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/home">
          <Home />
        </Route>
        <PrivateRoute path="/destination/:id">
          <Destination />
        </PrivateRoute>
        <PrivateRoute path="/destination">
          <Home />
        </PrivateRoute>
        <Route path="/login">
            <Login />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Router>
    </userContext.Provider>
  );
}

export default App;
