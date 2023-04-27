import { NavLink, useHistory, useLocation, useParams } from 'react-router-dom';
import './NavBar.css';
import { useState } from 'react';
import logo from './assets/ART.png';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from '../context/Modal';
import SessionForm from '../SessionForms/SessionForm';
import { logout } from '../../store/session';
import { getUser } from '../../store/users';

const NavBar = () => {
    const [showMenu, setShowMenu] = useState(false);
    const location = useLocation();
    const sessionUser = useSelector(state => state.session.user);
    const [sessionForm, setSessionForm] = useState(false);
    const history = useHistory();
    const dispatch = useDispatch();
    const { userId } = useParams();
    const user = useSelector(getUser(userId));

    const handleMenuOpen = () => {
        setShowMenu(true);
    };

    const handleMenuClose = () => {
        setShowMenu(false);
    };

    const onClose = () => {
        setSessionForm(false);
    };

    const logoutUser = () => {
        dispatch(logout());
        history.push('/');
    };

    const toProfile = () => {
        history.push(`/${sessionUser._id}`);
    };

    return (
        <header id='navbar'>
            <div id='nav-container'>
                <div id='logo-button' className='nav-buttons'>
                    <NavLink exact to='/'>
                        <img src={logo} alt='logo' />
                    </NavLink>
                </div>
                <div onMouseEnter={handleMenuOpen} onMouseLeave={handleMenuClose} id='profile-drop' className='nav-buttons'>
                    {location.pathname === '/' &&  !sessionUser && (
                        <div className='about-us'>
                            <button onClick={() => history.push('/about')} className='about'>About Artifacts</button>
                            <button onClick={() => history.push('/contact')} className='about'>Contact Us</button>
                        </div>
                    )}
                    {sessionUser && (
                        <div id='profile-pic-button' className='profile-drop-button'>
                            <div className='pic'>
                                <img
                                    src={sessionUser?.profilePic}
                                    alt='profile'
                                />
                            </div>
                            <p>me <i className='fa-solid fa-caret-down'></i></p>
                        </div>
                    )}
                    {showMenu && sessionUser && (
                        <ul className='dropdown-items'>
                            <li onClick={toProfile}>Your profile</li>
                            <li onClick={() => history.push('/about')}>About Artifacts</li>
                            <li onClick={() => history.push('/contact')}>Contact Us</li>
                            <li onClick={logoutUser}>Sign out</li>
                        </ul>
                    )}
                    {!sessionUser && location.pathname !== '/' && (
                        <div className='profile-drop-button' id='session-buttons'>
                            <button onClick={() => setSessionForm('signup')} className='about'>
                                Sign up
                            </button>

                            <button onClick={() => setSessionForm('signin')} className='about'>
                                Sign in
                            </button>
                        </div>
                    )}
                    {(sessionForm === 'signup' || sessionForm === 'signin') && (
                        <Modal onClose={onClose}>
                            <SessionForm onClose={onClose} formType={sessionForm} />
                        </Modal>
                    )}
                </div>
                {sessionUser && (
                    <button onClick={() => history.push('/explore')} className='map-button'>
                        <i className='fa-solid fa-map'></i>
                        <p>Map</p>
                    </button>
                )}
            </div>
            <div id='test' className='nav-buttons'>
                {location.pathname === '/' && (
                    <div>ARTifacts</div>
                )}
                {user && (
                    <div>
                        {location.pathname === `/${user._id}` && (
                            <div>{user.username}'s Page</div>
                        )}
                    </div>
                )}
            </div>
        </header>
    );
};

export default NavBar;