import './App.css';
import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import AuthContent from './AuthContent'
import { useSprings, animated, interpolate } from 'react-spring'
import { useDrag } from 'react-use-gesture'
import useAxios, { configure } from 'axios-hooks'
import Axios from 'axios'
import LRU from 'lru-cache'
import { RecoilRoot, atom, useRecoilValue, useSetRecoilState, useRecoilState, useResetRecoilState } from 'recoil';
import { BottomSheet } from 'react-spring-bottom-sheet'
import 'react-spring-bottom-sheet/dist/style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { faBed } from '@fortawesome/free-solid-svg-icons'
import { faBath } from '@fortawesome/free-solid-svg-icons'
import { faRulerCombined } from '@fortawesome/free-solid-svg-icons'

const eyeIcon = <FontAwesomeIcon icon={faEye} />
const eyeSlashIcon = <FontAwesomeIcon icon={faEyeSlash} />
const bedIcon = <FontAwesomeIcon icon={faBed} />
const bathIcon = <FontAwesomeIcon icon={faBath} />
const sqftIcon = <FontAwesomeIcon icon={faRulerCombined} />
var cardUrl
var hpCardId
var hpdCardArray = []
var hpidCardArray = []
var hptCardArray = []
var hpdeCardArray = []
var hpBedArray = []
var hpBathArray = []
var hpSqftArray = []
var hpDescArray = []
var hpLinkArray = []
var currentCard = 1
var currentHand = 1
var z = 0
var _ = require('lodash')

const axios = Axios.create({
  baseURL: 'https://house-plan-hero-default-rtdb.firebaseio.com/houseplans/0/',
})

const cache = new LRU({ max: 10 })
configure({ axios, cache })

