import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import AuthContent from './AuthContent'
import DeckBuild from './Deck'

function Logo() {
  return (
    <div className = "Logo-wrapper">
      <Link to={'/deck'}  style={{ marginBottom: '0', textDecoration: 'none', color: 'white', fontSize: '24px' }}>House Plan Hero</Link>
    </div>
  );
};

function NavBar() {
  return (
      <div className = "Nav-wrapper">
          <ul className = "Nav">
            <li>
              <Link to={'/authcontent'} style={{ textDecoration: 'none', color: 'white' }}>Login</Link>
            </li>
          </ul>
      </div>
  );
}

function App() {
  return (
    <Router>
    <>
      <header className = "App-header">
        <Logo></Logo>
        <NavBar></NavBar>
      </header>
        <DeckBuild></DeckBuild>
        <Route path='/authcontent' component={AuthContent}/>
    </>
    </Router>
  );
};

export default App;
