import './ContactPage.css';
import js from './assets/js.png';
import linkedin from './assets/linkedin.png';
import react from './assets/react.png';
import github from './assets/github.png'
import starry from '../MainPage/assets/starry_night.webp';
import mg from '../MainPage/assets/mg.jpeg';
import kc from './assets/kc.jpeg';
import al from './assets/al.jpeg';
import sn from './assets/sn.jpeg';
import nighthawks from './assets/Nighthawks.jpeg'
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
            backgroundpic: 'https://picsum.photos/seed/4/400/400',
            profile: al,
            bio: 'My name is Alex Lecky and I am the Team Lead.',
            github: 'https://github.com/Luckyleck',
            linkedin: '',
            javascript: 'https://luckyleck.github.io/JS-Project/',
            fullstack: '',
        },
        {
            name: 'Kevin Chan',
            title: 'Frontend Lead',
            backgroundpic: starry,
            profile: kc,
            bio: 'My name is Kevin Chan and I headed the front-end development of the UI/UX of ARTifacts via React, and heavily contributed styling the front-end via HTML/CSS. I hope you enjoy you experience in ARTifacts and feel free to reach out with any question!. The mastermind behind our frontend. Has a knack for design, knowing how to keep a UI/UX simple and user-friendly. Skilled in CSS and HTML, translating a project\'s requirements come easy to him. Kevin takes pleasure in coming up with engaging ways to capture a user\'s eye and ensures that his code well crafted and DRY. He is a great assest to a team and works extremely well with others. His ability to communicate with allows him to be a chameleon and help the team achieve the common goal seamlessly. He is a great asset to this project and an invaluable one.',
            github: 'https://github.com/kchannn13',
            linkedin: 'https://www.linkedin.com/in/kevin-chan-426203158/',
            javascript: 'https://kchannn13.github.io/The-Adventures-of-Gary-the-Snail/',
            fullstack: 'https://linkedup-ptj7.onrender.com/',
        },
        {
            name: 'Michael Gastello',
            title: 'Flex Developer',
            backgroundpic: nighthawks,
            profile: mg,
            bio: 'A young and motivated coder, known for his ability to work on any project in any capacity. He is quick to adapt new technologies and is solution oriented. Skilled in Ruby and Javascript, Michael is thrilled to break into the tech world and begin working on impactful projects. He also enjoys automobiles and fashion, which translates to him have a great eye for design and the power to architect such designs. Michael is an excellent team player and looks forward to expanding his horizon',
            github: 'https://github.com/mgastello',
            linkedin: 'https://www.linkedin.com/in/michael-gastello-168822260/',
            javascript: 'https://mgastello.github.io/xChngd/',
            fullstack: 'https://arrow-8xvn.onrender.com/',
        },
        {
            name: 'Steven Notovitz',
            title: 'Backend Lead',
            backgroundpic: 'https://picsum.photos/seed/4/400/400',
            profile: sn,
            bio: 'An extremely well rounded, and dynamic developer who never backs down from a challenge. Steven has proven himself time and time again that he is extraordinarily agile, and able to learn new frameworks and concepts to proficiency quickly. He Enjoys taking the initiative and crafting unique solutions. An enthusiast of all languages, not just coding. In his spare time you\'ll find him researching old Hebrew or practicing Italian. A pleasure to have on a team and core component to ours',
            github: 'https://github.com/StevenNotovitz',
            linkedin: '',
            javascript: 'https://stevennotovitz.github.io/aA-JS-project-Labyrinth/',
            fullstack: '',
        }
    ]

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
                            <p>{developer.bio}</p>
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