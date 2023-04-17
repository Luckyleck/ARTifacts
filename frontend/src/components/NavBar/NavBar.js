import { NavLink, useHistory, useLocation } from 'react-router-dom';
import ProfileDropdown from './ProfileDropdown/ProfileDropdown';
import './NavBar.css';
import { useState } from 'react';
import logo from './assets/ART.png'

const NavBar = () => {

    const [showMenu, setShowMenu] = useState(false);
    // const history = useHistory();
    const location = useLocation();
    
    const handleMenuOpen = () => {
        setShowMenu(true);
    };

    const handleMenuClose = () => {
        setShowMenu(false);
    };

    return (
        <header id='navbar'>
            <div id='nav-container'>
                <div className='nav-buttons' id='logo-button'>
                    <NavLink exact to="/">
                        <img src={logo} alt='logo'/>
                    </NavLink>
                </div>
                <div className='nav-buttons' id='profile-drop' onMouseEnter={handleMenuOpen} onMouseLeave={handleMenuClose}>
                    {/* if not sign in
                    { location.pathname === '/' && (
                        <div className='about-us'>
                            <div>About Artifacts</div>
                            <div>Contact Us</div>
                        </div>
                    )} */}

                    {/* if sign in
                    <div className='profile-drop-button'>ProfilePic</div>
                    {showMenu && (
                    <ul className='dropdown-items'>
                        <li>Your profile</li>
                        <li>Favorite</li>
                        <li>Sign out</li>
                    </ul>
                    )} */}

                    <div className='profile-drop-button'>
                        Sign in
                    </div>
                </div>
            </div>

            <div className='nav-buttons' id='test'>
                <div>Test</div>
            </div>

        </header>
    )
}

export default NavBar;