import './App.css';
import React, { useState, useRef } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import AuthContent from './AuthContent'
import { useSprings, animated, interpolate } from 'react-spring'
import { useDrag } from 'react-use-gesture'
import useAxios from 'axios-hooks'
import useDoubleClick from 'use-double-click'
import { RecoilRoot, atom, useRecoilValue, useSetRecoilState, useResetRecoilState, useRecoilState } from 'recoil';
import { BottomSheet } from 'react-spring-bottom-sheet'
import 'react-spring-bottom-sheet/dist/style.css'

function Logo() {
  const currentTitleState = useRecoilValue(currentTitle);
  const cardId = useRecoilValue(currentCardId);
  const currentBedState = useRecoilValue(currentBed);
  const currentBathState = useRecoilValue(currentBath);
  const currentSqftState = useRecoilValue(currentSqft);
  const stackOver = useRecoilValue(isStackOver);

  if (stackOver === false) {
    return (
      <div className = "Logo-wrapper">
        <Link to={'/deck'}  style={{ marginBottom: '0', textDecoration: 'none', color: 'white', fontSize: '16px' }}>{currentTitleState[cardId - 1]}</Link>
        <div className = "Stats">
            <div className = "Beds">
              <div className = "Bed-icon"></div>
              <h4 className = "Stats-h4" style={{ marginBottom: '0', textDecoration: 'none', color: 'white', fontSize: '16px' }}>{currentBedState[cardId - 1]}</h4>
            </div>
            <div className = "Baths">
              <div className = "Bath-icon"></div>
              <h4 className = "Stats-h4" style={{ marginBottom: '0', textDecoration: 'none', color: 'white', fontSize: '16px' }}>{currentBathState[cardId - 1]}</h4>
            </div>
            <div className = "Sqft">
              <div className = "Sqft-icon"></div>
              <h4 className = "Stats-h4" style={{ marginBottom: '0', textDecoration: 'none', color: 'white', fontSize: '16px' }}>{currentSqftState[cardId - 1]}</h4>
            </div>
          </div>
      </div>
    );
  }

  else {
    return (
      <div className = "Title-display-wrapper">
      <h1></h1>
    </div>
    )
  }


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

function BottomSheetContent() {
  return (
    <>
      <div>
        <div className = "tag-wrapper">
          <div className = "homestyle-tag"><h2 className = "tag">Modern</h2></div>
          <div className = "homestyle-tag"><h2 className = "tag">Contemporary</h2></div>
          <div className = "homestyle-tag"><h2 className = "tag">Farmhouse</h2></div>
          <div className = "homestyle-tag"><h2 className = "tag">Colonial</h2></div>
          <div className = "homestyle-tag"><h2 className = "tag">Contemporary</h2></div>
          <div className = "homestyle-tag"><h2 className = "tag">Craftsman</h2></div>
          <div className = "homestyle-tag"><h2 className = "tag">Cape Cod</h2></div>
          <div className = "homestyle-tag"><h2 className = "tag">Tudor</h2></div>
          <div className = "homestyle-tag"><h2 className = "tag">Cottage</h2></div>
          <div className = "homestyle-tag"><h2 className = "tag">Tiny Home</h2></div>
        </div>
      </div>
    </>
  )
}

function StyleSelectionBottomSheet() {
  const BottomSheetState = useRecoilValue(isBottomSheetOpen)
  const openBottomSheet = useSetRecoilState(isBottomSheetOpen)

  function closeBottomSheet() {
    openBottomSheet(false)
  }

  return <BottomSheet open={BottomSheetState}><button className = "close-button" onClick={closeBottomSheet}>Close</button><BottomSheetContent></BottomSheetContent></BottomSheet>
}

function StyleSelection() {
  const BottomSheetState = useRecoilValue(isBottomSheetOpen)
  const openBottomSheet = useSetRecoilState(isBottomSheetOpen)
  const stackOver = useRecoilValue(isStackOver);
  if (stackOver === true) {
    return <button className="change-style-button" onClick={ChangeStyle}>View Different Style</button>
  }

  else {
    return <p></p>
  }

  function ChangeStyle() {
    openBottomSheet(true)
  }
  
  function ChangeStyleBack() {
    openBottomSheet(false)
  }
}

var cardUrl
var charext
var hpCardId
var hpdCardArray = []
var hptCardArray = []
var hpdeCardArray = []
var hpBedArray = []
var hpBathArray = []
var hpSqftArray = []
var hpDescArray = []
var hpLinkArray = []
var lowercase
var currentCard = 1
var currentHand = 1
var z = 0
var _ = require('lodash')

function DetailDeckBuild() {
  const cardState = useRecoilValue(detailState);
  // console.log("Detail Card State: " + cardState)
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


  function InfoDeckBuild() {
    const cardState = useRecoilValue(infoState);
    const descState = useRecoilValue(currentDesc);
    const linkState = useRecoilValue(currentLink);
    const cardId = useRecoilValue(currentCardId);

    // console.log("Info Card State: " + cardState)
    const to = i => ({ x: 0, y: i * -4, scale: 1, rot: -10 + Math.random() * 20, delay: i * 100 })  // These two are just helpers, they curate spring data, values that are later being interpolated into css
    const from = i => ({ x: 0, rot: 0, scale: 1.5, y: -1000 })
    const trans = (r, s) => `perspective(1100px) rotateX(2deg) rotateY(${r / 2}deg) rotateZ(${r}deg) scale(${s})`   // This is being used down there in the view, it interpolates rotation and scale into a css transform
    
      function InfoDeck() {
        const resetInfo = useResetRecoilState(infoState)
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
              setTimeout(resetter, 250)

              function resetter() {
                resetInfo(infoState)
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
              <InfoContent></InfoContent>
             </animated.div>
           </animated.div>
         ))
       )
      } 

      function InfoContent() {
        const cardId = useRecoilValue(currentCardId);

        return (
          <>
            <div className = "Floor-plan" style={{ backgroundImage: `url(${'images/fp_' + cardId + '.png'})` }}></div>
            <div className = "Description">
              <h5 className = "Description-h5">{descState[cardId - 1]}</h5>
            </div>
            <button className = "Info-cta" onClick={()=> window.open(linkState[cardId - 1], "_blank")}>View on Truoba</button>
         </>
        )
      }

      return (
      <>
        <InfoDeck></InfoDeck>
      </>
      )
    }

