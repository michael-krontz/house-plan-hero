import './App.css';
import galleryItem1 from './hp-hero-1.jpg';
import galleryItem2 from './hp-hero-2.jpg';
import galleryItem3 from './hp-hero-3.jpg';
import galleryItem4 from './hp-hero-4.jpg';
import galleryItem5 from './hp-hero-5.jpg';
import { useRef } from 'react'
import { Form, Button, Card, Container } from 'react-bootstrap'
import { useAuth } from './AuthContext'

function Signup() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { signupUser } = useAuth()

  function handleSubit(e) {
    e.preventDefault()

    signupUser(emailRef.current.value, passwordRef.current.value)
  }

  return (
    <>
    <Card>
      <Card.Body><h2 className="text-center mb-4">Sign Up</h2>
        <Form>
          <Form.Group id="email">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" ref={emailRef} required></Form.Control>
          </Form.Group>
          <Form.Group id="password">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" ref={passwordRef} required></Form.Control>
          </Form.Group>
          <Form.Group id="password-confirm">
            <Form.Label>Password Confirmation</Form.Label>
            <Form.Control type="password" ref={passwordConfirmRef} required></Form.Control>
          </Form.Group>
          <Button className="w-100" type="submit">Sign Up</Button>
        </Form>
      </Card.Body>
    </Card>
    <div className="w-100 text-center mt-2"></div>
  </>
  )
}

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

    <AuthProvider>
      <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
        <div className="w-100" style={{ maxWidth: '400px' }}>
          <Signup></Signup>
        </div>
      </Container>
    </AuthProvider>

      <div className = "App-body">
        <ImageGallery></ImageGallery>
      </div>
    </div>
  );
};

export default App;
