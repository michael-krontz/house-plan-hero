import React from 'react';
import './App.css';
import galleryItem1 from './hp-hero-1.jpg';
import galleryItem2 from './hp-hero-2.jpg';
import galleryItem3 from './hp-hero-3.jpg';
import galleryItem4 from './hp-hero-4.jpg';
import galleryItem5 from './hp-hero-5.jpg';
import { Container } from 'react-bootstrap'
import Signup from './Signup'
import { AuthProvider } from './AuthContext'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Dashboard from './Dashboard'
import Login from './Login'
import PrivateRoute from './PrivateRoute'
import ForgotPassword from "./ForgotPassword"
import UpdateProfile from "./UpdateProfile"
import ApiCall from './ApiCall'

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

function ImageGallery() {
  return (
    
  <div className = "Image-gallery">
  <ul className = "Gallery-list">
    <li className = "Gallery-Item">
    <img src={galleryItem1} alt="Houseplan Name"  className = "responsive"/>
    <img src={galleryItem2} alt="Houseplan Name" className = "responsive"/>
    <img src={galleryItem3} alt="Houseplan Name" className = "responsive"/>
    <img src={galleryItem4} alt="Houseplan Name" className = "responsive"/>
    <img src={galleryItem5} alt="Houseplan Name" className = "responsive"/>
    </li>
  </ul>
</div>
  )
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
        <ImageGallery></ImageGallery>
      </div>
    </div>
  );
};

export default App;
