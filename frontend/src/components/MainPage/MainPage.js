import './MainPage.css';
import logo from './assets/ART_white.png';
import cafe from './assets/Cafe_Terrace_at_Night.webp';
import girl from './assets/Girl_with_a_Pearl_Earring.jpeg';
import guernica from './assets/Guernica.jpeg';
import mona from './assets/Mona_Lisa.jpg';
import starry from './assets/starry_night.webp';
import adam from './assets/The_Creation_of_Adam.webp';
import supper from './assets/The_Last_Supper.webp';
import memory from './assets/The_Persistence_of_Memory.jpeg';
import scream from './assets/The_scream.jpeg';
import { useState } from 'react'

function MainPage() {
  const [start, setStart] = useState(false)

    return (
      <>
        <div class="image-container">
          <img src={cafe} alt="cafe" class="animated-image" />
          <img src={girl} alt="girl" class="animated-image" />
          <img src={guernica} alt="guernica" class="animated-image" />
          <img src={mona} alt="mona" class="animated-image" />
          <img src={starry} alt="starry" class="animated-image" />
          <img src={adam} alt="adam" class="animated-image" />
          <img src={supper} alt="supper" class="animated-image" />
          <img src={memory} alt="memory" class="animated-image" />
          <img src={scream} alt="scream" class="animated-image" />
        </div>

        <div className='explore'>
          <img src={logo} alt='logo' />
        </div>
      </>
    );
}
  
export default MainPage;