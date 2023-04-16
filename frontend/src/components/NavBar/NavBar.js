import { NavLink } from 'react-router-dom';
import ProfileDropdown from './ProfileDropdown/ProfileDropdown';
import './NavBar.css'

const NavBar = () => {

    return (
        <header id='navbar'>
            <div className='nav-buttons'>
                <NavLink exact to="/">Logo</NavLink>
            </div>

            <div className='nav-buttons'>
                <p>Title</p>
            </div>

            <div className='nav-buttons'>
                <ProfileDropdown />
            </div>
        </header>
    )
}

export default NavBar;