function ViewModal() {
  const detailcardcount = useRecoilValue(detailCount)
  const cardId = useRecoilValue(currentCardId);
  const cardState = useRecoilValue(detailState);
  const [viewToggleActive, setViewToggleActive] = useRecoilState(isViewToggleActive);
  const descState = useRecoilValue(currentDesc);
  const linkState = useRecoilValue(currentLink);

  if (viewToggleActive === true && detailcardcount < 1){
    return (
      <div className = "modal-wrapper">
        <div className = "modal-inner-wrapper">
          <div className = "modal-image" style={{ backgroundImage: `url(${'images/' + cardId + '.jpg'})`}}></div>
          <div className = " info-box-wrapper">
            <div className = "info-box">
              <div className = "Description">
              <h5 className = "Description-h5">{descState}</h5>
              <div className = " cta-wrapper">
                <div className = "cta">
                  <button className = "Info-cta" onClick={()=> window.open(linkState, "_blank")}>View on Truoba</button>
                  <ViewModalButton></ViewModalButton>
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  else if (viewToggleActive === true && detailcardcount === 1){
    return (
      <div className = "modal-wrapper">
        <div className = "modal-inner-wrapper">
          <div className = "modal-image" style={{ backgroundImage: `url(${'images/' + cardId + '.jpg'})`}}></div>
          <div className = "modal-image" style={{ backgroundImage: `url(${cardState[0]})`}}></div>
          <div className = " info-box-wrapper">
            <div className = "info-box">
              <div className = "Description">
              <h5 className = "Description-h5">{descState}</h5>
              <div className = " cta-wrapper">
                <div className = "cta">
                  <button className = "Info-cta" onClick={()=> window.open(linkState, "_blank")}>View on Truoba</button>
                  <ViewModalButton></ViewModalButton>
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  else if (viewToggleActive === true && detailcardcount === 2){
    return (
      <div className = "modal-wrapper">
        <div className = "modal-inner-wrapper">
          <div className = "modal-image" style={{ backgroundImage: `url(${'images/' + cardId + '.jpg'})`}}></div>
          <div className = "modal-image" style={{ backgroundImage: `url(${cardState[0]})`}}></div>
          <div className = "modal-image" style={{ backgroundImage: `url(${cardState[1]})`}}></div>
          <div className = " info-box-wrapper">
            <div className = "info-box">
              <div className = "Description">
              <h5 className = "Description-h5">{descState}</h5>
              <div className = " cta-wrapper">
                <div className = "cta">
                  <button className = "Info-cta" onClick={()=> window.open(linkState, "_blank")}>View on Truoba</button>
                  <ViewModalButton></ViewModalButton>
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  else if (viewToggleActive === true && detailcardcount === 3){
    return (
      <div className = "modal-wrapper">
        <div className = "modal-inner-wrapper">        
          <div className = "modal-image" style={{ backgroundImage: `url(${'images/' + cardId + '.jpg'})`}}></div>
          <div className = "modal-image" style={{ backgroundImage: `url(${cardState[0]})`}}></div>
          <div className = "modal-image" style={{ backgroundImage: `url(${cardState[1]})`}}></div>
          <div className = "modal-image" style={{ backgroundImage: `url(${cardState[2]})`}}></div>
          <div className = " info-box-wrapper">
            <div className = "info-box">
              <div className = "Description">
              <h5 className = "Description-h5">{descState}</h5>
              <div className = " cta-wrapper">
                <div className = "cta">
                  <button className = "Info-cta" onClick={()=> window.open(linkState, "_blank")}>View on Truoba</button>
                  <ViewModalButton></ViewModalButton>
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  else if (viewToggleActive === true && detailcardcount === 4){
    return (
      <div className = "modal-wrapper">
      <div className = "modal-inner-wrapper">
        <div className = "modal-image" style={{ backgroundImage: `url(${'images/' + cardId + '.jpg'})`}}></div>
        <div className = "modal-image" style={{ backgroundImage: `url(${cardState[0]})`}}></div>
        <div className = "modal-image" style={{ backgroundImage: `url(${cardState[1]})`}}></div>
        <div className = "modal-image" style={{ backgroundImage: `url(${cardState[2]})`}}></div>
        <div className = "modal-image" style={{ backgroundImage: `url(${cardState[3]})`}}></div>
        <div className = " info-box-wrapper">
          <div className = "info-box">
            <div className = "Description">
            <h5 className = "Description-h5">{descState}</h5>
            <div className = " cta-wrapper">
              <div className = "cta">
                <button className = "Info-cta" onClick={()=> window.open(linkState, "_blank")}>View on Truoba</button>
                <ViewModalButton></ViewModalButton>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
      </div>
    )
  }

  else if (viewToggleActive === true && detailcardcount === 5){
    return (
      <div className = "modal-wrapper">
        <div className = "modal-inner-wrapper">
          <div className = "modal-image" style={{ backgroundImage: `url(${'images/' + cardId + '.jpg'})`}}></div>
          <div className = "modal-image" style={{ backgroundImage: `url(${cardState[0]})`}}></div>
          <div className = "modal-image" style={{ backgroundImage: `url(${cardState[1]})`}}></div>
          <div className = "modal-image" style={{ backgroundImage: `url(${cardState[2]})`}}></div>
          <div className = "modal-image" style={{ backgroundImage: `url(${cardState[3]})`}}></div>
          <div className = "modal-image" style={{ backgroundImage: `url(${cardState[4]})`}}></div>
          <div className = " info-box-wrapper">
            <div className = "info-box">
              <div className = "Description">
              <h5 className = "Description-h5">{descState}</h5>
              <div className = " cta-wrapper">
                <div className = "cta">
                  <button className = "Info-cta" onClick={()=> window.open(linkState, "_blank")}>View on Truoba</button>
                  <ViewModalButton></ViewModalButton>
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  else if (viewToggleActive === true && detailcardcount === 6){
    return (
      <div className = "modal-wrapper">
        <div className = "modal-inner-wrapper">
          <div className = "modal-image" style={{ backgroundImage: `url(${'images/' + cardId + '.jpg'})`}}></div>
          <div className = "modal-image" style={{ backgroundImage: `url(${cardState[0]})`}}></div>
          <div className = "modal-image" style={{ backgroundImage: `url(${cardState[1]})`}}></div>
          <div className = "modal-image" style={{ backgroundImage: `url(${cardState[2]})`}}></div>
          <div className = "modal-image" style={{ backgroundImage: `url(${cardState[3]})`}}></div>
          <div className = "modal-image" style={{ backgroundImage: `url(${cardState[4]})`}}></div>
          <div className = "modal-image" style={{ backgroundImage: `url(${cardState[5]})`}}></div>
          <div className = " info-box-wrapper">
            <div className = "info-box">
              <div className = "Description">
              <h5 className = "Description-h5">{descState}</h5>
              <div className = " cta-wrapper">
                <div className = "cta">
                  <button className = "Info-cta" onClick={()=> window.open(linkState, "_blank")}>View on Truoba</button>
                  <ViewModalButton></ViewModalButton>
                </div>
              </div>
            </div>
            </div>
          </div>
          </div>
      </div>
    )
  }

  else {
    return (
      <h1></h1>
    )
  }
}

function ViewModalButton() {
  const stackOver = useRecoilValue(isStackOver);
  const detailcardcount = useRecoilValue(detailCount)
  const cardId = useRecoilValue(currentCardId);
  const setCardId = useSetRecoilState(currentCardId)
  const setDetailCards = useSetRecoilState(detailState)
  // const setInfoCard = useSetRecoilState(infoState)
  const [viewToggleActive, setViewToggleActive] = useRecoilState(isViewToggleActive);
  const voop = () => {};

  function ToggleViewButton() {
    if (stackOver === false && viewToggleActive === false) {
      return <button className="view-button" onClick={ToggleViewAction}>{eyeIcon}</button>
    }

    else if (stackOver === false && viewToggleActive === true) {
      return <button className="view-button" onClick={ToggleViewAction} style={{ position: 'relative', paddingBottom: '0', right: '7%' }}>{eyeSlashIcon}</button>
    }

    else 
    return <p></p>
  }

  ToggleViewButton.defaultProps = {
    onClick: voop,
  };

  function ToggleViewAction() {
      var newArray = []
  
      if (detailcardcount < 1) {
        newArray = [];
      }
  
      else {
        newArray =_.take(['images/' + cardId + '-1.jpeg', 'images/' + cardId + '-2.jpeg', 'images/' + cardId + '-3.jpeg', 'images/' + cardId + '-4.jpeg', 'images/' + cardId + '-5.jpeg', 'images/' + cardId + '-6.jpeg'], detailcardcount);
        setDetailCards(newArray)
      }
  
      // setInfoCard(cardId)

      console.log("CURRENTCardID" + cardId)
  
    if (viewToggleActive === false) {
      setViewToggleActive(true)
  
      return (
          <ToggleViewButton></ToggleViewButton>
      )
    }
  
    else if (viewToggleActive === true) {
      setViewToggleActive(false)
  
      return (
        <ToggleViewButton></ToggleViewButton>
        )
    }
  }

  return <ToggleViewButton></ToggleViewButton>
}

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
        <Link to={'/deck'}  style={{ marginBottom: '0', textDecoration: 'none', color: 'white', fontSize: '16px' }}>{currentTitleState}</Link>
        <div className = "Stats">
            <div className = "Beds">
              <div className = "Bed-icon">{bedIcon}</div>
              <h4 className = "Stats-h4" style={{ marginBottom: '0', textDecoration: 'none', color: 'white', fontSize: '16px' }}>{currentBedState}</h4>
            </div>
            <div className = "Baths">
              <div className = "Bath-icon">{bathIcon}</div>
              <h4 className = "Stats-h4" style={{ marginBottom: '0', textDecoration: 'none', color: 'white', fontSize: '16px' }}>{currentBathState}</h4>
            </div>
            <div className = "Sqft">
              <div className = "Sqft-icon">{sqftIcon}</div>
              <h4 className = "Stats-h4" style={{ marginBottom: '0', textDecoration: 'none', color: 'white', fontSize: '16px' }}>{currentSqftState}</h4>
            </div>
          </div>
      </div>
    );
  }

  else {
    return (
      <h1></h1>
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

function StyleSelectionBottomSheet() {
  const BottomSheetState = useRecoilValue(isBottomSheetOpen)
  const openBottomSheet = useSetRecoilState(isBottomSheetOpen)
  const setHomeStyle = useSetRecoilState(styleState);
  const setStackOver = useSetRecoilState(isStackOver);
  const setCardId = useSetRecoilState(currentCardId)

  // const setCardId = useSetRecoilState(currentCardId);
  // const cardId = useRecoilValue(currentCardId)
  // const resetTitle = useSetRecoilState(currentTitle)
  // const resetBed = useSetRecoilState(currentBed)
  // const resetBath = useSetRecoilState(currentBath)
  // const resetSqft = useSetRecoilState(currentSqft)

  function closeBottomSheet() {
    openBottomSheet(false)
  }

  function changeStyle() {
    setHomeStyle('modernFarmhouse')
    currentHand = 1
    currentCard = 1
    // console.log("HPID Card Array: " + hpidCardArray)
    setStackOver(false)
    closeBottomSheet()
  }

  return (
    <BottomSheet open={BottomSheetState}>
      <button className = "close-button" onClick={closeBottomSheet}>Close</button>
        <div className = "tag-wrapper">
          <div className = "homestyle-tag"><h2 className = "tag">Featured</h2></div>
          <div className = "homestyle-tag"><h2 className = "tag">Modern</h2></div>
          <div className = "homestyle-tag"><h2 className = "tag">Coastal</h2></div>
          <div className = "homestyle-tag"><button className = "tag"  onClick = {changeStyle}>Modern Farmhouse</button></div>
          <div className = "homestyle-tag"><h2 className = "tag">Colonial</h2></div>
          <div className = "homestyle-tag"><h2 className = "tag">Contemporary</h2></div>
          <div className = "homestyle-tag"><h2 className = "tag">Craftsman</h2></div>
          <div className = "homestyle-tag"><h2 className = "tag">Cape Cod</h2></div>
          <div className = "homestyle-tag"><h2 className = "tag">Tudor</h2></div>
          <div className = "homestyle-tag"><h2 className = "tag">Cottage</h2></div>
          <div className = "homestyle-tag"><h2 className = "tag">Tiny Home</h2></div>
        </div>
    </BottomSheet>
  )
}

function StyleSelection() {
  const BottomSheetState = useRecoilValue(isBottomSheetOpen)
  const openBottomSheet = useSetRecoilState(isBottomSheetOpen)
  const stackOver = useRecoilValue(isStackOver);
  
  if (stackOver === true) {
    return <button className="change-style-button" onClick={ChangeStyle}>Change Home Style</button>
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


function DeckBuild() {
  var allCards = []
  // var cards = []
  var allCardIds = []
  var hpdCardArrayItem
  var hptCardArrayItem
  var hpdeCardArrayItem
  var hpBedArrayItem
  var hpBathArrayItem
  var hpSqftArrayItem
  var hpDescArrayItem
  var hpLinkArrayItem
  var hpidCardArrayItem

  const houseStyle = useRecoilValue(styleState);
  const stackOver = useSetRecoilState(isStackOver);
  const setCurrentTitle = useSetRecoilState(currentTitle);
  const setCurrentBed = useSetRecoilState(currentBed);
  const setCurrentBath = useSetRecoilState(currentBath);
  const setCurrentSqft = useSetRecoilState(currentSqft);
  const setCurrentDesc = useSetRecoilState(currentDesc);
  const setCurrentLink = useSetRecoilState(currentLink);
  const setCardId = useSetRecoilState(currentCardId)
  const setDetailCount = useSetRecoilState(detailCount)
  const setCurrentDesigner = useSetRecoilState(currentDesigner);
  const setDeckOver = useSetRecoilState(isDeckOver)
  const setCards = useSetRecoilState(currentCardArray)
  // const setInfoCard = useSetRecoilState(infoState)
  const [{ data: getData, loading: getLoading, error: getError }, refetch] = useAxios(houseStyle + '.json')


  if (getLoading) return <p>Loading...</p>
  if (getError) return <p>Error!</p>
  if (getData) {
    fetchData()
  }

function fetchData() {
  var cardData = getData  
  setCards(cardData)
    /* eslint-disable */
  var x
  for (x=0; x < 1; x++) {
  
    cardData.filter(cardData => cardData.id).map(hp => (
      hpCardId = hp.id,
      allCardIds.push(hpCardId),
      cardUrl = "images/" + hpCardId + ".jpg",
      allCards.push(cardUrl)
    ));

    cardData.filter(cardData => cardData.id).map(hpid => (
      hpidCardArrayItem = hpid.id,
      hpidCardArray.push(hpidCardArrayItem)
    ));
  
    cardData.filter(cardData => cardData.detailCards).map(hpd => (
      hpdCardArrayItem = hpd.detailCards,
      hpdCardArray.push(hpdCardArrayItem)
    ));
      
    hptCardArray = []
    cardData.filter(cardData => cardData.name).map(hpt => (
      hptCardArrayItem = hpt.name,
      hptCardArray.push(hptCardArrayItem)
    ));
    
    hpdeCardArray = []
    cardData.filter(cardData => cardData.designer).map(hpde => (
      hpdeCardArrayItem = hpde.designer,
      hpdeCardArray.push(hpdeCardArrayItem)
    ));
  
    hpBedArray = []
    cardData.filter(cardData => cardData.bed).map(hpBed => (
      hpBedArrayItem = hpBed.bed,
      hpBedArray.push(hpBedArrayItem)
    ));
  
    hpBathArray = []
    cardData.filter(cardData => cardData.bath).map(hpBath => (
      hpBathArrayItem = hpBath.bath,
      hpBathArray.push(hpBathArrayItem)
    ));
  
    hpSqftArray = []
    cardData.filter(cardData => cardData.sqft).map(hpSqft => (
      hpSqftArrayItem = hpSqft.sqft,
      hpSqftArray.push(hpSqftArrayItem)
    ));
  
    hpDescArray = []
    cardData.filter(cardData => cardData.desc).map(hpDesc => (
      hpDescArrayItem = hpDesc.desc,
      hpDescArray.push(hpDescArrayItem)
    ));
    
    hpLinkArray = []
    cardData.filter(cardData => cardData.linkurl).map(hpLink => (
      hpLinkArrayItem = hpLink.linkurl,
      hpLinkArray.push(hpLinkArrayItem)
    ));
  }
  
  setCurrentTitle(hptCardArray[currentCard - 1])
  setCurrentDesigner(hpdeCardArray[currentCard - 1])
  setCurrentBed(hpBedArray[currentCard - 1])
  setCurrentBath(hpBathArray[currentCard - 1])
  setCurrentSqft(hpSqftArray[currentCard - 1])
  setCurrentDesc(hpDescArray[currentCard - 1])
  setCurrentLink(hpLinkArray[currentCard - 1])
  setCardId(hpidCardArray[currentCard - 1])
  setDetailCount(hpdCardArray[currentCard - 1])
}

var newArray = _.chunk(allCards, [5])
var cardArray = newArray[z]
cardArray.reverse();
setCards(cardArray)
console.log("allCardz: " + allCards)


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

      // cards = newArray[z]
      setCards(newArray[z])
      currentHand = 1
      stackOver(false)
      console.log("new array z " + newArray[z])
      console.log("new array: " + newArray.length)
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
  const cards = useRecoilValue(currentCardArray);
  const cardId = useRecoilValue(currentCardId);
  const setCardId = useSetRecoilState(currentCardId);
  const setDetailCount = useSetRecoilState(detailCount);
  const setStackOver = useSetRecoilState(isStackOver);
  const setCurrentTitle = useSetRecoilState(currentTitle);
  const setCurrentBed = useSetRecoilState(currentBed);
  const setCurrentBath = useSetRecoilState(currentBath);
  const setCurrentSqft = useSetRecoilState(currentSqft);
  const setCurrentDesc = useSetRecoilState(currentDesc);
  const setCurrentLink = useSetRecoilState(currentLink);
  const to = i => ({ x: 0, y: 0, scale: 1, rot: -10 + Math.random() * 20, delay: i * 100 })  // These two are just helpers, they curate spring data, values that are later being interpolated into css
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
        // console.log("CURRENT HAND" + currentHand)
      }
      
      if (isGone === true) {
        currentCard ++
        setCardId(hpidCardArray[currentCard - 1])
        setDetailCount(hpdCardArray[currentCard - 1])
        setCurrentTitle(hptCardArray[currentCard - 1])
        setCurrentDesigner(hpdeCardArray[currentCard - 1])
        setCurrentBed(hpBedArray[currentCard - 1])
        setCurrentBath(hpBathArray[currentCard - 1])
        setCurrentSqft(hpSqftArray[currentCard - 1])
        setCurrentDesc(hpDescArray[currentCard - 1])
        setCurrentLink(hpLinkArray[currentCard - 1])

        // console.log("[cards] " + cards)
        // console.log("Card ID" + cardId)
        // console.log("current title " + hptCardArray[currentCard - 1])
        // console.log("current bed " + hpBedArray[currentCard - 1])
        // console.log("current bath " + hpBathArray[currentCard - 1])
        // console.log("current sqft " + hpSqftArray[currentCard - 1])
        // console.log("current link url " + hpLinkArray[currentCard - 1])
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
          <animated.div {...bind(i)} style={{ transform: interpolate([rot, scale], trans), backgroundImage: `url(${cards[i]})`}}>
          {/* <DoubleClickEvent></DoubleClickEvent> */}
          <ViewModalButton></ViewModalButton>
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


const currentCardArray = atom({
  key: 'currentCardArray', // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});

const isDeckOver = atom({
  key: 'isDeckOver', // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});

const styleState = atom({
  key: 'styleState', // unique ID (with respect to other atoms/selectors)
  default: 'coastal', // default value (aka initial value)
});

const detailState = atom({
  key: 'detailState', // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});

// const infoState = atom({
//   key: 'infoState', // unique ID (with respect to other atoms/selectors)
//   default: [], // default value (aka initial value)
// });

const currentCardId = atom({
  key: 'currentCardId', // unique ID (with respect to other atoms/selectors)
  default: 1, // default value (aka initial value)
});

const detailCount = atom({
  key: 'detailCount', // unique ID (with respect to other atoms/selectors)
  default: 4, // default value (aka initial value)
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

const isViewToggleActive = atom({
  key: 'isViewToggleActive', // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});

function App() {
  return (
    <Router>
    <>
        <RecoilRoot>
          <header className = "App-header">
            <ViewModal></ViewModal>
            <Logo></Logo>
            <NavBar></NavBar>
          </header>
          <StyleSelectionBottomSheet></StyleSelectionBottomSheet>
          <DeckBuild></DeckBuild>
          <StyleSelection></StyleSelection>
        </RecoilRoot>
        <Route path='/authcontent' component={AuthContent}/>
    </>
    </Router>
  );
};

export default App;
