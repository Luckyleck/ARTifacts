import "./MainPage.css";
import logo from "./assets/ART_white.png";
import images from "./index.js";
import loadingLogo from "../NavBar/assets/ART.png";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";

const MainPage = () => {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadImages = images.map((src) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = src;
        img.onload = resolve;
      });
    });

    Promise.all(loadImages).then(() => {
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    });
  }, []);

  return (
    <>
      {isLoading ? (
        <>
          <div className="reveal" />
          <div className="preloader">
            <img src={loadingLogo} alt="logo" />
          </div>
        </>
      ) : (
        <div className="main-content">
          <div className="image-container">
            {images.map((image, index) => (
              <img
                key={`artwork ${index}`}
                src={image}
                alt={`artwork ${index}`}
                className={`animated-image ${!isLoading ? "loaded" : ""}`}
              />
            ))}
          </div>

          <div onClick={() => history.push("/explore")} className="explore">
            <img src={logo} alt="logo" />
            <p>CLICK HERE TO ENTER</p>
          </div>
        </div>
      )}
    </>
  );
};

export default MainPage;
