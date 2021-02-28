import './App.css';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import AuthContent from './AuthContent'
import Deck, { deckDone } from './Deck'
import React, { useState } from "react";
// import { Button } from 'bootstrap';

const [hidden, setHidden] = useState(true);

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

function DeckButtons({}) {
  const [hidden, setHidden] = useState(true);
  if (deckDone === true) {
    return (
        <div className = "DeckButtonsWrapper">
          <div className = "DeckButtons">
            <button>Reload</button>
            <button>View More</button>
          </div>
        </div>
    );
  }
}

function LessText({ text, maxLength }) {
  // Create a piece of state, and initialize it to `true`
  // `hidden` will hold the current value of the state,
  // and `setHidden` will let us change it

  // If the text is short enough, don't bother with the
  // buttons
  if (deckDone == false) {
    return <span>{text}</span>;
  }
}


function App() {
  return (
    <Router>
    <>
      <header className = "App-header">
        <Logo></Logo>
        <NavBar></NavBar>
      </header>
        <DeckButtons></DeckButtons>
        <Redirect exact from="/" to="/deck" />
        <Route path='/deck' component={Deck}/>
        <Route path='/authcontent' component={AuthContent}/>
    </>
    </Router>
  );
};

export default App;
