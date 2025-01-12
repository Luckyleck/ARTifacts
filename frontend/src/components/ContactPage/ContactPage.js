import './ContactPage.css';
import js from './assets/js.png';
import linkedin from './assets/linkedin.png';
import react from './assets/react.png';
import github from './assets/github.png';
import { useState } from 'react';
import starry from '../MainPage/assets/starry_night.webp';
import mg from '../MainPage/assets/mg.jpeg';
import kc from './assets/kc.jpeg';
import al from './assets/al.jpeg';
import sn from './assets/sn.jpeg';
import nighthawks from './assets/Nighthawks.jpeg'

const ContactPage = () => {
    const [showProjects, setShowProjects] = useState(false);

    const openProjects = (index) => {
        setShowProjects(index);
    };

    const closeProjects = () => {
        setShowProjects(false);
    };

    const developers = [{
        name: 'Alex Lecky',
        title: 'Team Lead - Flex Developer',
        backgroundpic: 'https://picsum.photos/seed/4/400/400',
        profile: al,
        bio: "Hi, my name is Alex Lecky and I am the team lead for this project. I'm a charismatic and intelligent person who believes in the power of creativity and persistence to drive innovation. My passion for technology stems from my desire to make the world a better place, and I'm always full of ideas on how to achieve this goal. I enjoy exploring new technologies and coming up with creative solutions to new problems. Above all, I'm persistent, never giving up until I've found the right solution. I'm excited to continue making the world a better place, one project at a time.",
        github: 'https://github.com/Luckyleck',
        linkedin: 'https://www.linkedin.com/in/alexthelecky1875273/',
        javascript: 'https://luckyleck.github.io/BlockOut/',
        fullstack: 'https://artifacts-rp87.onrender.com/',
    },
    {
        name: 'Kevin Chan',
        title: 'Frontend Lead',
        backgroundpic: starry,
        profile: kc,
        bio: 'My name is Kevin Chan and I headed the front-end development of the UI/UX of ARTifacts via React, and heavily contributed styling the front-end via HTML/CSS. I hope you enjoy you experience in ARTifacts and feel free to reach out with any questions!. ',
        github: 'https://github.com/chan-kevin',
        linkedin: 'https://www.linkedin.com/in/kevin-chan-426203158/',
        javascript: 'https://chan-kevin.github.io/The-Adventures-of-Gary-the-Snail/',
        fullstack: 'https://linkedup-ptj7.onrender.com/',
    },
    {
        name: 'Michael Gastello',
        title: 'Flex Developer',
        backgroundpic: nighthawks,
        profile: mg,
        bio: 'A young and motivated coder, known for his ability to work on any project in any capacity. He is quick to adapt new technologies and is solution oriented. Skilled in Ruby and Javascript, Michael is thrilled to break into the tech world and begin working on impactful projects. He also enjoys automobiles and fashion, which translates to him having a great eye for design and the power to architect such designs. Michael is an excellent team player and looks forward to expanding his horizon.',
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
        bio: 'An extremely well rounded, and dynamic developer who never backs down from a challenge. Steven has proven himself time and time again that he is extraordinarily agile, and able to learn new frameworks and concepts to proficiency quickly. He Enjoys taking the initiative and crafting unique solutions. An enthusiast of all languages, not just coding. In his spare time you\'ll find him researching old Hebrew or practicing Italian. A pleasure to have on a team and core component to ours.',
        github: 'https://github.com/StevenNotovitz',
        linkedin: '',
        javascript: 'https://stevennotovitz.github.io/aA-JS-project-Labyrinth/',
        fullstack: '',
    }]

    return (
        <div className='contact-grid-container'>
            {developers.map((developer, index) => (
                <div key={index} className='developer-grid-item'>
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
                    <div onMouseEnter={() => openProjects(index)} onMouseLeave={closeProjects} className='developer-projects'>
                        <i id='developer-expand' className='fa-solid fa-angles-down'></i>
                        {showProjects === index && (
                            <div className='projects-container'>
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
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ContactPage;