import { useState, useEffect, useRef } from 'react';
import { Slider } from '@material-ui/core';
import { MapContainer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './Map.css';
import countries from '../../data/countries.geo.json';
import DisplayArtwork from '../DisplayArtwork/DisplayArtwork';
import { colors, geoJsonStyle, maxBounds, sliderMarks, sliderStyles } from './MapFunctions';

function Map() {
  const [showArt, setShowArt] = useState(false);
  const [artworks, setArtworks] = useState([]);
  const [randomArtwork, setRandomArtwork] = useState();
  const dateAfter = useRef(1500);
  const [countryName, setCountryName] = useState('');
  const [noArt, setNoArt] = useState(false)
  const [fetchingStatus, setFetchingStatus] = useState(false)
  const [params, setParams] = useState({
    limit: 200,
    has_image: 1
  });

  // console.log(artworks);

  function doFetch(countryName, layer) {
    const url = 'https://openaccess-api.clevelandart.org/api/artworks';
    setFetchingStatus(true)

    const tempParams = {
      ...params,
      q: countryName.toLowerCase(),
    };

    function formatParams(params) {
      let searchString = '';

      for (const [key, value] of Object.entries(params)) {
        searchString += `${key}=${value}&`;
      }

      if (dateAfter.current) {
        searchString += `created_after=${dateAfter.current}&`;
        searchString += `created_before=${dateAfter.current + 99}`;
      }

      return searchString;
    }

    const paramsString = formatParams(tempParams);

    fetch(`${url}?${paramsString}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const filtered = [];
        data.data.forEach((artwork) => {
          if (artwork?.culture[0]?.toLowerCase().includes(countryName.toLowerCase())) {
            filtered.push(artwork);
          }
        });
        setArtworks(filtered);
        setShowArt(true);
        setFetchingStatus(false)
        if (!filtered.length) {
          setNoArt(true);
          setFetchingStatus(false)
        }
      })
      .catch((error) => {
        console.error('ERROR getting artwork data', error);
      })
      ;
  }

  function handleCountryClick(countryName, layer) {
    setNoArt(false)
    setCountryName(countryName);
    doFetch(countryName, layer);
  }

  function onEachCountry(country, layer) {
    const colorIndex = countries.features.findIndex(feature => feature.properties.ADMIN === country.properties.ADMIN);

    layer.setStyle({
      fillColor: colors[colorIndex % colors.length]
    });

    layer.on({
      click: () => {
        handleCountryClick(country.properties.ADMIN, layer);
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

  function handleSliderChange(event, value) {
    event.preventDefault();
    setNoArt(false)
    dateAfter.current = value;
    setParams({
      ...params
    });
    setShowArt(false);
    setRandomArtwork('');
  }

  useEffect(() => {
    setArtworks([]);
    setRandomArtwork('');
  }, [dateAfter]);

  return (
    <>
      <div className='filter-info'>
        {(dateAfter.current > 0) && (
          <>
            <h1>{countryName}{countryName && ','}</h1>
            <h1>{dateAfter.current}s</h1>
          </>
        )}
        {(dateAfter.current === 0) && (
          <h1>{countryName}</h1>
        )}
      </div>
      <MapContainer
        zoom={2.25}
        center={[45, 0]}
        minZoom={2.25}
        maxBounds={maxBounds}
        maxBoundsViscosity={1}
        className='our-map'
      >
        <GeoJSON
          data={countries.features}
          style={geoJsonStyle}
          onEachFeature={onEachCountry}
        />
      </MapContainer>
      {noArt && (
        <div className="no-art show">
          <h1>Sorry, we could not find any artwork from this time.</h1>
        </div>
      )}
      {fetchingStatus && (
        <div className="fetching-art-message">
          <h1>Fetching artwork!</h1>
        </div>
      )}
      {showArt && artworks.length && (
        <DisplayArtwork
          artwork={randomArtwork || artworks[Math.floor(Math.random() * artworks.length)]}
          setShowArt={setShowArt}
          setRandomArtwork={setRandomArtwork}
          randomArtwork={randomArtwork}
          artworks={artworks}
        />
      )}
      <Slider
        min={0}
        max={1900}
        step={100}
        marks={sliderMarks}
        classes={sliderStyles()}
        valueLabelDisplay='auto'
        value={dateAfter.current}
        onChange={handleSliderChange}
      />
    </>
  );
}

export default Map;