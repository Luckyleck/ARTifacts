import { useState, useEffect } from "react";
import { Slider } from '@material-ui/core';
import { geoJsonStyle, maxBounds, sliderMarks, sliderStyles } from "./MapFunctions";
import { MapContainer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'
import "./Map.css";
import countries from '../../data/countries.geo.json';
import ArtworkDisplayModal from "../ArtworkDisplay/Modal";

export default function Map() {
  const [artworks, setArtworks] = useState([]);
  const [century, setCentury] = useState([0, 99]);
  const [modalShouldBeOpen, setModalShouldBeOpen] = useState(false);

  useEffect(() => {
    setModalShouldBeOpen(true);
  }, [artworks]);

  function handleCountryClick(country) {
    const url = "https://openaccess-api.clevelandart.org/api/artworks";
    const params = { skip: 0, has_image: 1 };

    fetch(`${url}?${new URLSearchParams(params)}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const filtered = [];
        data.data.forEach((artwork) => {
          if (artwork?.culture[0]?.toLowerCase().includes(country?.toLowerCase())) {
            filtered.push(artwork);
          }
        });
        setArtworks(filtered);
      })
      .catch((error) => {
        console.error("ERROR getting artwork data", error);
      })
    ;
  }

  function ArtworkDisplay() {
    const timeFiltered = [];

    artworks.forEach((artwork) => {
      const artworkYear = (artwork?.creation_date_earliest + artwork?.creation_date_latest) / 2;
      if (century[0]) {
        if (century[0] <= artworkYear && artworkYear <= century[1]) timeFiltered.push(artwork);
      } else {
        timeFiltered.push(artwork);
      }
    });

    console.log(timeFiltered);

    const randomIndex = Math.floor(Math.random() * timeFiltered.length);
    const randomArtwork = timeFiltered[randomIndex];

    console.log(randomArtwork);

    return randomArtwork && (
      <ArtworkDisplayModal
        artwork={randomArtwork}
        setModalShouldBeOpen={setModalShouldBeOpen} />
    );
  }

  function onEachCountry(country, layer) {
    const colors = ["green", "yellow", "red", "orange", "purple", "brown"];
    const randomColorIndex = Math.floor(Math.random() * colors.length);
    layer.setStyle({ fillColor: colors[randomColorIndex] });
    
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

  console.log(century);
  
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
      {modalShouldBeOpen && ArtworkDisplay()}
      <Slider
        min={0}
        max={1900}
        step={100}
        marks={sliderMarks}
        classes={sliderStyles()}
        valueLabelDisplay="auto"
        value={century[0]}
        onChange={(e, value) => {
          setCentury([value, value + 99]);
        }}
      />
    </>
  );
}