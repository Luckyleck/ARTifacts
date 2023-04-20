// Functions that are called in 'Map.js'

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




