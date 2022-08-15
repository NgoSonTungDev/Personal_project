import axios from "axios";
import React, { useEffect, useState } from "react";
import CardHome from "../../components/CardHome/CardHome";
import CarouselHome from "../../components/Carousel/Carousel";
import FooterMovie from "../../components/Footer/Footer";
import LoginHome from "../../components/Login/Login";
import Navbar from "../../components/Navbar/Navbar";
import "./Home.scss";
import video from "./video.mp4";

const Home = () => {
  const [dataMovie, setDataMovie] = useState([]);
  const [dataMovie2, setDataMovie2] = useState([]);
  const [Search, setSearch] = useState("");

  function onPress_ENTER(event) {
    if (Search === "") {
      setDataMovie(dataMovie2);
    } else {
      setDataMovie(
        dataMovie.filter((item) =>
          item?.namemovie?.toLowerCase()?.includes(Search.toLowerCase())
        )
      );
    }
  }

  useEffect(() => {
    
    axios
      .get("http://localhost:5000/api/movie/all-movie")
      .then(function (response) {
        setDataMovie(response.data.sort((a,b) => b.price - a.price));
        setDataMovie2(response.data);
      })
      .catch(function (error) {
        console.log("lỗi :", error);
      });
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container_home">
        <div className="container_home_text">
          <div className="container_home_text_video">
            <video src={video} autoPlay muted loop></video>
          </div>
          <h1>movie tickets</h1>
        </div>

        <div className="container_home_title">
          <div className="container_home_title_line"></div>
          <div className="container_home_title_text">
            <h1>Featured movies</h1>
          </div>
        </div>

        <div className="container_home_carousel">
          <CarouselHome />
        </div>

        <div className="container_home_title">
          <div className="container_home_title_line"></div>
          <div className="container_home_title_text">
            <h1>Movie Selection</h1>
          </div>
        </div>
        

        <div className="container_home_card">
          <CardHome/>
          {/* {dataMovie.sort().map((item) => (
            <CardHome 
            dataCard={item} 
            />
          ))} */}
        </div>
      </div>
      <LoginHome />
      <FooterMovie />
    </div>
  );
};

export default Home;
