// import { useState } from 'react';
// import { useHistory } from 'react-router-dom';

// const ProfileDropdown = () => {
//     const [showMenu, setShowMenu] = useState(false);
//     const history = useHistory();
    
//     const handleMenuOpen = () => {
//         setShowMenu(true);
//     };

//     const handleMenuClose = () => {
//         setShowMenu(false);
//     };

//     const dropdownItems = [
//         {
//             label: 'Sign In',
//             onClick: () => history.push('/signin')
//         },
//         {
//             label: 'Sign Up',
//             onClick: () => history.push('/signup')
//         }
//     ];

//     return (
//         <div onMouseEnter={handleMenuOpen} onMouseLeave={handleMenuClose} id="profile-drop" className="drop-buttons">
//             <div>Dropdown</div>
//             {showMenu && (
//                 <div className="dropdown">
//                     {dropdownItems.map((item, index) => (
//                         <button key={index} style={{ transitionDelay: `${index * 50}ms` }} onClick={item.onClick}>
//                             {item.label}
//                         </button>
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default ProfileDropdown;