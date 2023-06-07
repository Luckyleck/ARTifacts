import React from 'react'
import './SearchBar.css'

function SearchBar() {
    return (
    <div className='searchbar-container'>
        <i className="fa-solid fa-magnifying-glass search-icon"></i>
        <input type="text" placeholder='Search' className='search-bar'/>
    </div>
    )
}

export default SearchBar;