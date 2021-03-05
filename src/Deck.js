import React, { useState } from 'react'
import { useSprings, animated, interpolate } from 'react-spring'
import { useDrag } from 'react-use-gesture'
import useAxios from 'axios-hooks'


var cardUrl
var charext
var hpCardId
var lowercase
var currentCard = 1
var z = 0

var _ = require('lodash')

export default function DeckBuild() {
  var allCards = []
  var cards = []
  const [stateVal, setStateVal] = React.useState([cards]);
  
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
      cardUrl = "images/" + hpCardId + ".jpg",
      allCards.push(cardUrl)
      ));
  }

    var newArray = _.chunk(allCards, [5])
    var cards = newArray[z]
    var displayStatus = 'flex'

  const zoop = () => {};

  const NextDeckButton = ({ onClick }) => (
    <div style={{ width: '100%', height: '40px', backgroundColor: 'gray', display: {displayStatus} }} onClick={onClick}></div>
  )

  NextDeckButton.defaultProps = {
    onClick: zoop,
  };

  const NextDeck = () => {
    return <NextDeckButton onClick={NextDeckAction} />
  };

  const NextDeckAction = () => {
    if (z < (newArray.length - 1)) {
      z ++
      cards = newArray[z]
      setStateVal(cards)
    }

    else if (z = newArray.length) {
      displayStatus = 'none'
    }
  };

  const noop = () => {};

  const ClickableBox = ({ onClick, onDoubleClick }) => (
    <div style={{ width: '100%', height: '100%', opacity: '0' }} onClick={onClick} onDoubleClick={onDoubleClick}></div>
  );

  ClickableBox.defaultProps = {
    onClick: noop,
    onDoubleClick: noop,
  };

  const DoubleClickExample = () => (
    <ClickableBox
      onDoubleClick={LikeEvent}
      return 
    />
  );

  const LikeEvent = () => {
    const newItems = [...stateVal];
    cards.push('New Card', 'New Card', 'New Card', 'New Card', 'New Card')
    setStateVal(newItems)
    console.log(cards)
  }
 
  function Deck() {
    // These two are just helpers, they curate spring data, values that are later being interpolated into css
  const to = i => ({ x: 0, y: i * -4, scale: 1, rot: -10 + Math.random() * 20, delay: i * 100 })
  const from = i => ({ x: 0, rot: 0, scale: 1.5, y: -1000 })
  // This is being used down there in the view, it interpolates rotation and scale into a css transform
  const trans = (r, s) => `perspective(1100px) rotateX(2deg) rotateY(${r / 2}deg) rotateZ(${r}deg) scale(${s})`
   
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
     })
  
     // Now we're just mapping the animated values to our view, that's it. Btw, this component only renders once. :-)
    return (
      props.map(({ x, y, rot, scale }, i) => (
        <animated.div key={i} style={{ transform: interpolate([x, y], (x, y) => `translate3d(${x}px,${y}px,0)`) }}>
          {/* This is the card itself, we're binding our gesture to it (and inject its index so we know which is which) */}
          <animated.div {...bind(i)} style={{ transform: interpolate([rot, scale], trans), backgroundImage: `url(${cards[i]})` }}>
          <DoubleClickExample></DoubleClickExample>
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
            <button onClick={refetch}>Reload</button>
            <button>View Different Style</button>
            <button>View More</button>
          </div>
        </div>
      </div>
      <NextDeck></NextDeck>
      <Deck></Deck>
    </>
  )
}



// This resets gone count to 0, and brings cards back in
// if (!down && gone.size === cards.length) setTimeout(() => gone.clear() || set(i => to(i)), 600)
