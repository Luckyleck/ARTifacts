// Functions that are called in 'Map.js'
import { makeStyles } from '@material-ui/core/styles';

export function geoJsonStyle() {
    return {
        fillOpacity: 0.8,
        color: "black",
        weight: 2
    }
}

export function maxBounds() {
    return [
        [-120, -210],
        [110, 210]
    ]
}

export function randomColor() {
    const colors = ["green", "yellow", "red", "orange", "purple"]
    const randomColorIndex = Math.floor(Math.random() * colors.length)

    return colors[randomColorIndex]
}

// Slider Styling

export const sliderStyles = makeStyles({
    root: {
        // color: 'green',
        width: '80%',
        left: '50%',
        bottom: '8vh', // Adjust as needed
        transform: 'translateX(-50%)',
        zIndex: 1000,
        padding: 0,
    },
    rail: {
        height: 20, // increase the height of the rail
        width: '100.5%'
        // opacity: 1,
        // borderRadius: '10px'
    },
    track: {
        height: 20,
    },
    mark: { // The tick on the rail
        width: '4px',
        height: '600%',
        borderRadius: 40
    },
    markLabel: {
        fontSize: '150%'
    }

});


export const sliderMarks = [
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
    { value: 1900, label: '1900s' },
];

// export function filterCountrySize(countriesData) {
//     const filteredCountries = countriesData.filter((country) => {
//         return country.properties.POPULATION > 1000000;
//     });
//     return {
//         type: "FeatureCollection",
//         features: filteredCountries
//     };
// }




