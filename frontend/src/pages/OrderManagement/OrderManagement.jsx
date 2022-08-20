import React, { useEffect, useState } from "react";
import "./OrderManagement.scss";
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { Modal, Button } from "react-bootstrap";
import LoginHome from "../../components/Login/Login";


const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const OrderManagement = () => {
  const [data, setData] = useState([]);
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
        setmasage("Xóa không được !!!");
        setstory("error");
      });
  };

  const acceptOrder = async (e) => {
    axios
      .put(`http://localhost:5000/api/Historybought/${e}`, {
        status: "Đã Xác Nhận",
      })
      .then(function (response) {
        setTimeout(() => {
          window.location.reload();
        }, 1000);
        handleClick();
        setmasage("Thành công !!!");
        setstory("success");
      })
      .catch(function (error) {
        handleClick();
        setmasage("Lỗi !!!");
        setstory("error");
      });
  };

  const CancleOrder = async (e) => {
    axios
      .put(`http://localhost:5000/api/Historybought/${e}`, {
        status: "Đã Hủy",
      })
      .then(function (response) {
        setTimeout(() => {
          window.location.reload();
        }, 1000);
        handleClick();
        setmasage("Thành công !!!");
        setstory("success");
      })
      .catch(function (error) {
        handleClick();
        setmasage("Lỗi !!!");
        setstory("error");
      });
  };

  ////////////////////////////
  // let sum = 0;
  // const numbers = data.map((item) => item.price);
  // numbers.forEach(totalPrice);
  // const totalPrice = (item) => {
  //   sum += item;
  // };
  ///////////////////////////

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/Historybought/allHistory")
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
      <div className="comtainer_OrderManagement">
        <div className="comtainer_OrderManagement_text">
          <h2>Quản Lý Đơn Hàng</h2>
        </div>
        <div
          className="comtainer_OrderManagement_table"
          id="AccountManagement_table"
        >
          <table>
            <tr>
              <th>Tên phim</th>
              <th>Tài khoảng đặt</th>
              <th>Thời gian đặt</th>
              <th>Số vé</th>
              <th>Đơn giá</th>
              <th>Tổng tiền</th>
              <th>Phê duyệt</th>
              <th>Chức năng</th>
            </tr>

            {data.map((item) => (
              <tr>
                <td>{item.nameMovie}</td>
                <td>{item.nameUser}</td>
                <td>{item.createdAt}</td>
                <td>{item.amount}</td>
                <td>{item.price}</td>
                <td className="price_order">{item.total}</td>
                <td>
                  {item.status === "Chờ xác nhận" && (
                    <div>
                      {" "}
                      <button
                        className="btn_in_order"
                        onClick={() => {
                          acceptOrder(item._id);
                        }}
                      >
                        <i class="bx bx-check-shield"></i> Xác nhận
                      </button>
                      <button
                        className="btn_in_order2"
                        onClick={() => {
                          CancleOrder(item._id);
                        }}
                      >
                        <i class="bx bx-x-circle"></i> Hủy
                      </button>
                    </div>
                  )}
                  {item.status === "Đã Xác Nhận" && (
                    <button
                      style={{ color: "#2ecc71" ,fontWeight : "500" }}
                      className="btn_in_order"
                      onClick={() => {
                        alert("Đơn này đã được xác nhận !!!");
                      }}
                    >
                      <i class="bx bx-check-shield"></i> Đã xác nhận
                    </button>
                  )}
                  {item.status === "Đã Hủy" && (
                    <button
                      style={{ color: "#d63031", fontWeight : "500" }}
                      className="btn_in_order2"
                      onClick={() => {
                        alert("Đã hủy bỏ đơn này !!!");
                      }}
                    >
                      <i class="bx bx-x-circle"></i> Đã hủy
                    </button>
                  )}
                  {item.status === "Thành Công" && (
                    <button
                      style={{ color: "#0984e3", fontWeight : "600" }}
                      className="btn_in_order2"
                      onClick={() => {
                        alert("Đã Thanh Toán Thành công !!!");
                      }}
                    >
                       Đã Thanh Toán
                    </button>
                  )}
                </td>
                <td>
                  <button
                    className="btn_in_order1"
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
        <Modal.Body>Bạn có muốn xóa đơn này không ?</Modal.Body>
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
      <LoginHome />

    </div>
  );
};

export default OrderManagement;
