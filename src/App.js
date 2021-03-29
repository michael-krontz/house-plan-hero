import './App.css';
import React, { useState, useRef } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import AuthContent from './AuthContent'
import { useSprings, animated, interpolate } from 'react-spring'
import { useDrag } from 'react-use-gesture'
import useAxios from 'axios-hooks'
import useDoubleClick from 'use-double-click'
import { RecoilRoot, atom, useRecoilValue, useSetRecoilState, useRecoilState } from 'recoil';

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

var cardUrl
var charext
var hpCardId
var lowercase
var currentCard = 1
var z = 0
var _ = require('lodash')

function DetailDeckBuild() {
  const cardState = useRecoilValue(detailState);
  const to = i => ({ x: 0, y: i * -4, scale: 1, rot: -10 + Math.random() * 20, delay: i * 100 })  // These two are just helpers, they curate spring data, values that are later being interpolated into css
  const from = i => ({ x: 0, rot: 0, scale: 1.5, y: -1000 })
  const trans = (r, s) => `perspective(1100px) rotateX(2deg) rotateY(${r / 2}deg) rotateZ(${r}deg) scale(${s})`   // This is being used down there in the view, it interpolates rotation and scale into a css transform
  
    function DetailDeck() {
      const [gone] = useState(() => new Set()) // The set flags all the cards that are flicked out
      const [props, set] = useSprings(cardState.length, i => ({ ...to(i), from: from(i) })) // Create a bunch of springs using the helpers above
    
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
          }        
            // Reload function
            // gone.clear() || set(i => to(i)), 600)
            return { x, rot, scale, delay: undefined, config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 } }
        })  
      })

      // Now we're just mapping the animated values to our view, that's it. Btw, this component only renders once. :-)
     return (
       props.map(({ x, y, rot, scale }, i) => (
         <animated.div key={i} style={{ transform: interpolate([x, y], (x, y) => `translate3d(${x}px,${y}px,0)`) }}>
           {/* This is the card itself, we're binding our gesture to it (and inject its index so we know which is which) */}
           <animated.div {...bind(i)} style={{ transform: interpolate([rot, scale], trans), backgroundImage: `url(${cardState[i]})` }}>
           </animated.div>
         </animated.div>
       ))
     )
    } 

    return (
    <>
      <DetailDeck></DetailDeck>
    </>
    )
  }

function DeckBuild() {
  var allCards = []
  var cards = []
  var allCardIds = []

  const [isDeckOver, setDeckOver] = useState(false); 
  const [stateVal, setStateVal] = useState([cards]); 
  const [{ data, loading, error }, refetch] = useAxios(
    'https://house-plan-hero-default-rtdb.firebaseio.com/houseplans.json'
  )

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error!</p>

  var cardData = data
    /* eslint-disable */
  var x
  for (x=0; x < cardData.length; x++) {
    cardData.filter(houseplan => houseplan.id === x).map(hp => (
      charext = hp.designer.substring(0, 1),
      lowercase = charext.toLowerCase(),
      hpCardId = lowercase + x,
      allCardIds.push(hpCardId),
      cardUrl = "images/" + hpCardId + ".jpg",
      allCards.push(cardUrl)
      ));
  }

    var newArray = _.chunk(allCards, [5])
    var cards = newArray[z]

  const zoop = () => {};

  const NextDeckButton = ({ onClick }) => (
    <button className="next-button" onClick={onClick}>[Deck Icon]</button>
  )

  NextDeckButton.defaultProps = {
    onClick: zoop,
  };

  const NextDeck = () => {
    return <NextDeckButton onClick={NextDeckAction} />
  };

  const NextDeckAction = () => {
    if (z < (newArray.length)) {
      z ++
      cards = newArray[z]
      setStateVal(cards)
      console.log("new array: " + newArray.length)
      console.log("z: " + z)
      console.log("newarray - 1: " + (newArray.length - 1))

      if (z === (newArray.length - 1)) {
        console.log("z: " + z)
        console.log("No More Cards")
        setDeckOver(true)
      }
    }
  };




  function VisibleInfoBox(props) {
    return <div className="info-box">
      <p>This is a conditional info box.</p>
      </div>;
  }
  
  function HiddenInfoBox(props) {
    return <h1></h1>;
  }
  
  function InfoBox(props) {
    if (isDeckOver) {
      
      return <VisibleInfoBox />;
    }
    return <HiddenInfoBox />;
  }

  function Deck() {
  var currentCardId = []
  console.log(typeof currentCardId)
  console.log(currentCardId)
  
  const to = i => ({ x: 0, y: i * -4, scale: 1, rot: -10 + Math.random() * 20, delay: i * 100 })  // These two are just helpers, they curate spring data, values that are later being interpolated into css
  const from = i => ({ x: 0, rot: 0, scale: 1.5, y: -1000 })
  const trans = (r, s) => `perspective(1100px) rotateX(2deg) rotateY(${r / 2}deg) rotateZ(${r}deg) scale(${s})`   // This is being used down there in the view, it interpolates rotation and scale into a css transform
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
        currentCardId = allCardIds[currentCard - 1]
      }        

      console.log(currentCardId)

        // Reload function
        // gone.clear() || set(i => to(i)), 600)
        return { x, rot, scale, delay: undefined, config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 } }
    })  
  })


     // Now we're just mapping the animated values to our view, that's it. Btw, this component only renders once. :-)
    return (
      props.map(({ x, y, rot, scale }, i) => (
        <animated.div key={i} style={{ transform: interpolate([x, y], (x, y) => `translate3d(${x}px,${y}px,0)`) }}>
          {/* This is the card itself, we're binding our gesture to it (and inject its index so we know which is which) */}
          <animated.div {...bind(i)} style={{ transform: interpolate([rot, scale], trans), backgroundImage: `url(${cards[i]})` }}>
          <DoubleClickEvent currentCardId={currentCardId}></DoubleClickEvent>
          </animated.div>
        </animated.div>
      ))
    )
  }


  return(
    <>
      <div>
        <div className = "DeckButtonsWrapper">
          <div className = "DeckButtons">
            <button>View Different Style</button>
            <NextDeck></NextDeck>
          </div>
        </div>
      </div>
      <InfoBox isDeckOver={false} />
      <Deck></Deck>
    </>
  )
}

const DoubleClickEvent = (props) => {
  const setDetailCards = useSetRecoilState(detailState)
  const buttonRef = useRef();
 
  useDoubleClick({
    onDoubleClick: e => setDetailCards(['images/' + props.currentCardId + '-1.jpeg']),
    ref: buttonRef,
    latency: 350
  });

  const [detailStateLog, setDetailStateLog] = useRecoilState(detailState)
  console.log(detailStateLog)


  return <div className="tap-area" ref={buttonRef}>Click Me</div>
}

const detailState = atom({
  key: 'detailState', // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});

function App() {
  return (
    <Router>
    <>
      <header className = "App-header">
        <Logo></Logo>
        <NavBar></NavBar>
      </header>
        <RecoilRoot>
          <DeckBuild></DeckBuild>        
          <DetailDeckBuild></DetailDeckBuild>
        </RecoilRoot>
        <Route path='/authcontent' component={AuthContent}/>
    </>
    </Router>
  );
};

export default App;
