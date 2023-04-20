import { useState } from "react";
import { MapContainer, GeoJSON } from 'react-leaflet';
import countries from '../../data/countries.geo.json';
import "./Map.css";
import FavoriteButton from '../ProfilePage/Buttons/FavoriteButton';




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

  function ArtworkDisplayModal() {
    const timeFiltered = []

    artworks.forEach((artwork) => {
      const artworkYear = (artwork?.creation_date_earliest + artwork?.creation_date_latest) / 2;
      if (century[0]) {
        if (century[0] <= artworkYear && artworkYear <= century[1]) timeFiltered.push(artwork);
      } else {
        timeFiltered.push(artwork);
      }
    });

    const randomIndex = Math.floor(Math.random() * timeFiltered?.length);
    const randomArtwork = timeFiltered?.[randomIndex];

    return randomArtwork && (
      <div className="art-display-container">
        <FavoriteButton artwork={randomArtwork} />
        <h2>{randomArtwork?.culture}</h2>
        <button onClick={() => setModalShouldBeOpen(false)}>&times;</button> 
        <img src={randomArtwork?.images.web.url} alt={randomArtwork?.title} id='fetched-image'/>
      </div>
    );
  }

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
      <input
        type="number"
        min="0"
        max="1900"
        step="100"
        value={century[0]}
        onChange={(e) => {
          setCentury([parseInt(e.target.value), parseInt(e.target.value) + 99]);
          setModalShouldBeOpen(true);
        }}
      />
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
      {modalShouldBeOpen && ArtworkDisplayModal()}
    </>
  );
}