import React from 'react';
import { MapContainer, GeoJSON, LayersControl } from 'react-leaflet';
import L from 'leaflet';
import countries from '../../data/countries.geo.json'

import "leaflet/dist/leaflet.css";
import "./WorldMap.css"


function WorldMap() {

    function style() {
        return {
            fillOpacity: 0.8,
            color: "black",
            weight: 2
        }
    }

    function handleClick(countryName) {

    }

    function onEachCountry(country, layer) {
        const countryName = country.properties.ADMIN
        console.log(countryName)
        layer.bindPopup(countryName);

        const colors = ["green", "yellow", "red", "orange", "purple", "brown"]
        const randomColorIndex = Math.floor(Math.random() * colors.length)

        layer.setStyle({ fillColor: colors[randomColorIndex] })

        layer.on({
            click: () => {
                handleClick(country.properties.ADMIN)
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
    return (
        <MapContainer className='our-map' zoom={3} center={[0, 0]} minZoom={2}>
            <GeoJSON
                data={countries.features}
                style={style}
                onEachFeature={onEachCountry}
            />
        </MapContainer>
    )
}

export default WorldMap;



// 
//  