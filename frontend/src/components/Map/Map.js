import { useState, useRef, useEffect } from "react";
import { MapContainer, GeoJSON } from 'react-leaflet';
import { Slider } from '@material-ui/core';
import "./Map.css";
import 'leaflet/dist/leaflet.css'
import countries from '../../data/countries.geo.json';


import DisplayArtwork from "../DisplayArtwork/DisplayArtwork";

import { geoJsonStyle, maxBounds, randomColor, sliderMarks, sliderStyles } from "./MapFunctions";

function Map() {
  const [showArt, setShowArt] = useState([]) // Boolean // Replace later with modal
  const [artworks, setArtworks] = useState([])
  // const [dateAfter, setDateAfter] = useState(1500); //created_after param here
  const dateAfter = useRef(1500)
  const [params, setParams] = useState({ // needed for component 
    skip: 0,
    limit: 300,
    has_image: 1,
  })

  function doFetch(countryName) {
    console.log(dateAfter.current)

    const url = "https://openaccess-api.clevelandart.org/api/artworks";

    const tempParams = {
      q: countryName.toLowerCase(), ...params,
    }

    function formatParams(params) {

      let searchString = ''

      for (const [key, value] of Object.entries(params)) {
        searchString += `${key}=${value}&`
      }
      searchString += `created_after=${dateAfter.current}&`;
      // debugger;
      searchString += `created_before=${dateAfter.current + 99}`;

      console.log(searchString);
      return searchString;
    }


    const paramsString = formatParams(tempParams)

    fetch(`${url}?${paramsString}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(`Params used for search ${params}`)
        const filtered = [];
        data.data.forEach((artwork) => {
          if (artwork.culture[0]?.toLowerCase().includes(countryName.toLowerCase())) {
            filtered.push(artwork);
          }
        });
        setArtworks(filtered);
        setShowArt(true);
      })
      .catch((error) => {
        console.error("ERROR getting artwork data", error);
      });
  }

  function handleCountryClick (countryName) {

    doFetch(countryName);

    console.log(countryName);
    console.log(`Handle Country Click ${dateAfter.current}`)

  }

  function onEachCountry(country, layer) {

    console.log(dateAfter.current)
    console.log(layer)
    console.log(this)

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
          fillOpacity: 0.8
        })
      }
    })
  }

  function handleRandomArt() {
    const randomIndex = Math.floor(Math.random() * artworks.length);
    const randomArtwork = artworks[randomIndex];
    return randomArtwork && <DisplayArtwork artwork={randomArtwork} setShowArt={setShowArt} />
  }

  function handleSliderChange(event, value) {
    event.preventDefault();
    // const newDateAfter = value
    dateAfter.current = value
    console.log(test)
    setParams({
      ...params,
    });

  }

  useEffect(() => {
    setArtworks([])
  }, [dateAfter.current])

  return (
    <>
      <h1>{dateAfter.current}</h1>
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
        value={dateAfter.current}
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
