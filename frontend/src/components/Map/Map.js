// import { useState } from "react"
// import './Map.css'

// function Map() {
//     const [clicked, setClicked] = useState(false);
//     const [artworks, setArtworks] = useState([]);
//     const [country, setCountry] = useState('')
//     const [timePeriod, setTimePeriod] = useState('')

//     const handleClick = (option) => {
//         // debugger
//         // setCountry(option)
//         console.log(country)
//         const url = "https://openaccess-api.clevelandart.org/api/artworks";
//         const params = {
//             q: option,
//             skip: 0,
//             limit: 50,
//             has_image: 1,
//             creation_date: timePeriod
//         };
        
//         fetch(`${url}?${new URLSearchParams(params)}`)
//         .then(response => response.json())
//         .then(data => {
//             // console.log(data)
//             const filtered = [];
//             data.data.forEach(artwork => {
//                 console.log(artwork)
//                 if (artwork.culture[0].toLowerCase().includes(option.toLowerCase())) {
//                     filtered.push(artwork);
//                 }
//             });
//                 setArtworks(filtered);
//                 setClicked(true);
//             })
//             .catch(error => {
//                 console.error("ERROR getting artwork data", error);
//             });
//         }
//         function isWithinCentury(year, centuryStart) {
//             const centuryEnd = centuryStart + 99;
//             return year >= centuryStart && year <= centuryEnd;
//         }
        
//         // console.log(artworks)
//     return (
//         <>
//             <div className="test-wrapper">
//                 <input type="text" onChange={(e) => setCountry(e.target.value)}/>
//                 <select onChange={(e) => setTimePeriod(e.target.value)}>
//                     <option value="">Select a time period</option>
//                     <option value="1300s">1300s</option> 
//                     <option value="1400s">1400s</option> 
//                     <option value="1500s">1500s</option> 
//                     <option value="1600s">1600s</option> 
//                     <option value="1700s">1700s</option> 
//                     <option value="1800s">1800s</option> 
//                     <option value="1900s">1900s</option> 
//                     <option value="2000s">2000s</option>
//                 </select>
//                 {/* <input type="radio" value="Painting" /> */}
//                 <button onClick={() => handleClick(country)}>search</button>
//                 {/* <button onClick={() => handleClick('spain')}>Spain</button>
//                 <button onClick={() => handleClick('china')}>China</button>
//                 <button onClick={() => handleClick('germany')}>Germany</button> */}
//                 {clicked && artworks.map((artwork, index) => (
//                     <div key={index}>
//                         {/* <h2>{artwork.wall_description}</h2> */}
//                         <h2>{artwork.culture}</h2>
//                         {/* <h2>{artwork.tombstone}</h2> */}
//                         <img src={artwork.images.web.url} alt={artwork.title} />
//                     </div>
//                 ))}
//             </div>
//         </>
//     )
// }

// export default Map

import { useState } from "react";
import "./Map.css";

function Map() {
  const [clicked, setClicked] = useState(false);
  const [artworks, setArtworks] = useState([]);
  const [country, setCountry] = useState("");
  const [timePeriod, setTimePeriod] = useState("");

  function handleClick(option) {
    console.log(country);
    const url = "https://openaccess-api.clevelandart.org/api/artworks";
    let params = {
      q: option,
      skip: 0,
      limit: 50,
      has_image: 1,
    };
    if (timePeriod) {
        params = {
          ...params,
          creation_date: timePeriod,
        };
    }

    fetch(`${url}?${new URLSearchParams(params)}`)
      .then((response) => response.json())
      .then((data) => {
        const filtered = [];
        data.data.forEach((artwork) => {
          console.log(artwork);
          if (
            artwork.culture[0].toLowerCase().includes(option.toLowerCase()) &&
            timePeriod &&
            isWithinCentury(parseInt(artwork.creation_date), parseInt(timePeriod))
          ) {
            filtered.push(artwork);
          }
        });
        setArtworks(filtered);
        setClicked(true);
      })
      .catch((error) => {
        console.error("ERROR getting artwork data", error);
      });
  }

  function isWithinCentury(year, centuryStart) {
    const centuryEnd = centuryStart + 99;
    return year >= centuryStart && year <= centuryEnd;
  }

  return (
    <>
      <div className="test-wrapper">
        <input type="text" onChange={(e) => setCountry(e.target.value)} />
        <select onChange={(e) => setTimePeriod(e.target.value)}>
          <option value="">Select a time period</option>
          <option value="1300">1300s</option>
          <option value="1400">1400s</option>
          <option value="1500">1500s</option>
          <option value="1600">1600s</option>
          <option value="1700">1700s</option>
          <option value="1800">1800s</option>
          <option value="1900">1900s</option>
          <option value="2000">2000s</option>
        </select>
        <button onClick={() => handleClick(country)}>search</button>
        {clicked &&
          artworks.map((artwork, index) => (
            <div key={index}>
              <h2>{artwork.culture}</h2>
              <img src={artwork.images.web.url} alt={artwork.title} />
            </div>
          ))}
      </div>
    </>
  );
}

export default Map;
