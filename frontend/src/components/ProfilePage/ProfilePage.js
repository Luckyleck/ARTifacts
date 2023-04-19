import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser, getUser } from '../../store/users';

import FollowersIndex from './Indexes/FollowersIndex';
import FollowsIndex from './Indexes/FollowsIndex';
import RandomUsersIndex from './Indexes/RandomUsersIndex';

import './ProfilePage.css'

import starry from '../MainPage/assets/starry_night.webp'
import pikachu from '../NavBar/assets/pikachu.png'
import cafe from '../MainPage/assets/Cafe_Terrace_at_Night.webp';
import girl from '../MainPage/assets/Girl_with_a_Pearl_Earring.jpeg';
import guernica from '../MainPage/assets/Guernica.jpeg';
import mona from '../MainPage/assets/Mona_Lisa.jpg';
import adam from '../MainPage/assets/The_Creation_of_Adam.webp';
import supper from '../MainPage/assets/The_Last_Supper.webp';
import memory from '../MainPage/assets/The_Persistence_of_Memory.jpeg';
import scream from '../MainPage/assets/The_scream.jpeg';

export default function ProfilePage() {
    const dispatch = useDispatch();
    const { userId } = useParams();
    const user = useSelector(getUser(userId));

    useEffect(() => {
        dispatch(fetchUser(userId))
    }, [dispatch, userId]);


    const [openFavorite, setOpenFavorite] = useState(false);

    const arts = [cafe, girl, guernica, mona, adam, supper, memory, scream];

    const moveLeft = () => {
        const card = document.querySelector('.profile-card');
        card.classList.add('move-left');
        setOpenFavorite(true);
    }
    
    return (
        <>
            <div>
                <RandomUsersIndex />
                <FollowsIndex user={user} />
                <FollowersIndex user={user} />
            </div>
            <div className='profile-container'>
                <div className='profile-card'>
                    <div className='profile-card-top'>
                        <div className='profile-card-background'>
                            <img src={starry} alt='starry' />
                        </div>

                        <div className='pic' id='profile-card-pic'>
                            <img src={pikachu} alt='pikachu' />
                        </div>
                    </div>
                          
                    <div className='profile-card-bottom'>
                        <ul>
                            <li>Followers:</li>
                            <li>Following:</li>
                            <li>Favorite arts:</li>
                        </ul>
                        {!openFavorite &&
                        <div className='expand-favorite'>
                            <i className="fa-solid fa-angles-down" onClick={moveLeft}></i>
                            <p>Expand Favorites</p>
                        </div> }
                    </div>
                  </div>
                  {openFavorite && (
                  <div className='favorite'>
                      <div className='favorite-header'>
                          Favorites:
                      </div>
                      <div className='grid-container'>
                          {arts.map((art, index) => (
                              <div className='grid-item' key={index}>
                                  <img src={art} alt='art' />
                              </div>
                          ))}
                      </div>
                  </div>)}
              </div>
        </>
    );
}