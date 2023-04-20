import './ContactPage.css';
import pikachu from '../NavBar/assets/pikachu.png';
import js from './assets/js.png';
import linkedin from './assets/linkedin.png';
import react from './assets/react.png';
import github from './assets/github.png'
import starry from '../MainPage/assets/starry_night.webp';
import mg from '../MainPage/assets/mg.jpeg';
import kc from './assets/kc.jpeg';
import al from './assets/al.jpeg';
import sn from './assets/sn.jpeg';
import { useState } from 'react';

const ContactPage = () => {
    const [showProjects, setShowProjects] = useState(false);

    const openProjects = (index) => {
        setShowProjects(index);
    }

    const closeProjects = () => {
        setShowProjects(false);
    }

    const developers = [
        {
            name: 'Alex Lecky',
            title: 'Team Lead - Flex Developer',
            backgroundpic: starry,
            profile: al,
            bio: 'testing'
        },
        {
            name: 'Kevin Chan',
            title: 'Frontend Lead',
            backgroundpic: starry,
            profile: kc,
            bio: 'testing'
        },
        {
            name: 'Michael Gastello',
            title: 'Flex Developer',
            backgroundpic: starry,
            profile: mg,
            bio: 'testing'
        },
        {
            name: 'Steven Notovitz',
            title: 'Backend Lead',
            backgroundpic: starry,
            profile: sn,
            bio: 'testing'
        }
    ]

    return (
        <div className='contact-grid-container'>
            { developers.map ((developer, index) => (
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
                        <p>{developer.bio}</p>
                    </div>
                </div>
                <div className='developer-projects' onMouseEnter={() => openProjects(index)} onMouseLeave={closeProjects}>
                    <i className="fa-solid fa-angles-down" id='developer-expand'></i>

                    { showProjects === index &&
                    <div className='projects-container' >
                        <a target='_blank' rel='noreferrer' href='https://www.linkedin.com/in/kevin-chan-426203158/' className='navButtons' id='network'>
                            <img src={github} alt='github' />
                        </a>

                        <a target='_blank' rel='noreferrer' href='https://www.linkedin.com/in/kevin-chan-426203158/' className='navButtons' id='network'>
                            <img src={linkedin} alt='linkedin' />
                        </a>

                        <a target='_blank' rel='noreferrer' href='https://www.linkedin.com/in/kevin-chan-426203158/' className='navButtons' id='network'>
                            <img src={js} alt='js' />
                        </a>

                        <a target='_blank' rel='noreferrer' href='https://www.linkedin.com/in/kevin-chan-426203158/' className='navButtons' id='network'>
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