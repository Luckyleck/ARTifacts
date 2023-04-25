import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRandomUsers, fetchUser, getRandomUsers, getUser } from '../../store/users';

import FollowButton from './Buttons/FollowButton';

import './ProfilePage.css'
import { Redirect, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import FavoritesIndex from './Indexes/FavoritesIndex';
import DisplayArtwork from '../DisplayArtwork/DisplayArtwork';

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
    const [ArtworkViewModalIsOpen, setArtworkViewModalIsOpen] = useState(false);

    useEffect(() => {
        dispatch(fetchUser(userId));
        dispatch(fetchRandomUsers(5));
    }, [dispatch, userId]);
    
    if (!sessionUser) return <Redirect to='/' />;

    function toggleArtworkViewModal() {
        setArtworkViewModalIsOpen(!ArtworkViewModalIsOpen);
    }

    const moveLeft = () => {
        const card = document.querySelector('.profile-card');
        card.classList.add('move-left');
        setOpenFavorite(true);
    }

    const viewFollowers = () => {
        setFollowing(false);
        setFollower(true);
        const followerColor = document.querySelector('.follow-followers');
        const followingColor = document.querySelector('.follow-following');
        followingColor.classList.remove('add-color');
        followerColor.classList.add('add-color');
    }

    const viewFollowing = () => {
        setFollower(false);
        setFollowing(true);
        const followerColor = document.querySelector('.follow-followers');
        const followingColor = document.querySelector('.follow-following');
        followerColor.classList.remove('add-color');
        followingColor.classList.add('add-color');
    }

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
                    <div className='user-info'>
                        <p>{user.username}</p>
                    </div>
                )}
                <FollowButton />
                {user && (
                    <div className='profile-card-bottom'>
                        <ul>
                            <li>Followers: <p>&nbsp;{user.followers?.length}</p></li>
                            <li>Following: <p>&nbsp; {user.follows?.length}</p></li>
                            <li>Favorite arts: <p>&nbsp; {user.favorites?.length}</p></li>
                        </ul>
                        {!openFavorite && (
                            <div className='expand-favorite'>
                                <i className="fa-solid fa-angles-down" id='profile-expand' onClick={moveLeft}></i>
                                <p>Expand Favorites</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
            {openFavorite && (
                <div className='favorite' id='favorite'>
                    <div className='favorite-header'>
                        Favorites:
                    </div>
                    {/* <FavoritesIndex /> */}
                    <div className='grid-container'>
                        {user?.favorites?.map((art, index) => (
                            <>
                                <div className='grid-item' key={index}>
                                    <img src={art.images.web.url} alt='art' onClick={toggleArtworkViewModal}/>
                                    {ArtworkViewModalIsOpen && <DisplayArtwork toggle={toggleArtworkViewModal} artwork={art} />}
                                </div>
                            </>
                        ))}
                    </div>
                </div>
            )}
            <div className='follow-container'>
                <div className='follow-tag'>
                    <p>Followers / Following</p>
                </div>
                <div className='follow-title'>
                    <div className='follow-followers' onClick={viewFollowers}><p>Followers</p></div>
                    <div className='follow-following' onClick={viewFollowing}><p>Following</p></div>
                </div>
                {following && (
                    <div className='follow-detail'>
                        {user && user?.follows?.map((follow, index) => (
                            <div className='follow-card' key={index} onClick={() => history.push(`/${follow._id}`)}>
                                <div className='profile-card-top follow-card-top'>
                                    <div className='profile-card-background follow-card-background'>
                                        <img src={follow.backgroundPic} alt='background-pic' />
                                    </div>
                                    <div className='pic follow-card-profile' onClick={() => history.push(`/${follow?._id}`)}>
                                        <img src={follow.profilePic} alt='profile-pic' />
                                    </div>
                                </div>
                                <div className='user-info' id='follow-card-info'>
                                    <p id='follow-card-username'>{follow.username}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                {follower && (
                    <div className='follow-detail'>
                        {user && user?.followers?.map((follower, index) => (
                            <div className='follow-card' key={index} onClick={() => history.push(`/${follower._id}`)}>
                                <div className='profile-card-top follow-card-top'>
                                    <div className='profile-card-background follow-card-background'>
                                        <img src={follower.backgroundPic} alt='background-pic' />
                                    </div>
                                    <div className='pic follow-card-profile' onClick={() => history.push(`/${follower._id}`)}>
                                        <img src={follower.profilePic} alt='profile-pic' />
                                    </div>
                                </div>
                                <div className='user-info' id='follow-card-info'>
                                    <p id='follow-card-username'>{follower.username}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className='explore-container'>
                <div className='follow-tag'>
                    <p>Explore Users</p>
                </div>
                <div className='follow-detail explore-detail'>
                    {randomUsers && randomUsers?.map((randomUser, index) => (
                        <div className='follow-card' key={index} onClick={() => history.push(`/${randomUser._id}`)}>
                            <div className='profile-card-top follow-card-top'>
                                <div className='profile-card-background follow-card-background'>
                                    <img src={randomUser.backgroundPic} alt='starry' />
                                </div>
                                <div className='pic follow-card-profile' onClick={() => history.push(`/${randomUser._id}`)}>
                                    <img src={randomUser.profilePic} alt='pikachu' />
                                </div>
                            </div>
                            <div className='user-info' id='follow-card-info'>
                                <p id='follow-card-username'>{randomUser.username}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;