function DeckBuild() {
  var allCards = []
  var cards = []
  var allCardIds = []
  var hpdCardArrayItem
  var hptCardArrayItem
  var hpdeCardArrayItem
  var hpBedArrayItem
  var hpBathArrayItem
  var hpSqftArrayItem
  var hpDescArrayItem
  var hpLinkArrayItem

  const stackOver = useSetRecoilState(isStackOver);
  const setCurrentTitle = useSetRecoilState(currentTitle);
  const setCurrentBed = useSetRecoilState(currentBed);
  const setCurrentBath = useSetRecoilState(currentBath);
  const setCurrentSqft = useSetRecoilState(currentSqft);
  const setCurrentDesc = useSetRecoilState(currentDesc);
  const setCurrentLink = useSetRecoilState(currentLink);
  const setCurrentDesigner = useSetRecoilState(currentDesigner);
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
      charext = hp.designer.substring(0, 0),
      lowercase = charext.toLowerCase(),
      hpCardId = lowercase + x,
      allCardIds.push(hpCardId),
      cardUrl = "images/" + hpCardId + ".jpg",
      allCards.push(cardUrl)
    ));
      
    cardData.filter(houseplan => houseplan.detailCards).map(hpd => (
      hpdCardArrayItem = hpd.detailCards,
      hpdCardArray.push(hpdCardArrayItem)
    ));
      
    hptCardArray = []
    cardData.filter(houseplan => houseplan.name).map(hpt => (
      hptCardArrayItem = hpt.name,
      hptCardArray.push(hptCardArrayItem)
    ));
    
    hpdeCardArray = []
    cardData.filter(houseplan => houseplan.designer).map(hpde => (
      hpdeCardArrayItem = hpde.designer,
      hpdeCardArray.push(hpdeCardArrayItem)
    ));

    hpBedArray = []
    cardData.filter(houseplan => houseplan.bed).map(hpBed => (
      hpBedArrayItem = hpBed.bed,
      hpBedArray.push(hpBedArrayItem)
    ));

    hpBathArray = []
    cardData.filter(houseplan => houseplan.bath).map(hpBath => (
      hpBathArrayItem = hpBath.bath,
      hpBathArray.push(hpBathArrayItem)
    ));

    hpSqftArray = []
    cardData.filter(houseplan => houseplan.sqft).map(hpSqft => (
      hpSqftArrayItem = hpSqft.sqft,
      hpSqftArray.push(hpSqftArrayItem)
    ));

    hpDescArray = []
    cardData.filter(houseplan => houseplan.desc).map(hpDesc => (
      hpDescArrayItem = hpDesc.desc,
      hpDescArray.push(hpDescArrayItem)
    ));
    
    hpLinkArray = []
    cardData.filter(houseplan => houseplan.linkurl).map(hpLink => (
      hpLinkArrayItem = hpLink.linkurl,
      hpLinkArray.push(hpLinkArrayItem)
    ));
  }


