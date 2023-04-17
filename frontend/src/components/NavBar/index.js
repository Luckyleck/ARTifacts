import { NavLink, useHistory } from 'react-router-dom';
import ProfileDropdown from './ProfileDropdown';
import './NavBar.css';
import { useState } from 'react';
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
                    <li>Favorite</li>
                    <li>Sign out</li>
                </ul>
                )}
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
//           {/* <Link to={'/tweets'}>All Tweets</Link> */}
//           {/* <Link to={'/profile'}>Profile</Link> */}
//           {/* <Link to={'/tweets/new'}>Write a Tweet</Link> */}
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