import React, { useEffect, useState, useRef } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./SeatsBook.scss";
import { useLocation, useNavigate } from "react-router-dom";
import FooterMovie from "../../components/Footer/Footer";
import axios from "axios";
import dataSeat from "../../asset/seat";

function MyVerticallyCenteredModal(props) {
  const username = localStorage.getItem("username");
  const location = useLocation();
  const navigation = useNavigate();
  const item = props.dataMovie;
  const seats = props.seats;
  const IdUser = localStorage.getItem("IdUser");
  const MovieID = location.pathname.split("/")[3];
  const timeBooked = location.pathname.split("/")[4];
  var today = new Date();
  var date =
    today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear();

  const handlePushHistory = () => {
    var min = 1000;
    var max = 9000;
    var rand = parseInt(min + Math.random() * (max - min));
    const sum = seats.length * item.price;
    axios
      .post("http://localhost:5000/api/Historybought/addToHistory", {
        codeOrders: rand,
        movieID: MovieID,
        nameMovie: item.namemovie,
        price: item.price,
        showtime: timeBooked,
        author: item.author,
        amount: seats.length,
        Category: item.Category,
        total: sum,
        nameUser: username,
        status: "Chờ xác nhận",
        seats: seats,
        AccountUSer: IdUser,
      })
      .then(function (response) {
        props.setModalShow(false);
        alert("Đã đặt thành công 😍");
        setTimeout(() => {
          navigation("/home-page-ticket-movie");
        }, 1000);
      })
      .catch(function (error) {
        alert("Lỗi mất rồi, đặt lại nha 😉");
      });
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title
          id="contained-modal-title-vcenter"
          style={{
            color: "#3498db",
            textTransform: "uppercase",
            fontWeight: "600",
          }}
        >
          Order Information
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="Body_order_information">
        <div className="Body_order_information_img">
          <img src={item.image} alt="" />
        </div>
        <div className="Body_order_information_content">
          <i>{item.namemovie}</i>

          <p style={{ marginTop: "20px" }}>
            <span>tài khoản : </span>
            <span>{username}</span>
          </p>
          <p>
            <span>Thời điểm xem : </span>
            <span>{date}</span>
          </p>
          <p>
            <span>Phòng chiếu : </span>
            <span> Số 6</span>
          </p>
          <p>
            <span>Số lượng : </span>
            <span>{seats.length}</span>
          </p>
          <p>
            <span>Vị trí : </span>
            <span>
              {seats.map((item) => (
                <span style={{ fontWeight: "400" }}> {item} </span>
              ))}
            </span>
          </p>
          <p>
            <span>Thanh Toán : </span>
            <span style={{ fontWeight: "700", color: "#d63031" }}>
              {item.price * seats.length} VNĐ
            </span>
          </p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() => {
            handlePushHistory();
          }}
        >
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

const SeatsBook = () => {
  const location = useLocation();
  const [data, setData] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const MovieID = location.pathname.split("/")[3];
  const timeBooked = location.pathname.split("/")[4];
  const array = useRef([]);
  const ref = useRef([]);

  const handleCheckBooking = (item, indexOption) => {
    ref.current.forEach((e, index) => {
      if (index === indexOption) {
        if (
          ref.current[index].className ===
          "container_booking_seat_booking_box cancel"
        ) {
          ref.current[index].classList.add("accept");
          ref.current[index].classList.remove("cancel");
          array.current.push(item);
        } else {
          ref.current[index].classList.add("cancel");
          ref.current[index].classList.remove("accept");
          array.current = array.current.filter((element) => element !== item);
          // console.log(array.current.filter((element) => element !== item));
          // array.current = [...array.current]
          // console.log("xoa", array.current);
        }
      }
    });
  };

  const handleCloseModal = (e) => {
    setModalShow(e);
  };

  useEffect(() => {
    console.log(data.seatsBooked);
    window.scrollTo(0, 0);
    axios
      .get(`http://localhost:5000/api/movie/${MovieID}`)
      .then(function (response) {
        setData(response.data);
      })
      .catch(function (error) {
        console.log("lỗi :", error);
      });
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container_booking_seat">
        <div className="container_booking_seat_text">
          <h1>Screen</h1>
        </div>

        <div className="container_booking_seat_booking">
          {dataSeat.map((item, index) => (
            <div
              ref={(e) => {
                ref.current[index] = e;
              }}
              key={index}
              className="container_booking_seat_booking_box cancel"
              onClick={() => {
                handleCheckBooking(item, index);
              }}
            >
              <span>{item}</span>
            </div>
          ))}
        </div>

        <button
          className="ButtonSubmit"
          onClick={() => {
            setModalShow(true);

            // if (array.current === []) {
            //   alert("Vui lòng chọn vị trí bạn muốn ngồi !!!");
            // } else {
            //   setModalShow(true);
            // }
          }}
        >
          Submit
        </button>
      </div>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        dataMovie={data}
        seats={array.current}
        setModalShow={handleCloseModal}
      />
    </div>
  );
};

export default SeatsBook;
