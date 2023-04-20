import './ContactPage.css';
import pikachu from '../NavBar/assets/pikachu.png';
import js from './assets/js.png';
import linkedin from './assets/linkedin.png';
import react from './assets/react.png'

const ContactPage = () => {
    return (
        <div className='contact-grid-container'>
        
            <div className='grid-item'>
                <div className="developer-container">
                    <div className='developer-top'>
                        <div className='pic developer-profile-pic'>
                            <img src={pikachu} alt='pikachu' />
                        </div>

                        <div className='developer-info'>
                            <div className='developer-title'>
                                <p className='developer-title'>test</p>
                            </div>

                            <div className='developer-name'>
                                <p>testing</p>
                            </div>
                        </div>

                        <div className='developer-link'>
                            <div className='link-grid-item'>
                                <i className="fa-brands fa-github"></i>
                            </div>
                            <div className='link-grid-item'>
                                <img src={linkedin} alt='linkedin' />
                            </div>

                            <div className='link-grid-item'>
                                <img src={js} alt='linkedin' />
                            </div>

                            <div className='link-grid-item'>
                                <img src={react} alt='linkedin' />
                            </div>
                        </div>
                    </div>
                    <div className='developer-bio'>
                        <p>asadsadsafasfaf</p>
                    </div>
                </div>
            </div>
            
            <div className='grid-item'>
                <div className="developer-container">
                    test
                </div>
            </div>

            <div className='grid-item'>
                <div className="developer-container">
                    <div className='developer-top'>
                        <div className='pic developer-profile-pic'>
                            <img src={pikachu} alt='pikachu' />
                        </div>

                        <div className='developer-info'>
                            <div className='developer-title'>
                                <p className='developer-title'>test</p>
                            </div>

                            <div className='developer-name'>
                                <p>testing</p>
                            </div>
                        </div>

                    </div>

                    <div className='developer-bio'>
                        <p>asadsadsafasfaf</p>
                    </div>
                </div>
            </div>

            <div className='grid-item'>
                <div className="developer-container">
                    test
                </div>
            </div>
        </div>
    )
}

export default ContactPage;