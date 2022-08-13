import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";
import "./History.scss";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const History = () => {
  const [data, setData] = useState([]);
  const navigation = useNavigate();
  const [show, setShow] = useState(false);
  const [id, setid] = useState("");
  const [open, setOpen] = React.useState(false);
  const [masage, setmasage] = useState("");
  const [story, setstory] = useState("");
  const iduser = localStorage.getItem("IdUser");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClosetoast = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleDelete = () => {
    axios
      .delete(`http://localhost:5000/api/Historybought/${id}`)
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
        setmasage("Xóa thất bại !!!");
        setstory("error");
      });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/user/${iduser}`)
      .then(function (response) {
        setData(response.data.history);
      })
      .catch(function (error) {
        console.log("lỗi :", error);
      });
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container_History">
        <div className="container_History_text">
          <h2>Lịch sử mua hàng của bạn</h2>
        </div>
        <div className="container_History_table" id="AccountManagement_table">
          <table>
            <tr>
              <th>Mã đơn hàng </th>
              <th>Tên Phim </th>
              <th>Đạo Điễn</th>
              <th>Thể Loại</th>
              <th>Số lượng</th>
              <th>Thời gian Chiếu</th>
              <th>Giá</th>
              <th>Trạng thái</th>
              <th>Tổng Tiền</th>
              <th>Chức năng</th>
            </tr>
            {data.map((item) => (
              <tr>
                <td>{item.codeOrders}</td>
                <td>{item.nameMovie}</td>
                <td>{item.author}</td>
                <td>{item.Category}</td>
                <td>{item.amount}</td>
                <td>{item.showtime}</td>
                <td>{item.price}</td>
                {item.status === "Chờ xác nhận" && (
                  <td style={{ color: "#e74c3c" }}>{item.status}</td>
                )}
                {item.status === "Đã Xác Nhận" && (
                  <td style={{ color: "#2ecc71" }}>{item.status}</td>
                )}
                {item.status === "Đã Hủy" && (
                  <td style={{ color: "red" }}>{item.status}</td>
                )}
                {item.status === "Thành Công" && (
                  <td style={{ color: "#0984e3" }}>{item.status}</td>
                )}
                <td>{item.total}</td>
                <td>
                  <button
                    onClick={() => {
                      navigation(`/home-page-ticket-movie/${item.idmovie}`);
                    }}
                  >
                    <i className="bx bx-movie-play"></i>
                    <span>Xem chi tiết</span>
                  </button>
                  {item.status === "Đã Hủy" && (
                    <button
                      onClick={() => {
                        handleShow();
                        setid(item._id);
                      }}
                    >
                      <i className="bx bxs-trash"></i> <span>Xóa</span>
                    </button>
                  )}
                   {item.status === "Chờ xác nhận" && (
                    <button
                      onClick={() => {
                        handleShow();
                        setid(item._id);
                      }}
                    >
                      <i className="bx bxs-trash"></i> <span>Xóa</span>
                    </button>
                  )}
                  {item.status === "Đã Xác Nhận" && (
                    <button
                      className="Payment"
                      onClick={() => {
                        navigation(`/payment-orders/${item._id}`);
                      }}
                    >
                      <i class="bx bx-wallet"></i> <span>Thanh Toán</span>
                    </button>
                  )}
                  {/* {item.status === "Thành Công"  && null} */}
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

export default History;
