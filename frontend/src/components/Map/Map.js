import { useState, useEffect, useRef } from "react";
import { Slider } from '@material-ui/core';
import { MapContainer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'
import "./Map.css";
import countries from '../../data/countries.geo.json';
import DisplayArtwork from "../DisplayArtwork/DisplayArtwork";
import { geoJsonStyle, maxBounds, randomColor, sliderMarks, sliderStyles } from "./MapFunctions";

function Map() {
  const [showArt, setShowArt] = useState(false); // Boolean // Replace later with modal
  const [artworks, setArtworks] = useState([]);
  const dateAfter = useRef(1500);
  const [countryName, setCountryName] = useState('');
  const [params, setParams] = useState({ // needed for component 
    skip: 0,
    limit: 300,
    has_image: 1,
  });

  function doFetch(countryName) {
    const url = "https://openaccess-api.clevelandart.org/api/artworks";

    const tempParams = {
      q: countryName.toLowerCase(), ...params
    };

    function formatParams(params) {
      let searchString = '';

      for (const [key, value] of Object.entries(params)) {
        searchString += `${key}=${value}&`;
      }

      searchString += `created_after=${dateAfter.current}&`;
      searchString += `created_before=${dateAfter.current + 99}`;

      return searchString;
    }

    const paramsString = formatParams(tempParams);

    fetch(`${url}?${paramsString}`)
      .then((response) => response.json())
      .then((data) => {
        const filtered = [];
        data.data.forEach((artwork) => {
          if (artwork.culture[0]?.toLowerCase().includes(countryName.toLowerCase())) {
            filtered.push(artwork);
          }
        });
        setArtworks(filtered);
        setRandomArtwork(artworks[Math.floor(Math.random() * artworks.length)]);
        setShowArt(true);
      })
      .catch((error) => {
        console.error("ERROR getting artwork data", error);
      })
    ;
  }

  function handleCountryClick (countryName) {
    setCountryName(countryName)
    doFetch(countryName);
  }

  function onEachCountry(country, layer) {
    // layer.bindPopup(country.properties.ADMIN);
    layer.setStyle({ fillColor: randomColor() });
    layer.on({
      click: () => {
        handleCountryClick(country.properties.ADMIN);
      },
      mouseover: (e) => {
        e.target.setStyle({
          fillOpacity: 1
        });
      },
      mouseout: (e) => {
        e.target.setStyle({
          fillOpacity: 0.8
        });
      }
    });
  }

  function handleRandomArt() {
    const randomIndex = Math.floor(Math.random() * artworks.length);
    const randomArtwork = artworks[randomIndex];

    return randomArtwork && (
      <DisplayArtwork
        artwork={randomArtwork}
        setShowArt={setShowArt}
      />
    );
  }

  function handleSliderChange(event, value) {
    event.preventDefault();
    dateAfter.current = value;
    setParams({
      ...params
    });
  }

  useEffect(() => {
    setArtworks([]);
  }, [dateAfter.current]);

  return (
    <>
      <div className="filter-info">
        <h1>{countryName},</h1>
        <h1>{dateAfter.current}s</h1>
      </div>
      <MapContainer
        className="our-map"
        zoom={2.25}
        center={[45, 0]}
        minZoom={2.25}
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
        min={0}
        max={1900}
        step={100}
        marks={sliderMarks}
        classes={sliderStyles()}
        valueLabelDisplay="auto"
        value={dateAfter.current}
        onChange={handleSliderChange}
      />
    </>
  );
}

export default Map;