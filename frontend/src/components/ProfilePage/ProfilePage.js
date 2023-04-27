import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRandomUsers, fetchUser, getRandomUsers, getUser, updateUser } from '../../store/users';
import FollowButton from './Buttons/FollowButton';
import './ProfilePage.css';
import { Redirect, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import FavoritesIndex from './Indexes/FavoritesIndex';

const ProfilePage = () => {
    const dispatch = useDispatch();
    const { userId } = useParams();
    const user = useSelector(getUser(userId));
    const sessionUser = useSelector(state => state.session.user);
    const [openFavorite, setOpenFavorite] = useState(false);
    const history = useHistory();
    const [follower, setFollower] = useState(false);
    const [following, setFollowing] = useState(false);
    const randomUsers = useSelector(getRandomUsers);
    const [username, setUsername] = useState(sessionUser.username);
    const [editUsername, setEditUsername] = useState(false);

    useEffect(() => {
        dispatch(fetchUser(userId));
        dispatch(fetchRandomUsers(5));
    }, [dispatch, userId]);

    if (!sessionUser) return (
        <Redirect to='/' />
    );

    const changeUsername = () => {
        setEditUsername(true);
    };

    const handleChangeUsername = (e) => {
        e.preventDefault();
        const testUser = { email: sessionUser.email, profilePic: sessionUser.profilePic, username: username, _id: sessionUser._id };
        dispatch(updateUser(testUser));
        setEditUsername(false);
    };

    const moveLeft = () => {
        const card = document.querySelector('.profile-card');
        const fav = document.querySelector('.favorite');
        card.classList.add('move-left');
        fav.classList.add('slide-in-favorites');
        card.classList.remove('move-right');
        fav.classList.remove('slide-out-favorites');
        setOpenFavorite(true);
    };

    const moveRight = () => {
        const card = document.querySelector('.profile-card');
        const fav = document.querySelector('.favorite');
        card.classList.add('move-right');
        fav.classList.add('slide-out-favorites');
        card.classList.remove('move-left');
        fav.classList.remove('slide-in-favorites');
        setOpenFavorite(false);
    }

    const viewFollowers = () => {
        setFollowing(false);
        setFollower(true);
        const followerColor = document.querySelector('.follow-followers');
        const followingColor = document.querySelector('.follow-following');
        followingColor.classList.remove('add-color');
        followerColor.classList.add('add-color');
    };

    const viewFollowing = () => {
        setFollower(false);
        setFollowing(true);
        const followerColor = document.querySelector('.follow-followers');
        const followingColor = document.querySelector('.follow-following');
        followerColor.classList.remove('add-color');
        followingColor.classList.add('add-color');
    };

    return (
        <div className='profile-container'>
            <div className='profile-card'>
                <div className='profile-card-top'>
                    <div className='profile-card-background'>
                        <img src={user?.backgroundPic} alt='background-pic' />
                    </div>
                    <div className='pic profile-card-pic'>
                        <img src={user?.profilePic} alt='profile-pic' />
                    </div>
                </div>
                {user && (
                    <>
                        {sessionUser._id === user._id && (
                            <div className='edit-username-button-container'>
                                <button onClick={changeUsername} className='edit-username-button'>
                                    <i className='fa-solid fa-pen'></i>
                                </button>
                            </div>
                        )}
                        {editUsername && (
                            <div className='modal'>
                                <div onClick={() => setEditUsername(false)} className='modal-background'></div>
                                <div className='edit-username-modal'>
                                    <form>
                                        <button type='button' onClick={() => setEditUsername(false)} className='close-form'>
                                            <i className='fa-solid fa-xmark'></i>
                                        </button>
                                        <h1 className='edit-username-header'>Change your username</h1>
                                        <input type='text' placeholder={user.username} onChange={(e) => setUsername(e.target.value)} className='edit-username-input' />
                                        <input type='submit' value='Submit Changes' onClick={handleChangeUsername} className='edit-username-submit' />
                                    </form>
                                </div>
                            </div>
                        )}
                        <div className='edit-user-info'>
                            <div className='user-info'>
                                <p>{user.username}</p>
                            </div>
                        </div>
                    </>
                )}
                <FollowButton />
                {user && (
                    <div className='profile-card-bottom'>
                        <ul>
                            <li>Followers: <p>&nbsp;{user.followers?.length}</p></li>
                            <li>Following: <p>&nbsp; {user.follows?.length}</p></li>
                            <li>Favorites: <p>&nbsp; {user.favorites?.length}</p></li>
                        </ul>
                        {!openFavorite && (
                            <div className='expand-favorite'>
                                <i onClick={moveLeft} id='profile-expand' className='fa-solid fa-angles-down'></i>
                                <p>Expand Favorites</p>
                            </div>
                        )}
                        {openFavorite && (
                            <div className='expand-favorite'>
                                <i className='fa-solid fa-angles-down' id='profile-collapse' onClick={moveRight}></i>
                            </div>
                        )}
                    </div>
                )}
            </div>
            {/* {openFavorite && ( */}
                <div id='favorite' className='favorite'>
                    <div className='favorite-header'>
                        Favorites:
                    </div>
                    <FavoritesIndex />
                </div>
            {/* )} */}
            <div className='follow-container'>
                <div className='follow-tag'>
                    <p className='tab-text'>Followers / Following</p>
                </div>
                <div className='follow-title'>
                    <div onClick={viewFollowers} className='follow-followers'><p>Followers</p></div>
                    <div onClick={viewFollowing} className='follow-following'><p>Following</p></div>
                </div>
                {following && (
                    <div className='follow-detail'>
                        {user && user.follows?.map((follow, index) => (
                            <div key={index} onClick={() => history.push(`/${follow._id}`)} className='follow-card'>
                                <div className='profile-card-top follow-card-top'>
                                    <div className='profile-card-background follow-card-background'>
                                        <img src={follow.backgroundPic} alt='background-pic' />
                                    </div>
                                    <div onClick={() => history.push(`/${follow._id}`)} className='pic follow-card-profile'>
                                        <img src={follow.profilePic} alt='profile-pic' />
                                    </div>
                                </div>
                                <div id='follow-card-info' className='user-info'>
                                    <p id='follow-card-username'>{follow.username}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                {follower && (
                    <div className='follow-detail'>
                        {user && user.followers?.map((follower, index) => (
                            <div key={index} onClick={() => history.push(`/${follower._id}`)} className='follow-card'>
                                <div className='profile-card-top follow-card-top'>
                                    <div className='profile-card-background follow-card-background'>
                                        <img src={follower.backgroundPic} alt='background-pic' />
                                    </div>
                                    <div onClick={() => history.push(`/${follower._id}`)} className='pic follow-card-profile'>
                                        <img src={follower.profilePic} alt='profile-pic' />
                                    </div>
                                </div>
                                <div id='follow-card-info' className='user-info'>
                                    <p id='follow-card-username'>{follower.username}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className='explore-container'>
                <div className='follow-tag'>
                    <p className='tab-text'>Explore other Users</p>
                </div>
                <div className='follow-detail explore-detail'>
                    {randomUsers && randomUsers.map((randomUser, index) => (
                        <div key={index} onClick={() => history.push(`/${randomUser._id}`)} className='follow-card'>
                            <div className='profile-card-top follow-card-top'>
                                <div className='profile-card-background follow-card-background'>
                                    <img src={randomUser.backgroundPic} alt='starry' />
                                </div>
                                <div onClick={() => history.push(`/${randomUser._id}`)} className='pic follow-card-profile'>
                                    <img src={randomUser.profilePic} alt='pikachu' />
                                </div>
                            </div>
                            <div id='follow-card-info' className='user-info'>
                                <p id='follow-card-username'>{randomUser.username}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;