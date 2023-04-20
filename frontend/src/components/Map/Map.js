import { useState, useEffect } from "react";
import { MapContainer, GeoJSON } from 'react-leaflet';
import { Slider, Typography } from '@material-ui/core';
import "./Map.css";
import 'leaflet/dist/leaflet.css'
import countries from '../../data/countries.geo.json';


import DisplayArtwork from "../DisplayArtwork/DisplayArtwork";

import { geoJsonStyle, maxBounds, randomColor, sliderMarks, sliderStyles } from "./MapFunctions";

function Map() {
<<<<<<< HEAD
  const [clicked, setClicked] = useState(false);
  const [artworks, setArtworks] = useState([]);
  const [createdAfter, setCreatedAfter] = useState("");
  const [createdBefore, setCreatedBefore] = useState("");

  function formattedYear(year) {
    let newYear;

    if (year.length === 4) {
      newYear = parseInt(year + 99).toString().slice(0, 2) + "99"
    } else {
      newYear = parseInt(year + 99).toString().slice(0, 1) + "99"
    }

    return newYear
  }

  function handleCountryClick(countryName) {

    const url = "https://openaccess-api.clevelandart.org/api/artworks";
    // let params = {
    //   q: countryName,
    //   skip: 0,
    //   limit: 500,
    //   has_image: 1,
    // };
    console.log('before')
    console.log(createdAfter)
    if (createdAfter) {
      params = {
        ...params,
        created_after: createdAfter,
        created_before: formattedYear(createdAfter)
      };
    }

    fetch(`${url}?${new URLSearchParams(params)}`)
      .then((response) => response.json())
      .then((data) => {
        const filtered = [];
        data.data.forEach((artwork) => {
          if (createdAfter) {
            if (
              artwork.culture[0]?.toLowerCase().includes(countryName.toLowerCase()) &&
              createdAfter
            ) {
              filtered.push(artwork);
            }
          } else {
            if (
              artwork.culture[0]?.toLowerCase().includes(countryName.toLowerCase())
            ) {
              filtered.push(artwork)
            }
          }
        });
        setArtworks(filtered);
        setClicked(true);
      })
      .catch((error) => {
        console.error("ERROR getting artwork data", error);
      });
  }

  function handleRandomImage() {
    const randomIndex = Math.floor(Math.random() * artworks.length);
    const randomArtwork = artworks[randomIndex];
    return randomArtwork && (
      <div className="art-display-container">
        <h2>{randomArtwork?.culture}</h2>
        <button onClick={() => setClicked(false )}>&times;</button> 
        <img src={randomArtwork?.images.web.url} alt={randomArtwork?.title} id='fetched-image'/>
      </div>
    );
  }

  useEffect(() => {
    setArtworks([]);
  }, [createdAfter]);

  /* -------------------MAP--------------------- */

  const maxBounds = [
    [-120, -210],
    [110, 210]
  ];

  function style() {
    return {
      fillOpacity: 0.8,
      color: "black",
      weight: 2
    }
  }

  function onEachCountry(country, layer) {
    const countryName = country.properties.ADMIN
    layer.bindPopup(countryName);

    const colors = ["green", "yellow", "red", "orange", "purple", "brown"]
    const randomColorIndex = Math.floor(Math.random() * colors.length)

    layer.setStyle({ fillColor: colors[randomColorIndex] })

    layer.on({
      click: () => {
        handleCountryClick(country.properties.ADMIN)
      },
      mouseover: (e) => {
        e.target.setStyle({
          fillOpacity: 1
        })
      },
      mouseout: (e) => {
        e.target.setStyle({
          fillOpacity: 0.5
        })
      }
=======
    const [showArt, setShowArt] = useState([]) // Boolean // Replace later with modal
    const [artworks, setArtworks] = useState([])
    const [dateAfter, setDateAfter] = useState();
    const dateBefore = dateAfter + 100
    const [params, setParams] = useState({
        skip: 0,
        limit: 300,
        has_image: 1,
>>>>>>> origin/voyager2
    })

<<<<<<< HEAD
  return (
    <>
      <div className="test-wrapper">
        {/* <select onChange={(e) => {
          setCreatedAfter(e.target.value);
          setCreatedBefore(parseInt(e.target.value + 99));
          console.log(createdAfter)
        }}>
        <option value="">All Time</option>
        <option value="500">500s</option>
        <option value="600">600s</option>
        <option value="700">700s</option>
        <option value="800">800s</option>
        <option value="900">900s</option>
        <option value="1000">1000s</option>
        <option value="1100">1100s</option>
        <option value="1200">1200s</option>
        <option value="1300">1300s</option>
        <option value="1400">1400s</option>
        <option value="1500">1500s</option>
        <option value="1600">1600s</option>
        <option value="1700">1700s</option>
        <option value="1800">1800s</option>
        <option value="1900">1900s</option>
      </select> */}
      </div>
      {/* <div className="our-map-container"> */}
        <MapContainer
          className="our-map"
          zoom={3}
          center={[0,0]}
          minZoom={3}
          maxBounds={maxBounds}
          maxBoundsViscosity={1}
        >

          <GeoJSON
            data={countries.features}
            style={style}
            onEachFeature={onEachCountry}
          />
        </MapContainer>
      {/* </div> */}
      <div>
      {clicked && handleRandomImage()}
        <input className="slider" type="range" min="500" max="1900" step="100" list="values" onChange={(e) => setCreatedAfter(e.target.value)}/>
        {console.log(createdAfter)}
        <datalist id="values">
          <option value="500" label="500s"></option>
          <option value="600" label="600s"></option>
          <option value="700" label="700s"></option>
          <option value="800" label="800s"></option>
          <option value="900" label="900s"></option>
          <option value="1000" label="1000s"></option>
          <option value="1100" label="1100s"></option>
          <option value="1200" label="1200s"></option>
          <option value="1300" label="1300s"></option>
          <option value="1400" label="1400s"></option>
          <option value="1500" label="1500s"></option>
          <option value="1600" label="1600s"></option>
          <option value="1700" label="1700s"></option>
          <option value="1800" label="1800s"></option>
          <option value="1900" label="1900s"></option>
        </datalist>
      </div>
    </>
  );
}

export default Map;
=======
    function handleCountryClick(countryName) {
        console.log(countryName)
        console.log(dateAfter)
        const url = "https://openaccess-api.clevelandart.org/api/artworks";
        

        fetch(`${url}?${new URLSearchParams(params)}`)
            .then((response) => response.json())
            .then((data) => {
                const filtered = [];
                data.data.forEach((artwork) => {
                    if (createdAfter) {
                        if (
                            artwork.culture[0]?.toLowerCase().includes(countryName.toLowerCase()) &&
                            createdAfter
                        ) {
                            filtered.push(artwork);
                        }
                    } else {
                        if (
                            artwork.culture[0]?.toLowerCase().includes(countryName.toLowerCase())
                        ) {
                            filtered.push(artwork)
                        }
                    }
                });
                setArtworks(filtered);
                setShowArt(true);
            })
            .catch((error) => {
                console.error("ERROR getting artwork data", error);
            });
    }

    function onEachCountry(country, layer) {

        const countryName = country.properties.ADMIN
        // console.log(countryName)
        layer.bindPopup(countryName);

        layer.setStyle({ fillColor: randomColor() })

        layer.on({
            click: () => {
                handleCountryClick(country.properties.ADMIN)
            },
            mouseover: (e) => {
                e.target.setStyle({
                    fillOpacity: 1
                })
            },
            mouseout: (e) => {
                e.target.setStyle({
                    fillOpacity: 0.5
                })
            }
        })
    }

    function handleRandomArt() {
        const randomIndex = Math.floor(Math.random() * artworks.length);
        const randomArtwork = artworks[randomIndex];
        return randomArtwork && <DisplayArtwork artwork={randomArtwork} setShowArt={setShowArt} />
    }

    function handleSliderChange(event,value) {
        setDateAfter(value);
        console.log(dateAfter)
        console.log(event)
    }

    return (
        <>

            {/* <Typography variant="body2">{dateAfter}s</Typography> */}
            <MapContainer
                className="our-map"
                zoom={3}
                center={[0, 0]}
                minZoom={3}
                maxBounds={maxBounds}
                maxBoundsViscosity={1}
            >

                <GeoJSON
                    data={countries.features}
                    style={geoJsonStyle}
                    onEachFeature={onEachCountry}
                />

            </MapContainer>
            {showArt && handleRandomArt()}
            <Slider
                value={dateAfter}
                onChange={handleSliderChange}
                min={500}
                max={1900}
                step={100}
                marks={sliderMarks}
                classes={sliderStyles()}
                valueLabelDisplay="auto"
            />
        </>
    )
}

export default Map;
  //   const [clicked, setClicked] = useState(false);
  //   const [artworks, setArtworks] = useState([]);
  //   const [country, setCountry] = useState("");
  //   const [createdAfter, setCreatedAfter] = useState("");
  //   const [createdBefore, setCreatedBefore] = useState("");

  //   function formattedYear(year) {
  //     let newYear;

  //     if (year.length === 4) {
  //       newYear = parseInt(year + 99).toString().slice(0, 2) + "99"
  //     } else {
  //       newYear = parseInt(year + 99).toString().slice(0, 1) + "99"
  //     }

  //     return newYear
  //   }

  //   function handleCountryClick(countryName) {

  //     const url = "https://openaccess-api.clevelandart.org/api/artworks";
  //     let params = {
  //       q: countryName,
  //       skip: 0,
  //       limit: 500,
  //       has_image: 1,
  //     };

  //     if (createdAfter) {
  //       debugger
  //       params = {
  //         ...params,
  //         created_after: createdAfter,
  //         created_before: formattedYear(createdAfter)
  //       };
  //     }

  //     fetch(`${url}?${new URLSearchParams(params)}`)
  //       .then((response) => response.json())
  //       .then((data) => {
  //         const filtered = [];
  //         data.data.forEach((artwork) => {
  //           if (createdAfter) {
  //             if (
  //               artwork.culture[0]?.toLowerCase().includes(countryName.toLowerCase()) &&
  //               createdAfter
  //             ) {
  //               filtered.push(artwork);
  //             }
  //           } else {
  //             if (
  //               artwork.culture[0]?.toLowerCase().includes(countryName.toLowerCase())
  //             ) {
  //               filtered.push(artwork)
  //             }
  //           }
  //         });
  //         setArtworks(filtered);
  //         setClicked(true);
  //       })
  //       .catch((error) => {
  //         console.error("ERROR getting artwork data", error);
  //       });
  //   }

  //   function handleRandomImage() {
  //     const randomIndex = Math.floor(Math.random() * artworks.length);
  //     const randomArtwork = artworks[randomIndex];

  //     return randomArtwork && (
  //       <div className="art-display-container">
  //         <FavoriteButton artwork={randomArtwork} />
  //         <h2>{randomArtwork?.culture}</h2>
  //         <button onClick={() => setClicked(false)}>&times;</button>
  //         <img src={randomArtwork?.images.web.url} alt={randomArtwork?.title} id='fetched-image'/>
  //         {console.log(randomArtwork)}
  //       </div>
  //     );
  //   }

  //   useEffect(() => {
  //     setArtworks([]);
  //   }, [country, createdAfter]);

  //   /* -------------------MAP--------------------- */

  //   const maxBounds = [
  //     [-120, -210],
  //     [110, 210]
  //   ];

  //   function style() {
  //     return {
  //       fillOpacity: 0.8,
  //       color: "black",
  //       weight: 2
  //     }
  //   }

  //   function onEachCountry(country, layer) {
  //     const countryName = country.properties.ADMIN
  //     // console.log(countryName)
  //     layer.bindPopup(countryName);

  //     const colors = ["green", "yellow", "red", "orange", "purple", "brown"]
  //     const randomColorIndex = Math.floor(Math.random() * colors.length)

  //     layer.setStyle({ fillColor: colors[randomColorIndex] })

  //     layer.on({
  //       click: () => {
  //         handleCountryClick(country.properties.ADMIN)
  //       },
  //       mouseover: (e) => {
  //         e.target.setStyle({
  //           fillOpacity: 1
  //         })
  //       },
  //       mouseout: (e) => {
  //         e.target.setStyle({
  //           fillOpacity: 0.5
  //         })
  //       }
  //     })
  //   }

  //   return (
  //     <>
  //       <div className="test-wrapper">
  //         <input type="text" onChange={(e) => setCountry(e.target.value)} />

  //         <select onChange={(e) => {
  //           setCreatedAfter(e.target.value);
  //           setCreatedBefore(parseInt(e.target.value + 99))
  //         }
  //         }>
  //           <option value="">All Time</option>
  //           <option value="500">500s</option>
  //           <option value="600">600s</option>
  //           <option value="700">700s</option>
  //           <option value="800">800s</option>
  //           <option value="900">900s</option>
  //           <option value="1000">1000s</option>
  //           <option value="1100">1100s</option>
  //           <option value="1200">1200s</option>
  //           <option value="1300">1300s</option>
  //           <option value="1400">1400s</option>
  //           <option value="1500">1500s</option>
  //           <option value="1600">1600s</option>
  //           <option value="1700">1700s</option>
  //           <option value="1800">1800s</option>
  //           <option value="1900">1900s</option>
  //         </select>

  //       </div>
  //       <div className="our-map-container">
  //       <MapContainer
  //           className="our-map"
  //           zoom={3}
  //           center={[0,0]}
  //           minZoom={3}
  //           maxBounds={maxBounds}
  //           maxBoundsViscosity={1}
  //         >

  //           <GeoJSON
  //             data={countries.features}
  //             style={style}
  //             onEachFeature={onEachCountry}
  //           />
  //         </MapContainer>
  //       </div>
  //       {clicked && handleRandomImage()}
  //     </>
  //   );
  // }





/* <button onClick={() => handleClick(country)}>search</button> */
>>>>>>> origin/voyager2
