import './App.css';
import galleryItem1 from './hp-hero-1.jpg';
import galleryItem2 from './hp-hero-2.jpg';
import galleryItem3 from './hp-hero-3.jpg';
import galleryItem4 from './hp-hero-4.jpg';
import galleryItem5 from './hp-hero-5.jpg';


function Logo() {
  return (
    <div className = "Logo-wrapper">
      <h2>House Plan Hero</h2>      
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

      <div className = "App-body">
      <ImageGallery></ImageGallery>
      </div>
    </div>
  );
};

export default App;
