import { NavLink, useHistory } from 'react-router-dom';
import ProfileDropdown from './ProfileDropdown/ProfileDropdown';
import './NavBar.css';
import { useState } from 'react';
import art from './assets/ART.jpg';
import ifacts from './assets/ifacts.jpg';
import logo from './assets/ART.png'

const NavBar = () => {

    const [showMenu, setShowMenu] = useState(false);
    // const history = useHistory();
    
    const handleMenuOpen = () => {
        setShowMenu(true);
    };

    const handleMenuClose = () => {
        setShowMenu(false);
    };

    return (
        <header id='navbar'>
            <div className='nav-buttons' id='logo-button'>
                <NavLink exact to="/">
                    <img src={logo} alt='logo'/>
                    {/* <img src={ifacts} alt='ifacts' /> */}
                </NavLink>
            </div>

            <div className='nav-buttons' id='test'>
                <div>Test</div>
            </div>

            <div className='nav-buttons' id='profile-drop' onMouseEnter={handleMenuOpen} onMouseLeave={handleMenuClose}>
                {/* if sign in */}
                <div className='profile-drop-button'>ProfilePic</div>
                {showMenu && (
                <ul className='dropdown-items'>
                    <li>Your profile</li>
                    <li>Favourite</li>
                    <li>Sign out</li>
                </ul>
                )}
            </div>
        </header>
    )
}

export default NavBar;