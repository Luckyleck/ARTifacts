import { useState, useEffect } from "react";
import { Slider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { MapContainer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'
import "./Map.css";
import countries from '../../data/countries.geo.json';
import DisplayArtwork from '../DisplayArtwork/DisplayArtwork';
// import ArtworkDisplayModal from '../ArtworkDisplay/Modal';

export default function BackupMap() {
  const [artworks, setArtworks] = useState([]);
  const [century, setCentury] = useState([0, 99]);
  const [modalShouldBeOpen, setModalShouldBeOpen] = useState(false);

  useEffect(() => {
    setModalShouldBeOpen(true);
  }, [artworks]);

  function handleCountryClick(country) {
    const url = "https://openaccess-api.clevelandart.org/api/artworks";
    const params = { skip: 0, has_image: 1, q: country };

    fetch(`${url}?${new URLSearchParams(params)}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const filtered = [];
        data.data.forEach((artwork) => {
          if (artwork.culture[0].toLowerCase().includes(country.toLowerCase())) {
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

    const randomIndex = Math.floor(Math.random() * timeFiltered.length);
    const randomArtwork = timeFiltered[randomIndex];

    return randomArtwork && (
      <DisplayArtwork
        artwork={randomArtwork}
        toggle={setModalShouldBeOpen}
      />
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

  function maxBounds() {
    return [
      [-120, -210],
      [110, 210]
    ];
  }

  function geoJsonStyle() {
    return {
      fillOpacity: 0.8,
      color: "black",
      weight: 2
    };
  }

  const sliderStyles = makeStyles({
    root: {
      width: '80%',
      left: '50%',
      bottom: '3vh',  // Adjust as needed
      transform: 'translateX(-50%)',
      zIndex: 1000,
      padding: 0,
      '& .MuiSlider-track': {
        backgroundColor: 'transparent' // remove the left "filling up" effect by setting the background color to transparent
      },
      '& .MuiSlider-mark': {
        backgroundColor: 'rgba(0, 0, 0, 0.54)' // change this to the desired tick color
      }
    },
    rail: {
      height: 20,     // increase the height of the rail
      width: '100%'
    },
    track: {
      height: 20
    },
    mark: {           // The tick on the rail
      width: '4px',
      height: '600%',
      borderRadius: 40
    },
    markLabel: {
      fontSize: '125%',
      fontWeight: 'bold',
      color: 'grey',
      // textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'
    }
  });

  const sliderMarks = [
    { value: 100, label: '100s' },
    { value: 200, label: '200s' },
    { value: 300, label: '300s' },
    { value: 400, label: '400s' },
    { value: 500, label: '500s' },
    { value: 600, label: '600s' },
    { value: 700, label: '700s' },
    { value: 800, label: '800s' },
    { value: 900, label: '900s' },
    { value: 1000, label: '1000s' },
    { value: 1100, label: '1100s' },
    { value: 1200, label: '1200s' },
    { value: 1300, label: '1300s' },
    { value: 1400, label: '1400s' },
    { value: 1500, label: '1500s' },
    { value: 1600, label: '1600s' },
    { value: 1700, label: '1700s' },
    { value: 1800, label: '1800s' },
    { value: 1900, label: '1900s' }
  ];
  
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