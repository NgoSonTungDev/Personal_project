import React, { useEffect, useState ,useRef} from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./SeatsBook.scss";
import { useLocation, useNavigate } from "react-router-dom";
import FooterMovie from "../../components/Footer/Footer";
import axios from "axios";
import dataSeat from "../../asset/seat";

const SeatsBook = () => {
  const location = useLocation();
  const [data, setData] = useState([]);
  const [check, setCheck] = useState(false);
  const MovieID = location.pathname.split("/")[3];
  const timeBooked = location.pathname.split("/")[4];
  
  const color = useRef("#fff");
  const value = color.current
  const handleCheckBooking = () => {
    value.current("#000")
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
          {dataSeat.map((item) => (
            <div
              className="container_booking_seat_booking_box"
              style={{ backgroundColor: `${color}` }}
              onClick={() => {
                handleCheckBooking();
                console.log(item);
              }}
            >
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SeatsBook;
