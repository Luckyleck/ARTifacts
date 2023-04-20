import './ContactPage.css';
import pikachu from '../NavBar/assets/pikachu.png';
import js from './assets/js.png';
import linkedin from './assets/linkedin.png';
import react from './assets/react.png'
import starry from '../MainPage/assets/starry_night.webp'
import { useState } from 'react';

const ContactPage = () => {
    const [showProjects, setShowProjects] = useState(false);

    const openProjects = () => {
        setShowProjects(true);
    }

    const closeProjects = () => {
        setShowProjects(false);
    }

    return (
        <div className='contact-grid-container'>
            <div className='developer-grid-item'>
                <div className='developer-container'>
                    <div className='developer-top'>
                        <div className='developer-background'>
                            <img src={starry} alt='starry' />
                        </div>

                        <div className='pic developer-profile-pic'>
                            <img src={pikachu} alt='pikachu' />
                        </div>
                    </div>

                    <div className='developer-info'>
                        <p>name</p>
                        <p>title</p>
                    </div>

                    <div className='developer-bio'>
                        <p>dvfvfvfjdmvfdmvioermboimeboerbneribmeiobmreiobmiorenbmioermnbirembiebirenbiruenbiernbiruenbe</p>
                    </div>
                </div>
            </div>
            
            <div className='developer-grid-item'>
                <div className='developer-container'>
                    <div className='developer-top'>
                        <div className='developer-background'>
                            <img src={starry} alt='starry' />
                        </div>

                        <div className='pic developer-profile-pic'>
                            <img src={pikachu} alt='pikachu' />
                        </div>
                    </div>

                    <div className='developer-info'>
                        <p>name</p>
                        <p>title</p>
                    </div>

                    <div className='developer-bio'>
                        <p>dvfvfvfjdmvfdmvioermboimeboerbneribmeiobmreiobmiorenbmioermnbirembiebirenbiruenbiernbiruenbe</p>
                    </div>
                </div>
            </div>

            <div className='developer-grid-item'>
                <div className='developer-container'>
                    <div className='developer-top'>
                        <div className='developer-background'>
                            <img src={starry} alt='starry' />
                        </div>

                        <div className='pic developer-profile-pic'>
                            <img src={pikachu} alt='pikachu' />
                        </div>
                    </div>

                    <div className='developer-info'>
                        <p>name</p>
                        <p>title</p>
                    </div>

                    <div className='developer-bio'>
                        <p>dvfvfvfjdmvfdmvioermboimeboerbneribmeiobmreiobmiorenbmioermnbirembiebirenbiruenbiernbiruenbe</p>
                    </div>
                </div>
            </div>

            <div className='developer-grid-item'>
                <div className='developer-container'>
                    <div className='developer-top'>
                        <div className='developer-background'>
                            <img src={starry} alt='starry' />
                        </div>

                        <div className='pic developer-profile-pic'>
                            <img src={pikachu} alt='pikachu' />
                        </div>
                    </div>

                    <div className='developer-info'>
                        <p>name</p>
                        <p>title</p>
                    </div>

                    <div className='developer-bio'>
                        <p>dvfvfvfjdmvfdmvioermboimeboerbneribmeiobmreiobmiorenbmioermnbirembiebirenbiruenbiernbiruenbe</p>
                    </div>
                </div>
                <div className='developer-projects' onMouseEnter={openProjects} onMouseLeave={closeProjects}>
                    <i className="fa-solid fa-angles-down" id='developer-expand'></i>

                    { showProjects &&
                    <div className='projects-container' >
                        <i className="fa-brands fa-github"></i>
                        <img src={linkedin} alt='linkedin' />
                        <img src={js} alt='js' />
                        <img src={react} alt='react' />
                    </div>}
                </div>
            </div>
        </div>
    )
}

export default ContactPage;