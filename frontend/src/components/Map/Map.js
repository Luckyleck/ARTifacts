import { useState } from "react"
import './Map.css'

function Map() {
    const [clicked, setClicked] = useState(false);
    const [artworks, setArtworks] = useState([]);
    const [country, setCountry] = useState('')
    const [type, setType] = useState('')

    const handleClick = (option) => {
        // debugger
        // setCountry(option)
        console.log(country)
        const url = "https://openaccess-api.clevelandart.org/api/artworks";
        const params = {
            q: option,
            skip: 0,
            limit: 50,
            has_image: 1,
        };
        
        fetch(`${url}?${new URLSearchParams(params)}`)
        .then(response => response.json())
        .then(data => {
            // console.log(data)
            const filtered = [];
            data.data.forEach(artwork => {
                console.log(artwork)
                if (artwork.culture[0].toLowerCase().includes(option.toLowerCase())) {
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
                <input type="text" onChange={(e) => setCountry(e.target.value)}/>
                {/* <input type="radio" value="Painting" /> */}
                <button onClick={() => handleClick(country)}>search</button>
                {/* <button onClick={() => handleClick('spain')}>Spain</button>
                <button onClick={() => handleClick('china')}>China</button>
                <button onClick={() => handleClick('germany')}>Germany</button> */}
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

// import { useState } from "react"
// import './Map.css'

// function Map() {
//     const [clicked, setClicked] = useState(false);
//     const [artworks, setArtworks] = useState([]);
//     const [country, setCountry] = useState('')
//     const [type, setType] = useState('')

//     const handleClick = () => {
//         const url = "https://openaccess-api.clevelandart.org/api/artworks";
//         const params = {
//             q: country,
//             skip: 0,
//             limit: 50,
//             has_image: 1,
//             type: type
//         };
        
//         fetch(`${url}?${new URLSearchParams(params)}`)
//         .then(response => response.json())
//         .then(data => {
//             const filtered = [];
//             data.data.forEach(artwork => {
//                 if (artwork.culture[0].toLowerCase().includes(country.toLowerCase())) {
//                     filtered.push(artwork);
//                 }
//             });
//                 setArtworks(filtered);
//                 setClicked(true);
//             })
//             .catch(error => {
//                 console.error("ERROR getting artwork data", error);
//             });
//         }
        
//     return (
//         <>
//             <div className="test-wrapper">
//                 <input type="text" onChange={(e) => setCountry(e.target.value)}/>
//                 <label>
//                   Painting
//                   <input type="radio" value="painting" checked={type === "painting"} onChange={(e) => setType(e.target.value)} />
//                 </label>
//                 <label>
//                   Photograph
//                   <input type="radio" value="photograph" checked={type === "photograph"} onChange={(e) => setType(e.target.value)} />
//                 </label>
//                 <label>
//                   Sculpture
//                   <input type="radio" value="sculpture" checked={type === "sculpture"} onChange={(e) => setType(e.target.value)} />
//                 </label>
//                 <button onClick={handleClick}>search</button>
//                 {clicked && artworks.map((artwork, index) => (
//                     <div key={index}>
//                         <h2>{artwork.culture}</h2>
//                         <img src={artwork.images.web.url} alt={artwork.title} />
//                     </div>
//                 ))}
//             </div>
//         </>
//     )
// }

// export default Map
