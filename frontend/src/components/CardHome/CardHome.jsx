import React from "react";
import { useNavigate } from "react-router-dom";
import "./CardHome.scss";

const CardHome = ({ dataCard }) => {
  const navigation = useNavigate();

  // const handleMove = () => {
  //   navigation(`/home-page-ticket-movie/${dataCard._id}`);
  // };

  return (
    <div>
      <div
        className="container_card_home"
        // onClick={handleMove}
      >
        <div className="container_card_home_img">
          <img
            src="https://www.cgv.vn/media/catalog/product/cache/1/image/c5f0a1eff4c394a251036189ccddaacd/r/s/rsz_conan_movie_2022-_vnese_poster_1_.jpg"
            alt=""
          />
        </div>
        <div className="container_card_home_contact">
          <div className="container_card_home_contact_name">
            <p>
              Detective Conan: The Bride of Halloween - Thám Tử Lừng Danh Conan:
              Nàng Dâu Halloween
            </p>
          </div>

          <div className="container_card_home_contact_detail">
            <span className="text_itro">Đạo diễn : </span>{" "}
            <span>Ngô Son Tung</span>
          </div>

          <div className="container_card_home_contact_detail">
            <span className="text_itro">Ngày phát hành : </span>{" "}
            <span>22/10/2000</span>
          </div>

          <div className="container_card_home_contact_detail">
            <span className="text_itro">Thể loại : </span>{" "}
            <span>Hành động</span>
          </div>

          <div className="container_card_home_contact_detail">
            <span className="text_itro">Thời gian : </span>{" "}
            <span className="text_itro_time">9:30</span>
            <span className="text_itro_time">9:30</span>
            <span className="text_itro_time">9:30</span>
            <span className="text_itro_time">9:30</span>
            <span className="text_itro_time">9:30</span>

          </div>

          <div className="container_card_home_contact_detail">
            <span className="text_itro">Giá tiền : </span>{" "}
            <span className="text_itro_price">78000</span>/người
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardHome;
