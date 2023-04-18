import { NavLink, useHistory, useLocation } from 'react-router-dom';
import './NavBar.css';
import { useState } from 'react';
import logo from './assets/ART.png'
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from '../context/Modal';
import SessionForm from '../SessionForms/SessionForm';
import { logout } from '../../store/session';
import profile from './assets/pikachu.png';

const NavBar = () => {

    const [showMenu, setShowMenu] = useState(false);
    const location = useLocation();
    const sessionUser = useSelector(state => state.session.user);
    const [sessionForm, setSessionForm] = useState(false);
    const history = useHistory();
    const dispatch = useDispatch();
    
    const handleMenuOpen = () => {
        setShowMenu(true);
    };

    const handleMenuClose = () => {
        setShowMenu(false);
    };

    const onClose = () => {
        setSessionForm(false);
        // setSignIn(false);
    }

    const logoutUser = () => {
        dispatch(logout());
        history.push('/')
    }

    return (
        <header id='navbar'>
            <div id='nav-container'>
                <div className='nav-buttons' id='logo-button'>
                    <NavLink exact to="/">
                        <img src={logo} alt='logo'/>
                    </NavLink>
                </div>
                <div className='nav-buttons' id='profile-drop' onMouseEnter={handleMenuOpen} onMouseLeave={handleMenuClose}>
                    { location.pathname === '/' &&  !sessionUser && (
                        <div className='about-us'>
                            <button className='about'>About Artifacts</button>
                            <button className='about'>Contact Us</button>
                        </div>
                    )}

                    { sessionUser && (
                    <div className='profile-drop-button' id='profile-pic-button'>
                        <div className='pic'><img src={profile} alt='profile' /></div>
                    </div>)}
                    { showMenu && sessionUser && (
                    <ul className='dropdown-items'>
                        <li>Your profile</li>
                        <li>Favorite</li>
                        <li onClick={logoutUser}>Sign out</li>
                    </ul>
                    )}

                    { !sessionUser && location.pathname !== '/' &&
                        <div className='profile-drop-button' id='session-buttons'>
                            <button className='about' onClick={() => setSessionForm('signup')}>
                                Sign up
                            </button>

                            <button className='about' onClick={() => setSessionForm('signin')}>
                                Sign in
                            </button>
                        </div>
                    }

                    { (sessionForm === 'signup' || sessionForm === 'signin') && (
                        <Modal onClose={onClose}>
                            <SessionForm onClose={onClose} formType={sessionForm}/>
                        </Modal>
                    )}

                    {/* { signIn && (
                        <Modal onClose={onClose}>
                            <LoginForm onClose={onClose} />
                        </Modal>
                    )} */}
                </div>
            </div>

            <div className='nav-buttons' id='test'>
                <div>Test</div>
            </div>

        </header>
    )
}

export default NavBar;