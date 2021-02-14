import React, { useEffect, useState } from 'react';
import './App.css';
import { Container } from 'react-bootstrap'
import Signup from './Signup'
import { AuthProvider } from './AuthContext'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Dashboard from './Dashboard'
import Login from './Login'
import PrivateRoute from './PrivateRoute'
import ForgotPassword from "./ForgotPassword"
import UpdateProfile from "./UpdateProfile"

function Logo() {
  return (
    <div className = "Logo-wrapper">
      <h4 style={{ marginBottom: "0" }}>House Plan Hero</h4>      
    </div>
  );
};

function NavBar() {
  return (
  <div className = "Nav-wrapper">
      <ul className = "Nav">
        <li>Login</li>
      </ul>
  </div>
  );
}

function ApiCall() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("https://house-plan-hero-default-rtdb.firebaseio.com/houseplans.json")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <ul>
        {items.map(item => (
          <li key={item.id}>
            <img src={`../images/hph_${item.id}.jpg`}  alt={item.name}  className = "responsive"/>
          </li>
        ))}
      </ul>
    );
  }
}

function App() {
  return (
    <div className="App">

      <header className = "App-header">
        <Logo></Logo>
        <NavBar></NavBar>
      </header>

      <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
        <div className="w-100" style={{ maxWidth: '400px' }}>
          <Router>
            <AuthProvider>
              <Switch>
                <PrivateRoute exact path="/" component={Dashboard} />
                <PrivateRoute path="/update-profile" component={UpdateProfile} />
                <Route path="/signup" component={Signup} />
                <Route path="/login" component={Login} />
                <Route path="/forgot-password" component={ForgotPassword} />
              </Switch>
            </AuthProvider>
          </Router>
        </div>
      </Container>

      <div className = "App-body">
        <ApiCall></ApiCall>
      </div>
    </div>
  );
};

export default App;
