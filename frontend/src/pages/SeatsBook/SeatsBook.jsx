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
  const item = props.dataMovie;
  const seats = props.seats;
  const MovieID = location.pathname.split("/")[3];
  const timeBooked = location.pathname.split("/")[4];
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
          <br />
          <p>
            <span>tài khoản : </span>
            <span>{username}</span>
          </p>
          <p>
            <span>Thời gian xem : </span>
            <span>{timeBooked}</span>
          </p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button>Submit</Button>
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
    console.log(array.current);

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

  useEffect(() => {
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
              style={{ backgroundColor: `${ref.current}` }}
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
      />
    </div>
  );
};

export default SeatsBook;
