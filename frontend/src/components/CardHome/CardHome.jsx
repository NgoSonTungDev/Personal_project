import React from "react";
import { useNavigate } from "react-router-dom";
import "./CardHome.scss";

const CardHome = ({ dataCard }) => {
  const navigation = useNavigate();

  const handleMove = () => {
    navigation(`/home-page-ticket-movie/${dataCard._id}`);
  };
  
  return (
    <div>
      <div className="container_card_home" onClick={handleMove}>
        <div className="container_card_home_price">
          <p>{dataCard.price} VND</p>
        </div>
        <div className="container_card_home_time">
          <p>{dataCard.showtime}</p>
        </div>
        <div className="container_card_home_img">
          <img src={dataCard.image} alt="" />
        </div>
        <div className="container_card_home_name">
          <p>{dataCard.namemovie}</p>
        </div>
      </div>
    </div>
  );
};

export default CardHome;
