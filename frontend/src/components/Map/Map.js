import { useState, useEffect } from "react";
import Slider, { Range } from 'rc-slider';
import "./Map.css";

function Map() {
  const [clicked, setClicked] = useState(false);
  const [artworks, setArtworks] = useState([]);
  const [country, setCountry] = useState("");
  const [createdAfter, setCreatedAfter] = useState("");
  const [createdBefore, setCreatedBefore] = useState("");

  function formattedYear(year) {
    let newYear;

    if (year.length === 4) {
      newYear = parseInt(year + 99).toString().slice(0, 2) + "99"
    } else {
      newYear = parseInt(year + 99).toString().slice(0, 1) + "99"
    }

    return newYear
  }

  function handleClick(option) {
    const url = "https://openaccess-api.clevelandart.org/api/artworks";
    let params = {
      q: option,
      skip: 0,
      limit: 500,
      has_image: 1,
    };
    if (createdAfter) {
      params = {
        ...params,
        created_after: createdAfter,
        created_before: formattedYear(createdAfter)
      };
    }

    fetch(`${url}?${new URLSearchParams(params)}`)
      .then((response) => response.json())
      .then((data) => {
        const filtered = [];
        data.data.forEach((artwork) => {
          if (createdAfter) {
            if (
              artwork.culture[0]?.toLowerCase().includes(option.toLowerCase()) &&
              createdAfter
            ) {
              filtered.push(artwork);
            }
          } else {
            if (
              artwork.culture[0]?.toLowerCase().includes(option.toLowerCase())
            ) {
              filtered.push(artwork)
            }
          }
        });
        setArtworks(filtered);
        setClicked(true);
      })
      .catch((error) => {
        console.error("ERROR getting artwork data", error);
      });
  }

  function handleRandomImage() {
    const randomIndex = Math.floor(Math.random() * artworks.length);
    const randomArtwork = artworks[randomIndex];
    console.log(randomArtwork)
    return (
      <div>
        <h2>{randomArtwork?.culture}</h2>
        <img src={randomArtwork?.images.web.url} alt={randomArtwork?.title} />
        {console.log(randomArtwork)}
      </div>
    );
  }

  useEffect(() => {
    setArtworks([]);
  }, [country, createdAfter]);

  return (
    <>
      <div className="test-wrapper">
        <input type="text" onChange={(e) => setCountry(e.target.value)} />
        <select onChange={(e) => 
          {setCreatedAfter(e.target.value);
          setCreatedBefore(parseInt(e.target.value + 99))}
        }>
          <option value="">All Time</option>
          <option value="500">500s</option>
          <option value="600">600s</option>
          <option value="700">700s</option>
          <option value="800">800s</option>
          <option value="900">900s</option>
          <option value="1000">1000s</option>
          <option value="1100">1100s</option>
          <option value="1200">1200s</option>
          <option value="1300">1300s</option>
          <option value="1400">1400s</option>
          <option value="1500">1500s</option>
          <option value="1600">1600s</option>
          <option value="1700">1700s</option>
          <option value="1800">1800s</option>
          <option value="1900">1900s</option>
        </select>
        <button onClick={() => handleClick(country)}>search</button>
        {clicked && handleRandomImage()}
      </div>
    </>
  );
}

export default Map;