import { NavLink, useHistory, useLocation } from 'react-router-dom';
import ProfileDropdown from './ProfileDropdown/ProfileDropdown';
import './NavBar.css';
import { useState } from 'react';
import logo from './assets/ART.png'
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from '../context/Modal';
import SignupForm from '../SessionForms/SignupForm';
import LoginForm from '../SessionForms/LoginForm';
import { logout } from '../../store/session';

const NavBar = () => {

    const [showMenu, setShowMenu] = useState(false);
    const location = useLocation();
    const sessionUser = useSelector(state => state.session.user);
    const [signUp, setSignUp] = useState(false);
    const [signIn, setSignIn] = useState(false);
    const history = useHistory();
    const dispatch = useDispatch();
    
    const handleMenuOpen = () => {
        setShowMenu(true);
    };

    const handleMenuClose = () => {
        setShowMenu(false);
    };

    const onClose = () => {
        setSignUp(false);
        setSignIn(false);
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
                    <div className='profile-drop-button'>
                        ProfilePic
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
                            <button className='about' onClick={() => setSignUp(true)}>
                                Sign up
                            </button>

                            <button className='about' onClick={() => setSignIn(true)}>
                                Sign in
                            </button>
                        </div>
                    }

                    { signUp && (
                        <Modal onClose={onClose}>
                            <SignupForm onClose={onClose} />
                        </Modal>
                    )}

                    { signIn && (
                        <Modal onClose={onClose}>
                            <LoginForm onClose={onClose} />
                        </Modal>
                    )}
                </div>
            </div>

            <div className='nav-buttons' id='test'>
                <div>Test</div>
            </div>

        </header>
    )
}

export default NavBar;




// import { Link } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import './NavBar.css';
// import { logout } from '../../store/session';

// export default function NavBar() {
//   const dispatch = useDispatch();
//   const loggedIn = useSelector(state => !!state.session.user);

//   const logoutUser = e => {
//       e.preventDefault();
//       dispatch(logout());
//   }

//   const getLinks = () => {
//     if (loggedIn) {
//       return (
//         <div className="links-nav">
//           <button onClick={logoutUser}>Logout</button>
//         </div>
//       );
//     } else {
//       return (
//         <div className="links-auth">
//           <Link to={'/signup'}>Signup</Link>
//           <Link to={'/login'}>Login</Link>
//         </div>
//       );
//     }
//   }

//   return (
//     <>
//       {/* <h1>ARTiFacts</h1> */}
//       { getLinks() }
//     </>
//   );
// }