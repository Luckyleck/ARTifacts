import { useState, useEffect } from "react";
import { MapContainer, GeoJSON } from 'react-leaflet';
import { Slider, Typography } from '@material-ui/core';
import "./Map.css";
import 'leaflet/dist/leaflet.css'
import countries from '../../data/countries.geo.json';
import DisplayArtwork from "../DisplayArtwork/DisplayArtwork";
import { geoJsonStyle, maxBounds, randomColor, sliderMarks, sliderStyles } from "./MapFunctions";

export default function Map() {
  const [showArt, setShowArt] = useState([]); // Boolean // Replace later with modal
  const [artworks, setArtworks] = useState([]);
  const [dateAfter, setDateAfter] = useState();
  const dateBefore = dateAfter + 100;
  const [params, setParams] = useState({
    skip: 0,
    limit: 300,
    has_image: 1,
  });

  function handleCountryClick(countryName) {
    const url = "https://openaccess-api.clevelandart.org/api/artworks";

    fetch(`${url}?${new URLSearchParams(params)}`)
      .then((response) => {
        response.json();
      })
      .then((data) => {
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
      })
    ;
  }

  function onEachCountry(country, layer) {
    const countryName = country.properties.ADMIN;

    layer.bindPopup(countryName);
    layer.setStyle({ fillColor: randomColor() });
    layer.on({
      click: () => {
        handleCountryClick(country.properties.ADMIN);
      },
      mouseover: (e) => {
        e.target.setStyle({ fillOpacity: 1 });
      },
      mouseout: (e) => {
        e.target.setStyle({ fillOpacity: 0.5 });
      }
    });
  }

  function handleRandomArt() {
    const randomIndex = Math.floor(Math.random() * artworks.length);
    const randomArtwork = artworks[randomIndex];

    return randomArtwork && <DisplayArtwork artwork={randomArtwork} setShowArt={setShowArt} />
  }

  function handleSliderChange(event, value) {
    setDateAfter(value);
  }

  return (
    <>
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
  );
}