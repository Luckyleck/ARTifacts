import { NavLink, useHistory } from 'react-router-dom';
import ProfileDropdown from './ProfileDropdown/ProfileDropdown';
import './NavBar.css'
import { useState } from 'react';

const NavBar = () => {

    const [showMenu, setShowMenu] = useState(false);
    // const history = useHistory();
    
    const handleMenuOpen = () => {
        setShowMenu(true);
    };

    const handleMenuClose = () => {
        setShowMenu(false);
    };

    const dropdownItems = [
        {
            label: 'Sign In',
            // onClick: () => history.push('/signin')
        },
        {
            label: 'Sign Up',
            // onClick: () => history.push('/signup')
        }
    ];

    return (
        <header id='navbar'>
            <div className='nav-buttons' id='logo-button'>
                <NavLink exact to="/">Logo</NavLink>
            </div>

            <div className='nav-buttons'>
                <div>Test</div>
            </div>

            <div
                className='nav-buttons'
                id='profile-drop'
                onMouseEnter={handleMenuOpen}
                onMouseLeave={handleMenuClose}
            >
                <div>Dropdown</div>
                {showMenu && (
                
                <div className='dropdown'>
                    { dropdownItems.map((item, index) => (
                    <button key={index} style={{ transitionDelay: `${index * 10}ms` }} onClick={item.onClick}>
                        {item.label}
                    </button>
                    )) }
                </div>
                )}
            </div>
        </header>
    )
}

export default NavBar;