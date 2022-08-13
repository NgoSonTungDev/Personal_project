import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./Cart.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { Modal, Button } from "react-bootstrap";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Cart = () => {
  const [data, setData] = useState([]);
  const iduser = localStorage.getItem("IdUser");
  const navigation = useNavigate();
  const [show, setShow] = useState(false);
  const [id, setid] = useState("");
  const [open, setOpen] = React.useState(false);
  const [masage, setmasage] = useState("");
  const [story, setstory] = useState("");

  const handleClick = () => {
    setOpen(true);
  };

  const handleClosetoast = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/user/${iduser}`)
      .then(function (response) {
        setData(response.data.cart);
      })
      .catch(function (error) {
        console.log("lỗi :", error);
      });
  }, []);

  const handleDelete = () => {
    axios
      .delete(`http://localhost:5000/api/cart/${id}`)
      .then(function (response) {
        handleClose();
        handleClick();
        setmasage("Xóa thành công !!!");
        setstory("success");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
      .catch(function (error) {
        handleClick();
        handleClose();
        setmasage("Xóa không được !!!");
        setstory("error");
      });
  };

  return (
    <div>
      <Navbar />
      <div className="container_Cart">
        <div className="container_Cart_text">
          <h2>Giỏ hàng của bạn</h2>
        </div>
        <div className="container_Cart_table" id="AccountManagement_table">
          <table>
            <tr>
              <th>Tên Phim </th>
              <th>Thời gian Chiếu</th>
              <th>Đạo Điễn</th>
              <th>Thể Loại</th>
              <th>Giá</th>
              <th>Chức năng</th>
            </tr>
            {data.map((item) => (
              <tr>
                <td className="namemovie">{item.nameMovie}</td>
                <td>{item.showtime}</td>
                <td>{item.author}</td>
                <td>{item.Category}</td>
                <td>{item.price}</td>
                <td>
                  <button
                    onClick={() => {
                      navigation(`/home-page-ticket-movie/${item.idmovie}`);
                    }}
                  >
                    <i className="bx bx-movie-play"></i>
                    <span>Xem chi tiết</span>
                  </button>

                  <button
                    onClick={() => {
                      handleShow();
                      setid(item._id);
                    }}
                  >
                    <i className="bx bxs-trash"></i> <span>Xóa</span>
                  </button>
                </td>
              </tr>
            ))}
          </table>
        </div>
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>THÔNG BÁO</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn có muốn xóa khỏi giỏ hàng không ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      <Snackbar open={open} autoHideDuration={1000} onClose={handleClosetoast}>
        <Alert
          onClose={handleClosetoast}
          severity={story}
          sx={{ width: "100%" }}
        >
          {masage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Cart;
