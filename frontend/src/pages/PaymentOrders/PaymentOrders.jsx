import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./PaymentOrders.scss";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const PaymentOrders = () => {
  const [data, setdata] = useState({});
  const [number, setNumber] = useState("");
  const [date, setDate] = useState("");
  const [Name, setName] = useState("");
  const [mesage, setMesage] = useState("thanh toán");
  const [Check, setCheck] = useState(0);
  const location = useLocation();
  const id = location.pathname.split("/payment-orders/")[1];
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigation = useNavigate();
  const username = localStorage.getItem("username");
  const idmovie = data.idmovie;

  const updateStatusOrder = () => {
    axios
      .put(`http://localhost:5000/api/Historybought/${id}`, {
        status: "Thành Công",
      })
      .then(function (response) {})
      .catch(function (error) {});
  };

  const checkInput = () => {
    setCheck(1);
    setMesage("thanh toán");
    if (number === "" || date === "" || Name === "") {
      alert("Vui lòng điền đầy đủ thông tin");
    } else {
      handleShow();
    }
  };

  const cancelPay = () => {
    setCheck(2);
    setMesage("hủy");
    handleShow();
  };

  const handleOpenModal = () => {
    var loader = document.querySelector(".loader-payments");
    var text = document.getElementById("PAYING");
    loader.style.display = "block";
    setShow(false);
    axios
      .get(`http://localhost:5000/api/movie/${idmovie}`)
      .then(function (response) {
        updateStatusOrder();
        ///////////////
        axios
          .put(`http://localhost:5000/api/movie/${idmovie}`, {
            seats: response.data.seats - data.amount,
          })
          .then(function (response) {})
          .catch(function (error) {});
        //////////////////
        axios
          .post("http://localhost:5000/api/TotalOrder/addToOrder", {
            nameAccount: username,
            nameMovie: data.nameMovie,
            amount: data.amount,
            price: data.price,
            total: data.total,
          })
          .then(function (response) {})
          .catch(function (error) {});
        /////////////////
        setTimeout(() => {
          text.innerHTML = "Thanh Toán Thành Công";
          setTimeout(() => {
            loader.style.display = "none";
            text.innerHTML = "Đang Thanh Toán . . .";
            navigation("/home-page-ticket-movie");
          }, 1000);
        }, 2000);
      })
      .catch(function (error) {
        setTimeout(() => {
          text.innerHTML = "Không Thành Công";
          setTimeout(() => {
            loader.style.display = "none";
            text.innerHTML = "Đang Thanh Toán . . .";
          }, 1000);
        }, 2000);
        console.log("lỗi :", error);
      });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/Historybought/${id}`)
      .then(function (response) {
        setdata(response.data);
      })
      .catch(function (error) {
        console.log("lỗi :", error);
      });
  }, []);

  return (
    <div className="paymentOrders-container">
      <Navbar />
      <div className="loader-payments">
        <div className="loader-payments_two">
          <span className="loader"></span>
          <span id="PAYING">Đang Thanh Toán . . .</span>
        </div>
      </div>
      <div className="logo">
        <div className="image">
          <img
            src="https://scontent.fdad3-4.fna.fbcdn.net/v/t39.30808-6/202166185_2021396718013233_8499389898242103910_n.png?_nc_cat=107&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=5RWucEqFyZIAX-PnnMp&tn=n_EjDZZd3MYH0EVt&_nc_ht=scontent.fdad3-4.fna&oh=00_AT-jPfY8pIoXWpbJSm9X9OsnqhPia-wjZu_gKPVgVq1fjw&oe=62D595A9"
            alt=""
          />
        </div>
        <div className="flag">
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOYAAACZCAMAAAAMwLadAAAAclBMVEXaJR3//wDztgrtkg7qhBD//QDvoQ3bKxz86gP65ATiURf53gT52gX2ywfdNxv99AHwqAziVxbhSxjsjg/41gXfQxn30Qb1xwjodRLumQ7cMxv++QHyrwvncBP98ALkYRXpgBHlZxT1wQjunQ3zugnmbBRmEZDwAAADBUlEQVR4nO3a6XaCQAwFYAd3tO47blX7/q9YkSrb6IASMqH3+23PyT3NYWCSWg0AAAAAAAAAAAAAAAAACtVuc1dQiu9v7gpKsd1yV1CG9n7/H7r2oNSBu4YSjJQacddQgo5SHe4a6I3V1Zi7CnItP2aLuwpyXT9m5bv21rPV79pzEPPMXQexbhCzy10HLVf9cbkrIbW+x1xzV0Kqd4/Z466E0kQ9TLhrIVQPY9a5ayHUD2P2uWuhM1fqP3TtNBpzyl0NmVk05oy7GiqxnlVqzl0PkWk8ZoO7HiKLeMwFdz00Biqhml3bSMasZtd+JWN+cVdEYdBMxmwOuGsicEymVOrIXROBZTrmkrum4qV7VmLXuo5B6gF0ewiZ/sq6uxS3q8vxma6F95wbp+iUlw13Jq3VsMiQnrVvD5OZufqs+hZ/drfXmufpW0Z2T7QPnSJC7q3fwhicPk+5lHCeNrzPQjaF3G26PXOW52w8LPU22/dTOnYelnq7/Xshh0fuyvOZa99hTRby7k3q+Y/Qlt2HpV7eI7QjdPkr3xEq4rDUy36ESjks9SZ9c0Jfz7rv53zarSwptxKfPXE741focMddYxGMD9xKrLaNzT0r5i32hbM5ZhVW2zLc+FVgtc01p6zCatvaHLIKq22ZPrHFr7ZNzBl9Ft9WZlI3R/SJfqOtxdbXXhG+2jY3J6xC107NAQOyV9s0QxWvoRspiV5t0/SsPwLSjZTkXXaF0j0bjIA0IyVrx3wZJNbXIiOg1H2Y4NW25Ppa9FYrdR8mt2vj62vJW63EfZjcro3dvKdHQPGRktjVttgqkG4EFBspyVsS+hNZX3s2AoqOlJ78xHrh+trzEVBkpCR0tS3s2ZcjoMdISWjX3nvWNAJ6HKGrcuoq2Cl9WOrdj9BTGVUVbePpDku94AhtSprH3638yrOOgIKRksSuvag8I6DbSOlCWQ+Na88Oc/13fvbKk9e1u9z7EtcjVN5ozHljX6LuEBRC6615gfwhAwAAAAAAAAAAAAAAAAAAAACADX4B/Swcmld280IAAAAASUVORK5CYII="
            alt=""
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Flag_of_the_United_States_%28Pantone%29.svg/285px-Flag_of_the_United_States_%28Pantone%29.svg.png"
            alt=""
          />
        </div>
      </div>
      <div className="paymentOrders-main">
        <div className="paymentOrders-content">
          <p>
            Quý khách vui lòng không tắt trình duyệt cho đến khi nhận được kết
            quả giao dịch trên website. Xin cảm ơn!
          </p>
          <span style={{ fontSize: "25px", paddingTop: "10px" }}>
            Thanh toán qua ngân hàng NCB
          </span>
          <div>
            <span style={{ fontSize: "17px" }}>Thanh toán trực tuyến</span>
            <br />
            <span style={{ fontSize: "25px", fontWeight: "700" }}>
              {data.price} VND
            </span>
          </div>
          <div className="paymentOrders-input">
            <input
              type="number"
              min={0}
              placeholder="Số thẻ"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
            />
            <br />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <br />
            <input
              type="text"
              placeholder="Tên chủ thẻ"
              value={Name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <label className="lable-text">
            Điều kiện sử dụng dịch vụ
            <i class="fa-solid fa-circle-question"></i>
          </label>
          <div className="paymentOrders-button">
            <button onClick={checkInput}>XÁC THỰC</button>
            <i>Hoặc</i>
            <button onClick={cancelPay}>HỦY</button>
          </div>
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>THÔNG BÁO</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn chắc chắn muốn {mesage} không ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Hủy
          </Button>
          {Check === 1 ? (
            <Button variant="primary" onClick={handleOpenModal}>
              Xác nhận
            </Button>
          ) : (
            <Button
              variant="primary"
              onClick={() => {
                navigation("/home-page-ticket-movie");
              }}
            >
              Xác nhận
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PaymentOrders;
