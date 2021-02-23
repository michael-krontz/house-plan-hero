import React, { useEffect, useState } from 'react'
import { useSprings, animated, interpolate } from 'react-spring'
import { useDrag } from 'react-use-gesture'
import axios from 'axios'

// These two are just helpers, they curate spring data, values that are later being interpolated into css
const to = i => ({ x: 0, y: i * -4, scale: 1, rot: -10 + Math.random() * 20, delay: i * 100 })
const from = i => ({ x: 0, rot: 0, scale: 1.5, y: -1000 })
// This is being used down there in the view, it interpolates rotation and scale into a css transform
const trans = (r, s) => `perspective(1500px) rotateX(30deg) rotateY(${r / 10}deg) rotateZ(${r}deg) scale(${s})`

export default function Deck() {

  const [posts, setPosts]=useState([])
  const getPosts = async () => {
    try {
  const userPosts = await axios.get("https://house-plan-hero-default-rtdb.firebaseio.com/houseplans.json")
    
  setPosts(userPosts.data);  // set State

  } catch (err) {
    console.error(err.message);
  }
};

var cards = []
var hpUrl1, hpUrl2, hpUrl3, hpUrl4, hpUrl5, hpUrl6, hpUrl7 

  posts.filter(houseplan => houseplan.id === 1).map(hp1 => (
    // eslint-disable-next-line
    hpUrl1 = "images/" + "hph_" + hp1.id + ".jpg"
  ));
  posts.filter(houseplan => houseplan.id === 2).map(hp2 => (
    // eslint-disable-next-line
    hpUrl2 = "images/" + "hph_" + hp2.id + ".jpg"
  ));
  posts.filter(houseplan => houseplan.id === 3).map(hp3 => (
    // eslint-disable-next-line
    hpUrl3 = "images/" + "hph_" + hp3.id + ".jpg"
  ));
  posts.filter(houseplan => houseplan.id === 4).map(hp4 => (
    // eslint-disable-next-line
    hpUrl4 = "images/" + "hph_" + hp4.id + ".jpg"
  ));
  posts.filter(houseplan => houseplan.id === 5).map(hp5 => (
    // eslint-disable-next-line
    hpUrl5 = "images/" + "hph_" + hp5.id + ".jpg"
  ));
  posts.filter(houseplan => houseplan.id === 6).map(hp6 => (
    // eslint-disable-next-line
    hpUrl6 = "images/" + "hph_" + hp6.id + ".jpg"
  ));
  posts.filter(houseplan => houseplan.id === 7).map(hp7 => (
    // eslint-disable-next-line
    hpUrl7 = "images/" + "hph_" + hp7.id + ".jpg"
  ));
 
cards = [hpUrl1, hpUrl2, hpUrl3, hpUrl4, hpUrl5, hpUrl6, hpUrl7]

  useEffect(()=>{
    getPosts()
  }, []) // includes empty dependency array
  // console.log(posts)

  const [gone] = useState(() => new Set()) // The set flags all the cards that are flicked out
  const [props, set] = useSprings(cards.length, i => ({ ...to(i), from: from(i) })) // Create a bunch of springs using the helpers above
  // Create a gesture, we're interested in down-state, delta (current-pos - click-pos), direction and velocity
  const bind = useDrag(({ args: [index], down, delta: [xDelta], distance, direction: [xDir], velocity }) => {
    const trigger = velocity > 0.2 // If you flick hard enough it should trigger the card to fly out
    const dir = xDir < 0 ? -1 : 1 // Direction should either point left or right
    if (!down && trigger) gone.add(index) // If button/finger's up and trigger velocity is reached, we flag the card ready to fly out
    set(i => {
      if (index !== i) return // We're only interested in changing spring-data for the current spring
      const isGone = gone.has(index)
      const x = isGone ? (200 + window.innerWidth) * dir : down ? xDelta : 0 // When a card is gone it flys out left or right, otherwise goes back to zero
      const rot = xDelta / 100 + (isGone ? dir * 10 * velocity : 0) // How much the card tilts, flicking it harder makes it rotate faster
      const scale = down ? 1.1 : 1 // Active cards lift up a bit
      return { x, rot, scale, delay: undefined, config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 } }
    })
    if (!down && gone.size === cards.length) setTimeout(() => gone.clear() || set(i => to(i)), 600)
  })
          
        // Now we're just mapping the animated values to our view, that's it. Btw, this component only renders once. :-)
      return props.map(({ x, y, rot, scale }, i) => (
        <animated.div key={i} style={{ transform: interpolate([x, y], (x, y) => `translate3d(${x}px,${y}px,0)`) }}>
          {/* This is the card itself, we're binding our gesture to it (and inject its index so we know which is which) */}
          <animated.div {...bind(i)} style={{ transform: interpolate([rot, scale], trans), backgroundImage: `url(${cards[i]})` }} />
        </animated.div>
      ))
}
