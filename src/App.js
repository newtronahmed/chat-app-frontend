import './App.css';
import {useEffect} from 'react'
import UserContextProvider from './context/userContext'
import Navbar from './components/navbar';
import Home from './components/home'
import Chat from './components/chat'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Login from './components/login';
import Signup from './components/signup';
import { CssBaseline } from '@material-ui/core';
function App() {
  
  return (
    <UserContextProvider>
      <Router>
      <CssBaseline />
      <Navbar />
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/chat/:room_id/:room_name' component={Chat} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/signup' component={Signup} />
      </Switch>
      </Router>
      
    </UserContextProvider>
    
  );
}

export default App;
