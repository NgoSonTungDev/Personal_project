import React, { useEffect, useState } from "react";
import "./AccountManagement.scss";
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";
import { Button, Modal } from "react-bootstrap";
import Snackbar from "@mui/material/Snackbar";
import LoginHome from "../../components/Login/Login";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AccountManagement = () => {
  const [data, setData] = useState([]);
  const [dataUSer, setDataUSer] = useState([]);
  const [ID, setID] = useState("");
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [showUpdate, setShowUdate] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPass, setNewPass] = useState("");
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [message, setMessage] = useState("");
  const [story, setStory] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloseView = () => setShow2(false);
  const handleCloseUpdate = () => setShowUdate(false);

  const handleClick2 = () => {
    setOpen(true);
  };

  const handleClose2 = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleClose3 = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen2(false);
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/user/all-user")
      .then(function (response) {
        setData(response.data);
      })
      .catch(function (error) {
        console.log("lỗi :", error);
      });
  }, []);

  const handleDelete = () => {
    handleClose();
    axios
      .delete(`http://localhost:5000/api/user/${ID}`)
      .then(function (response) {
        setTimeout(() => {
          window.location.reload();
        }, 500);
        handleClick2();
        setMessage("Xóa thành công !!! ");
        setStory("success");
      })
      .catch(function (error) {
        handleClick2();
        setMessage("Xóa thất bại !!! ");
        setStory("error");
      });
  };

  const handleIntroduceUSer = (e) => {
    axios
      .get(`http://localhost:5000/api/user/${e}`)
      .then(function (response) {
        setShow2(true);
        setDataUSer(response.data);
        handleClick2();
        setMessage("Trích xuất thành công !!! ");
        setStory("success");
      })
      .catch(function (error) {
        handleClick2();
        setMessage("Gặp vấn đề !!! ");
        setStory("error");
      });
  };

  const handleUpdateUSer = (e) => {
    axios
      .get(`http://localhost:5000/api/user/${e}`)
      .then(function (response) {
        setShowUdate(true);
        setNewUsername(response.data.username);
        setNewEmail(response.data.email);
        setNewPass(response.data.password);
        handleClick2();
        setMessage("Trích xuất thành công !!! ");
        setStory("success");
      })
      .catch(function (error) {
        handleClick2();
        setMessage("Gặp vấn đề !!! ");
        setStory("error");
      });
  };

  const handleButtonUpate = () => {
    if (newUsername === "" || newPass === "" || newEmail === "") {
      handleClick2();
      setMessage("Không được bỏ trống !!! ");
      setStory("info");
    } else {
      setOpen2(true);
      setShowUdate(false);
    }
  };

  const handlePushUpdateAPi = () => {
    axios
      .put(`http://localhost:5000/api/user/${ID}`, {
        username: newUsername,
        email: newEmail,
        password: newPass,
      })
      .then(function (response) {
        handleClick2();
        setOpen2(false);
        setStory("success");
        setMessage("Cập nhật thành công !!!");
      })
      .catch(function (error) {
        setNewEmail("");
        setNewPass("");
        setNewUsername("");
        handleClick2();
        setOpen2(false);
        setMessage("Gặp vấn đề !!! ");
        setStory("error");
      });
  };

  return (
    <div>
      <Navbar />
      <div className="container_AccountManagement">
        <div className="container_AccountManagement_text">
          <h2>Quản Lý Tài Khoản</h2>
          {/* <div class="search_quanlytk">
            <input type="search" placeholder="Mã nhân viên cần tìm ..." />
            <i className="fa-brands fa-searchengin"></i>
          </div> */}
        </div>
        <di
          className="container_AccountManagement_table"
          id="AccountManagement_table"
        >
          <table>
            <tr>
              <th>ID</th>
              <th>tên đăng nhập</th>
              <th>Email</th>
              <th>Ngày tài khoản được tạo</th>
              <th>Chức năng</th>
            </tr>
            {data.map((item) => (
              <tr key={item._id}>
                <td>{item._id}</td>
                <td>{item.username}</td>
                <td>{item.email}</td>
                <td>{item.updatedAt}</td>
                <td>
                  <button
                    onClick={() => {
                      handleIntroduceUSer(item._id);
                      // setID(item._id);
                    }}
                  >
                    <i className="fa-solid fa-user-tag"></i>{" "}
                    <span>Xem chi tiết</span>
                  </button>
                  <button
                    onClick={() => {
                      setID(item._id);
                      handleUpdateUSer(item._id);
                    }}
                  >
                    <i className="fa-solid fa-pen-to-square"></i>{" "}
                    <span>Chính Sửa</span>
                  </button>
                  <button
                    onClick={() => {
                      handleShow();
                      setID(item._id);
                    }}
                  >
                    <i className="bx bxs-trash"></i> <span>Xóa</span>
                  </button>
                </td>
              </tr>
            ))}
          </table>
        </di>
      </div>
      {/* //////////////////////////////////// */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Thông Báo</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn chắt chắn muốn xóa tài khoản này không ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      {/* //////////////////////////////////// */}
      <Modal show={show2} onHide={handleCloseView}>
        <Modal.Header closeButton>
          <Modal.Title>Thông Tin Tài Khoản</Modal.Title>
        </Modal.Header>
        <Modal.Body className="Container_bodyModal">
          <div className="Container_bodyModal_content">
            <table>
              <tr>
                <td>Id : </td>
                <td>{dataUSer._id}</td>
              </tr>
              <tr>
                <td>Tên tài khoản :</td>
                <td>{dataUSer.username}</td>
              </tr>
              <tr>
                <td>Email : </td>
                <td>{dataUSer.email}</td>
              </tr>
              <tr>
                <td>Thời gian tạo tài khoản</td>
                <td>{dataUSer.createdAt}</td>
              </tr>
              <tr>
                <td>Thời gian vừa cập nhật :</td>
                <td>{dataUSer.updatedAt}</td>
              </tr>
            </table>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseView}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      {/* //////////////////////////////////// */}
      <Modal show={showUpdate} onHide={handleCloseUpdate}>
        <Modal.Header closeButton>
          <Modal.Title>Cập Nhật Tài Khoản</Modal.Title>
        </Modal.Header>
        <Modal.Body className="Container_bodyModal_update">
          <div className="Container_bodyModal_content">
            <table>
              <tr>
                <td>Id : </td>
                <td>{dataUSer._id}</td>
              </tr>
              <tr>
                <td>Tên tài khoản :</td>
                <td>
                  <input
                    type="text"
                    value={newUsername}
                    onChange={(e) => {
                      setNewUsername(e.target.value);
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td>Email : </td>
                <td>
                  <input
                    type="text"
                    value={newEmail}
                    onChange={(e) => {
                      setNewEmail(e.target.value);
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td>Mật khẩu : </td>
                <td>
                  <input
                    type="password"
                    value={newPass}
                    onChange={(e) => {
                      setNewPass(e.target.value);
                    }}
                  />
                </td>
              </tr>
            </table>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseUpdate}>
            Close
          </Button>
          <Button variant="warning" onClick={handleButtonUpate}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
      {/* //////////////////////////////////// */}
      <Snackbar open={open} autoHideDuration={1000} onClose={handleClose2}>
        <Alert onClose={handleClose2} severity={story} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
      {/* ///////////////////////////////////////// */}
      <Modal show={open2} onHide={handleClose3}>
        <Modal.Header closeButton>
          <Modal.Title>Thông Báo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Bạn chắt chắn muốn Cập nhật tài khoản này không ?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose3}>
            Close
          </Button>
          <Button variant="warning" onClick={handlePushUpdateAPi}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
      <LoginHome />

    </div>
  );
};

export default AccountManagement;
