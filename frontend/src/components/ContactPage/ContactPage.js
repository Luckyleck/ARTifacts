import './ContactPage.css';
import js from './assets/js.png';
import linkedin from './assets/linkedin.png';
import react from './assets/react.png';
import github from './assets/github.png'
import { useState } from 'react';
import { developers } from './DevInfo';

const ContactPage = () => {

    const [showProjects, setShowProjects] = useState(false);

    const openProjects = (index) => {
        setShowProjects(index);
    }

    const closeProjects = () => {
        setShowProjects(false);
    }

    return (
        <div className='contact-grid-container'>
            {developers.map((developer, index) => (
                <div className='developer-grid-item' key={index}>
                    <div className='developer-container'>
                        <div className='developer-top'>
                            <div className='developer-background'>
                                <img src={developer.backgroundpic} alt='starry' />
                            </div>

                            <div className='pic developer-profile-pic'>
                                <img src={developer.profile} alt='pikachu' />
                            </div>
                        </div>

                        <div className='developer-info'>
                            <p>{developer.name}</p>
                            <p>{developer.title}</p>
                        </div>

                        <div className='developer-bio'>
                            <p className='developer-bio-text'>{developer.bio}</p>
                        </div>
                    </div>
                    <div className='developer-projects' onMouseEnter={() => openProjects(index)} onMouseLeave={closeProjects}>
                        <i className="fa-solid fa-angles-down" id='developer-expand'></i>

                        {showProjects === index &&
                            <div className='projects-container' >
                                <a target='_blank' rel='noreferrer' href={developer.github}>
                                    <img src={github} alt='github' />
                                </a>

                                <a target='_blank' rel='noreferrer' href={developer.linkedin}>
                                    <img src={linkedin} alt='linkedin' />
                                </a>

                                <a target='_blank' rel='noreferrer' href={developer.javascript}>
                                    <img src={js} alt='js' />
                                </a>

                                <a target='_blank' rel='noreferrer' href={developer.fullstack}>
                                    <img src={react} alt='react' />
                                </a>
                            </div>}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ContactPage;