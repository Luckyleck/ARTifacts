import React from 'react'
import './SearchBar.css'

function SearchBar() {
    return (
        // <div className="search-bar">
        //     <input type="text" placeholder="Search for users here..."/>
        // </div>
    <div className='searchWithIcon'>
        <i className="fa-solid fa-magnifying-glass" id='searchIcon'></i>
        <input type="text" placeholder='Search' id='searchBar'/>
    </div>
    )
}

export default SearchBar;