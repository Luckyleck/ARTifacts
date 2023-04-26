import './MainPage.css';
import logo from './assets/ART_white.png';
import cafe from './assets/Cafe_Terrace_at_Night.png';
import girl from './assets/Girl_with_a_Pearl_Earring.png';
import guernica from './assets/Guernica.png';
import mona from './assets/mona.png';
import starry from './assets/starry_night.png';
import adam from './assets/The_Creation_of_Adam.png';
import supper from './assets/The_Last_Supper.png';
import memory from './assets/The_Persistence_of_Memory.png';
import scream from './assets/The_scream.png';
import mg from './assets/mg.png';
import self from './assets/Self-Portrait.png';
import monkey from './assets/Tropical_Forest_with_Monkeys.png';
import flower from './assets/Flowers_in_a_Rococo_Vase.png';
import poodle from './assets/White_Poodle_in_a_Punt.png';
import wave from './assets/Under_the_Wave_off_Kanagawa.png';
import gothic from './assets/American_Gothic.png';
import sunflowers from './assets/Sunflowers.png';
import bedroom from './assets/bedroom.png';
import nighthawks from './assets/Nighthawks.png';
import al from './assets/al.PNG';
import sn from './assets/sn.PNG';
import kc from './assets/kc.PNG';
import { useHistory } from 'react-router-dom';

const MainPage = () => {
  const history = useHistory();

  return (
    <>
      <div className="image-container">
        <img src={cafe} alt="cafe" className="animated-image" />
        <img src={girl} alt="girl" className="animated-image" />
        <img src={guernica} alt="guernica" className="animated-image" />
        <img src={mona} alt="mona" className="animated-image" />
        <img src={starry} alt="starry" className="animated-image" />
        <img src={adam} alt="adam" className="animated-image" />
        <img src={supper} alt="supper" className="animated-image" />
        <img src={memory} alt="memory" className="animated-image" />
        <img src={scream} alt="scream" className="animated-image" />
        <img src={self} alt="self" className="animated-image" />
        <img src={monkey} alt="monkey" className="animated-image" />
        <img src={flower} alt="flower" className="animated-image" />
        <img src={sunflowers} alt="sunflowers" className="animated-image" />
        <img src={poodle} alt="poodle" className="animated-image" />
        <img src={gothic} alt="gothic" className="animated-image" />
        <img src={wave} alt="wave" className="animated-image" />
        <img src={bedroom} alt="bedroom" className="animated-image" />
        <img src={nighthawks} alt="nighthawks" className="animated-image" />
        <img src={mg} alt="mg" className="animated-image" />
        <img src={al} alt="al" className="animated-image" />
        <img src={sn} alt="sn" className="animated-image" />
        <img src={kc} alt="kc" className="animated-image" />
      </div>
      <div onClick={() => history.push('/explore')} className="explore">
        <img src={logo} alt="logo" />
        <p>CLICK HERE TO ENTER</p>
      </div>
    </>
  );
};
  
export default MainPage;