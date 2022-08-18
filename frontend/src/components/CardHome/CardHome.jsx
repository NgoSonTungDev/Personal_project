import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./CardHome.scss";

const CardHome = ({ dataCard }) => {
  const navigation = useNavigate();
  var today = new Date();
  var timeHours = today.getHours();
  var timeMinutes = today.getMinutes();

  const handleCheckButton = (item, indexOption) => {
    var hours = item.split(":")[0];
    var minute = item.split(":")[1];
    if (timeHours < hours && timeMinutes < minute) {
      handleMove(item);
    } else {
      alert("Phim này đã được chiếu ở thời gian này !!!");
    }
  };

  const handleMove = (time) => {
    navigation(`/home-page-ticket-movie/${dataCard._id}/${time}`);
  };

  return (
    <div>
      <div
        className="container_card_home"
        // onClick={handleMove}
      >
        <div className="container_card_home_img">
          <img src={dataCard.image} alt="" />
        </div>
        <div className="container_card_home_contact">
          <div className="container_card_home_contact_name">
            <p>{dataCard.namemovie}</p>
          </div>

          <div className="container_card_home_contact_detail">
            <span className="text_itro">Đạo diễn : </span>{" "}
            <span>{dataCard.author}</span>
          </div>

          <div className="container_card_home_contact_detail">
            <span className="text_itro">Ngày phát hành : </span>{" "}
            <span>{dataCard.releasedate}</span>
          </div>

          <div className="container_card_home_contact_detail">
            <span className="text_itro">Thể loại : </span>{" "}
            <span>{dataCard.Category}</span>
          </div>

          <div className="container_card_home_contact_detail">
            <span className="text_itro">Thời gian : </span>{" "}
            {dataCard.showtime.map((item, index) => (
              <span
                key={index}
                className="text_itro_time"
                onClick={() => handleCheckButton(item, index)}
              >
                {item}
              </span>
            ))}
          </div>

          <div className="container_card_home_contact_detail">
            <span className="text_itro">Giá tiền : </span>{" "}
            <span className="text_itro_price">{dataCard.price}</span>/người
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardHome;
