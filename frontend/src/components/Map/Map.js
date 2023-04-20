import { useState } from "react";
import { MapContainer, GeoJSON } from 'react-leaflet';
import countries from '../../data/countries.geo.json';
import "./Map.css";
import { Slider } from '@material-ui/core';
import { geoJsonStyle, maxBounds, sliderMarks, sliderStyles } from "./MapFunctions";
import ArtworkDisplayModal from "../ArtworkDisplay/Modal";
import 'leaflet/dist/leaflet.css'

export default function Map() {
  const [artworks, setArtworks] = useState([]);
  const [century, setCentury] = useState([0, 99]);
  const [modalShouldBeOpen, setModalShouldBeOpen] = useState(false);

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

    const randomIndex = Math.floor(Math.random() * artworks.length);
    const randomArtwork = artworks[randomIndex];

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
        onChange={(e) => {
          setCentury([e.target.value, e.target.value + 99]);
          setModalShouldBeOpen(true);
        }}
      />
    </>
  );
}