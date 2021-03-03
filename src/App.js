import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import AuthContent from './AuthContent'
import React, { useReducer, useState, useEffect } from 'react'
import axios from 'axios'
import { useSprings, animated, interpolate } from 'react-spring'
import { useDrag } from 'react-use-gesture'
import { useDoubleTap } from 'use-double-tap';

var cards = []
var cardUrl
var charext
var hpCardId
var lowercase
var currentCard = 1

var cards = []

var buttonStyle = {
  width: '100%',
  height: '100%',
  opacity: '0'
};

const initialState = {
  value: []
 }

 const reducer = (state, action) => {
  switch(action.type){
   case `RESET` :
    return {cards: [state.value + 1] };
   default:
    return state; 
  }
 }

 // These two are just helpers, they curate spring data, values that are later being interpolated into css
const to = i => ({ x: 0, y: i * -4, scale: 1, rot: -10 + Math.random() * 20, delay: i * 100 })
const from = i => ({ x: 0, rot: 0, scale: 1.5, y: -1000 })
// This is being used down there in the view, it interpolates rotation and scale into a css transform
const trans = (r, s) => `perspective(1100px) rotateX(2deg) rotateY(${r / 2}deg) rotateZ(${r}deg) scale(${s})`

function Deck() {
  const LikeEvent = () => {
    const bind = useDoubleTap((event) => {
      if (currentCard < 8) {
        console.log("Card Numer: " +  currentCard + " of " +  cards.length)
      }
    });
    return <button {...bind} style={buttonStyle}></button>;
  }
  
    const [gone] = useState(() => new Set()) // The set flags all the cards that are flicked out
    const [props, set] = useSprings(cards.length, i => ({ ...to(i), from: from(i) })) // Create a bunch of springs using the helpers above
    // Create a gesture, we're interested in down-state, delta (current-pos - click-pos), direction and velocity
    const bind = useDrag(({ args: [index], down, delta: [xDelta], distance, direction: [xDir], velocity }) => {
      const trigger = velocity > 0.1 // If you flick hard enough it should trigger the card to fly out
      const dir = xDir < 0 ? -1 : 1 // Direction should either point left or right
      if (!down && trigger) gone.add(index) // If button/finger's up and trigger velocity is reached, we flag the card ready to fly out
      set(i => {
        if (index !== i) return // We're only interested in changing spring-data for the current spring
        const isGone = gone.has(index)
        const x = isGone ? (200 + window.innerWidth) * dir : down ? xDelta : 0 // When a card is gone it flys out left or right, otherwise goes back to zero
        const rot = xDelta / 10 + (isGone ? dir * 10 * velocity : 0) // How much the card tilts, flicking it harder makes it rotate faster
        const scale = down ? 1 : 1 // Active cards lift up a bit
        if (isGone === true) {
          currentCard ++
          if (currentCard > 7) {
            currentCard = 1
          }
  
          console.log("Current Card: " + currentCard);
        }
  
        return { x, rot, scale, delay: undefined, config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 } }
      })
      if (!down && gone.size === 7) return
    })
           
          // Now we're just mapping the animated values to our view, that's it. Btw, this component only renders once. :-)
        return props.map(({ x, y, rot, scale }, i) => (
          <animated.div key={i} style={{ transform: interpolate([x, y], (x, y) => `translate3d(${x}px,${y}px,0)`) }}>
            {/* This is the card itself, we're binding our gesture to it (and inject its index so we know which is which) */}
            <animated.div {...bind(i)} style={{ transform: interpolate([rot, scale], trans), backgroundImage: `url(${cards[i]})` }}>
            <LikeEvent></LikeEvent>
            </animated.div>
          </animated.div>
        ))
  }
  

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

  function DeckButtons() {   
    return(
          <div>
                  <div className = "DeckButtonsWrapper">
                  <div className = "DeckButtons">
                    <button>Reload</button>
                    <button>View Different Style</button>
                    <button>View More</button>
                    </div>
                  </div>
          </div>
    )
  }


function App() {

  const [count, dispatch] = useReducer(reducer, initialState);
  const [posts, setPosts]=useState([])
  const getPosts = async () => {
    try {
      const userPosts = await axios.get("https://house-plan-hero-default-rtdb.firebaseio.com/houseplans.json")
      setPosts(userPosts.data);  // set State

      } 
      catch (err) {
        console.error(err.message);
      }
  };

    /* eslint-disable */
  var z
  for (z = 0; z < 8; z++) {
    posts.filter(houseplan => houseplan.id === z).map(hp => (
      charext = hp.designer.substring(0, 1),
      lowercase = charext.toLowerCase(),
      hpCardId = lowercase + z,
      cardUrl = "images/" + hpCardId + ".jpg",
      cards.push(cardUrl),
      console.log(cardUrl)
    ));
  }
  /* eslint-enable */

  useEffect(()=>{
    getPosts()
  }, [])


  return (
    <Router>
    <>
      <header className = "App-header">

        <Logo></Logo>
        <div>
          <h2>{count.value}</h2>
          <button onClick={()=>dispatch({type: 'RESET'})}>RESET</button>
        </div>
        <NavBar></NavBar>
        
      </header>

        {/* <DeckButtons></DeckButtons> */}
        <Deck></Deck>

        <Route path='/authcontent' component={AuthContent}/>
    </>
    </Router>
  );
};

export default App;