console.log(hptCardArray)
console.log(hpLinkArray)
setCurrentTitle(hptCardArray)
setCurrentDesigner(hpdeCardArray)
setCurrentBed(hpBedArray)
setCurrentBath(hpBathArray)
setCurrentSqft(hpSqftArray)
setCurrentDesc(hpDescArray)
setCurrentLink(hpLinkArray)

  var newArray = _.chunk(allCards, [5])
  var cards = newArray[z]
  cards.reverse();

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
      currentHand = 1
      stackOver(false)
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
      <NextDeck></NextDeck>      
      </div>;
  }
  
  function HiddenInfoBox(props) {
    return <h1></h1>;
  }
  
  function InfoBox(props) {
    const stackOver = useRecoilValue(isStackOver);

    if (stackOver === false) {
      
      return <HiddenInfoBox />;
    }
    return <VisibleInfoBox />;
  }

  function Deck() {
  const cardId = useRecoilValue(currentCardId);
  const setCardId = useSetRecoilState(currentCardId);
  const setDetailCount = useSetRecoilState(detailCount);
  const setStackOver = useSetRecoilState(isStackOver);
  const to = i => ({ x: 0, y: i * -4, scale: 1, rot: -10 + Math.random() * 20, delay: i * 100 })  // These two are just helpers, they curate spring data, values that are later being interpolated into css
  const from = i => ({ x: 0, rot: 0, scale: 1.5, y: -1000 })
  const trans = (r, s) => `perspective(1100px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(${s})`   // This is being used down there in the view, it interpolates rotation and scale into a css transform
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
        currentHand ++
        console.log("CURRENT HAND" + currentHand)
      }
      
      if (isGone === true) {
        currentCard ++
        setCardId(currentCard)
        setDetailCount(hpdCardArray[currentCard - 1])
        console.log("HDP CARD ARRAY" + hpdCardArray[currentCard - 1])
      }

      if (currentHand == 6) {
        setStackOver(true)
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
          <DoubleClickEvent></DoubleClickEvent>
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
          </div>
        </div>
      </div>
      <InfoBox isDeckOver={true} />
      <Deck></Deck>
    </>
  )
}

const DoubleClickEvent = () => {
  const detailcardcount = useRecoilValue(detailCount)
  const cardId = useRecoilValue(currentCardId);
  const setDetailCards = useSetRecoilState(detailState)
  const setInfoCard = useSetRecoilState(infoState)
  const buttonRef = useRef();

 
  useDoubleClick({
    onDoubleClick: e => DoubleClick(),
    ref: buttonRef,
    latency: 350,
  });
  
  function DoubleClick() {
    var newArray = []

    if (detailcardcount < 1) {
      newArray = [];
    }

    else {
      newArray =_.take(['images/' + cardId + '-1.jpeg', 'images/' + cardId + '-2.jpeg', 'images/' + cardId + '-3.jpeg', 'images/' + cardId + '-4.jpeg', 'images/' + cardId + '-5.jpeg', 'images/' + cardId + '-6.jpeg'], detailcardcount);
    }

    setDetailCards(newArray)
    setInfoCard([currentCardId])

    console.log(newArray)
    console.log("Card ID: " + cardId);
    console.log("Detail Count: " + detailcardcount);
  }
  
  return <div className="tap-area" ref={buttonRef}></div>
}

const detailState = atom({
  key: 'detailState', // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});

const infoState = atom({
  key: 'infoState', // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});

const currentCardId = atom({
  key: 'currentCardId', // unique ID (with respect to other atoms/selectors)
  default: 1, // default value (aka initial value)
});

const detailCount = atom({
  key: 'detailCount', // unique ID (with respect to other atoms/selectors)
  default: [4], // default value (aka initial value)
});

const currentTitle = atom({
  key: 'currentTitle', // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});

const currentDesigner = atom({
  key: 'currentDesigner', // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});

const currentBed = atom({
  key: 'currentBed', // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});

const currentBath = atom({
  key: 'currentBath', // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});

const currentSqft = atom({
  key: 'currentSqft', // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});

const currentDesc = atom({
  key: 'currentDesc', // unique ID (with respect to other atoms/selectors)
  default: '', // default value (aka initial value)
});

const currentLink = atom({
  key: 'currentLink', // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});

const isStackOver = atom({
  key: 'isStackOver', // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});

const isBottomSheetOpen = atom({
  key: 'isBottomSheetOpen', // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});


function App() {
  return (
    <Router>
    <>


        <RecoilRoot>
          <header className = "App-header">
            <Logo></Logo>
            <NavBar></NavBar>
          </header>
          <StyleSelectionBottomSheet></StyleSelectionBottomSheet>
          {/* <TitleDisplay isStackOver={false} /> */}
          <DeckBuild></DeckBuild>
          <InfoDeckBuild></InfoDeckBuild>        
          <StyleSelection></StyleSelection>
          <DetailDeckBuild></DetailDeckBuild>
        </RecoilRoot>
        <Route path='/authcontent' component={AuthContent}/>
    </>
    </Router>
  );
};

export default App;
