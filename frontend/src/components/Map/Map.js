import { useState } from "react"
import './Map.css'

function Map() {
    const [clicked, setClicked] = useState(false);
    const [artworks, setArtworks] = useState([]);
    const [country, setCountry] = useState('')

    const handleClick = (option) => {
        debugger
        setCountry(option)
        console.log(country)
        const url = "https://openaccess-api.clevelandart.org/api/artworks";
        const params = {
            q: option,
            skip: 0,
            limit: 10,
            has_image: 1
        };
        
        fetch(`${url}?${new URLSearchParams(params)}`)
        .then(response => response.json())
        .then(data => {
            // console.log(data)
            const filtered = [];
            data.data.forEach(artwork => {
                // console.log(artwork)
                if (artwork.culture[0].toLowerCase().includes(option)) {
                    filtered.push(artwork);
                }
            });
                setArtworks(filtered);
                setClicked(true);
            })
            .catch(error => {
                console.error("ERROR getting artwork data", error);
            });
        }
        
        // console.log(artworks)
    return (
        <>
            <div className="test-wrapper">
                <button onClick={() => handleClick('spain')}>Spain</button>
                <button onClick={() => handleClick('china')}>China</button>
                <button onClick={() => handleClick('germany')}>Germany</button>
                {clicked && artworks.map((artwork, index) => (
                    <div key={index}>
                        {/* <h2>{artwork.wall_description}</h2> */}
                        <h2>{artwork.culture}</h2>
                        {/* <h2>{artwork.tombstone}</h2> */}
                        <img src={artwork.images.web.url} alt={artwork.title} />
                    </div>
                ))}
            </div>
        </>
    )
}

export default Map