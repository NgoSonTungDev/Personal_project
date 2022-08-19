import axios from "axios";
import React, { useEffect, useState } from "react";
import "./IntroduceMovie.scss";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import CommentMovie from "../../components/Comment/Comment";
import FooterMovie from "../../components/Footer/Footer";
import Toast from "react-bootstrap/Toast";
import LoginHome from "../../components/Login/Login";


const IntroduceMovie = () => {
  const [data, setData] = useState([]);
  const [datacmt, setDatacmt] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);
  const idMovie = location.pathname.split("/")[2];
  const timeBooked = location.pathname.split("/")[3];
  const IdUser = localStorage.getItem("IdUser");
  const username = localStorage.getItem("username");
  const admin = localStorage.getItem("admin");

  const handleAddToCart = () => {
    if (admin === "true") {
      alert("admin không có giỏ hàng");
    } else {
      if (username) {
        axios
          .post("http://localhost:5000/api/cart/addToCart", {
            movieID: idMovie,
            nameMovie: data.namemovie,
            price: data.price,
            showtime: timeBooked,
            author: data.author,
            Category: data.Category,
            AccountUSer: IdUser,
          })
          .then(function (response) {
            setShow(true);
            setMessage("Đã thêm vào giỏ của bạn thành công 😍");
          })
          .catch(function (error) {
            console.log("LOI : ", error);
            setShow(true);
            setMessage("Lỗi gì đó mất rồi 😢");
          });
      } else {
        alert("Bạn cần đăng nhập !");
        navigate("/page-login-ticket-movie");
      }
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    axios
      .get(`http://localhost:5000/api/movie/${idMovie}`)
      .then(function (response) {
        setData(response.data);
        setDatacmt(response.data.commment);
      })
      .catch(function (error) {
        console.log("lỗi :", error);
      });
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container_introduce_main">
        <div className="comtainer_Introduce_Movie">
          <div className="comtainer_Introduce_Movie_image">
            <img src={data.background} alt="" />
          </div>

          <div className="comtainer_Introduce_Movie_title">
            <p>Thông tin phim</p>
          </div>

          <div className="comtainer_Introduce_Movie_if">
            <div className="comtainer_Introduce_Movie_if_1">
              <img src={data.image} alt="" />
            </div>
            <div className="comtainer_Introduce_Movie_if_2">
              <table>
                <tr>
                  <td className="tableTitle">Tên Phim : </td>
                  <td className="tableTilleName">{data.namemovie}</td>
                </tr>
                <tr>
                  <td className="tableTitle">Ngày phát hành : </td>
                  <td className="tableTilleintro">{data.releasedate}</td>
                </tr>
                <tr>
                  <td className="tableTitle">Đạo Diễn : </td>
                  <td className="tableTilleintro">{data.author}</td>
                </tr>{" "}
                <tr>
                  <td className="tableTitle">Thời lượng : </td>
                  <td className="tableTilleintro">{data.time}</td>
                </tr>{" "}
                <tr>
                  <td className="tableTitle">thể loại : </td>
                  <td className="tableTilleintro">{data.Category}</td>
                </tr>{" "}
                <tr>
                  <td className="tableTitle">thời gian hiệu lực : </td>
                  <td className="tableTilleintro">{timeBooked}</td>
                </tr>
                <tr>
                  <td className="tableTitle">Giá vé : </td>
                  <td className="tableTilleprice">{data.price} VNĐ</td>
                </tr>
                <tr>
                  <td className="tableTitle">Số ghế còn lại : </td>
                  <td className="tableTilleseats">{data.seats}</td>
                </tr>
                <tr>
                  <td className="tableTitle">
                    <button className="btn1" onClick={handleAddToCart}>
                      {" "}
                      <i class="bx bx-cart-add"></i> Thêm vào giỏ
                    </button>{" "}
                  </td>
                  <td className="tableTitle">
                    <button
                      className="btn2"
                      onClick={() => {
                        if (admin === "true") {
                          alert("admin không có có quyền mua");
                        } else {
                          if (username) {
                            navigate(`/home-page-ticket-movie/SeatsBook/${idMovie}/${timeBooked}`);
                          } else {
                            navigate("/page-login-ticket-movie");
                            alert("Bạn cần đăng nhập !");
                          }
                        }
                      }}
                    >
                      {" "}
                      <i className="bx bx-movie"></i> Đặt vé
                    </button>
                  </td>
                </tr>
              </table>
            </div>
          </div>

          <div className="comtainer_Introduce_Movie_title">
            <p>Giới Thiệu phim</p>
          </div>

          <div className="comtainer_Introduce_Movie_content">
            {data.introduce}
          </div>

          <div className="comtainer_Introduce_Movie_title">
            <p>Bình Luận</p>
          </div>

          <div className="comtainer_Introduce_Movie_commet">
            <CommentMovie datacmt={datacmt} idMovie={idMovie} />
          </div>
        </div>
      </div>
      <LoginHome />
      <FooterMovie />
      <Toast
        onClose={() => setShow(false)}
        show={show}
        delay={3000}
        autohide
        className="toastCMT"
      >
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
          <strong className="me-auto">MOVIE TICKET</strong>
          <small>1 mins ago</small>
        </Toast.Header>
        <Toast.Body>{message}</Toast.Body>
      </Toast>
    </div>
  );
};

export default IntroduceMovie;
