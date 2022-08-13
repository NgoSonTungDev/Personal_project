import React, { useEffect, useState } from "react";
import "./MovieManagement.scss";
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { Modal, Button } from "react-bootstrap";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const MovieManagement = () => {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [id, setid] = useState("");
  const [open, setOpen] = React.useState(false);
  const [masage, setmasage] = useState("");
  const [story, setstory] = useState("");
  const [name, setname] = useState("");
  const [background, setbackground] = useState("");
  const [avata, setavata] = useState("");
  const [price, setprice] = useState(0);
  const [time, settime] = useState("");
  const [releasedate, setreleasedate] = useState("");
  const [showtime, setshowtime] = useState("");
  const [author, setauthor] = useState("");
  const [Category, setCategory] = useState("Khoa Học Viên Tưởng");
  const [introduce, setintroduce] = useState("");
  const [seats, setSeats] = useState(0);

  const [checkbtn, setcheckbtn] = useState(1);
  const [masegeInfom, setmasegeInfom] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);
  const handleClick = () => {
    setOpen(true);
  };

  const handleClosetoast = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleAddMovie = () => {
    axios
      .post("http://localhost:5000/api/movie/add-movie", {
        namemovie: name,
        background: background,
        image: avata,
        price: price,
        time: time,
        releasedate: releasedate,
        showtime: showtime,
        author: author,
        Category: Category,
        introduce: introduce,
        seats: 100,
      })
      .then(function (response) {
        handleClose();
        handleClick();
        setmasage("Thêm thành công !!!");
        setstory("success");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
      .catch(function (error) {
        handleClose();
        handleClick();
        setmasage("Thêm không thành công !!!");
        setstory("error");
      });
  };

  const handleClickAddMovie = () => {
    if (
      name === "" ||
      background === "" ||
      avata === "" ||
      price === "" ||
      time === "" ||
      releasedate === "" ||
      showtime === "" ||
      author === "" ||
      Category === "" ||
      introduce === ""
    ) {
      handleClick();
      setmasage("Không được bỏ trống các trường !!!");
      setstory("warning");
    } else {
      setShow2(false);
      handleShow();
      setcheckbtn(1);
      setmasegeInfom("Bạn chắc chắn muốn thêm phim này không ?");
    }
  };

  const handleClickUpdateMovie = () => {
    if (
      name === "" ||
      background === "" ||
      avata === "" ||
      price === "" ||
      time === "" ||
      releasedate === "" ||
      showtime === "" ||
      author === "" ||
      Category === "" ||
      introduce === ""
    ) {
      handleClick();
      setmasage("Không được bỏ trống các trường !!!");
      setstory("warning");
    } else {
      setShow2(false);
      handleShow();
      setcheckbtn(3);
      setmasegeInfom("Bạn chắc chắn muốn chỉnh lại không ?");
    }
  };

  const handleGetApiInforMovie = (e) => {
    axios
      .get(`http://localhost:5000/api/movie/${e}`)
      .then(function (response) {
        handleShow2();
        // console.log(response);
        setname(response.data.namemovie);
        setbackground(response.data.background);
        setavata(response.data.image);
        setprice(response.data.price);
        settime(response.data.time);
        setreleasedate(response.data.releasedate);
        setshowtime(response.data.showtime);
        setauthor(response.data.author);
        setCategory(response.data.Category);
        setintroduce(response.data.introduce);
        setSeats(response.data.seats);
        handleClick();
        setmasage("Trích xuất thành công !!! ");
        setstory("success");
      })
      .catch(function (error) {
        handleClick();
        setmasage("Gặp vấn đề !!! ");
        setstory("error");
      });
  };

  const handleDelete = () => {
    axios
      .delete(`http://localhost:5000/api/movie/${id}`)
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
        setmasage("Xóa không thành công !!!");
        setstory("error");
      });
  };

  const ClickIconAddMovie = () => {
    setname("");
    setbackground("");
    setavata("");
    setprice("");
    settime("");
    setreleasedate("");
    setshowtime("");
    setauthor("");
    setCategory("Khoa Học Viên Tưởng");
    setintroduce("");
    setSeats("");
    handleShow2();
    setcheckbtn(1);
  };

  const handleUpdateAPI = () => {
    axios
      .put(`http://localhost:5000/api/movie/${id}`, {
        namemovie: name,
        background: background,
        image: avata,
        price: price,
        time: time,
        releasedate: releasedate,
        showtime: showtime,
        author: author,
        Category: Category,
        introduce: introduce,
        seats: seats,
      })
      .then(function (response) {
        handleClose();
        window.location.reload();
        handleClick();
        setmasage("Cập nhât thành công !!!");
        setstory("success");
      })
      .catch(function (error) {
        handleClose();
        handleClick();
        setmasage("Lỗi !!!");
        setstory("error");
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/movie/all-movie")
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
      <div className="comtainer_MovieManagement">
        <div className="comtainer_MovieManagement_text">
          <h2>Quản Lý Danh Mục</h2>
          <i className="bx bx-list-plus" onClick={ClickIconAddMovie}></i>
        </div>
        <div
          className="comtainer_MovieManagement_table"
          id="AccountManagement_table"
        >
          <table>
            <tr>
              <th>Tên phim</th>
              <th>Ngày phát hành</th>
              <th>Đạo diễn</th>
              <th>Thể loại</th>
              <th>Thời gian chiếu</th>
              <th>Số Lượng Ghế</th>
              <th>Thời lượng</th>
              <th>Giá (VND)</th>
              <th>Chức năng</th>
            </tr>
            {data.map((item) => (
              <tr>
                <td>{item.namemovie}</td>
                <td>{item.releasedate}</td>
                <td>{item.author}</td>
                <td>{item.Category}</td>
                <td>{item.showtime}</td>
                <td>{item.seats}</td>
                <td>{item.time}</td>
                <td>{item.price}</td>
                <td>
                  <button
                    onClick={() => {
                      handleGetApiInforMovie(item._id);
                      setid(item._id);
                      setcheckbtn(3);
                    }}
                  >
                    <i className="fa-solid fa-pen-to-square"></i>{" "}
                    <span>Chính Sửa</span>
                  </button>
                  <button
                    onClick={() => {
                      handleShow();
                      setid(item._id);
                      setcheckbtn(2);
                      setmasegeInfom("Bạn có muốn xóa phim này không ?");
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
        <Modal.Body>{masegeInfom}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {checkbtn === 1 && (
            <Button variant="primary" onClick={handleAddMovie}>
              Ok
            </Button>
          )}
          {checkbtn === 2 && (
            <Button variant="danger" onClick={handleDelete}>
              Delete
            </Button>
          )}
          {checkbtn === 3 && (
            <Button variant="warning" onClick={handleUpdateAPI}>
              Update
            </Button>
          )}
        </Modal.Footer>
      </Modal>

      <Snackbar open={open} autoHideDuration={3000} onClose={handleClosetoast}>
        <Alert
          onClose={handleClosetoast}
          severity={story}
          sx={{ width: "100%" }}
        >
          {masage}
        </Alert>
      </Snackbar>

      <Modal
        show={show2}
        onHide={handleClose2}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title className="tiltle_add">Thông Tin phim</Modal.Title>
        </Modal.Header>
        <Modal.Body className="body_add_movie">
          <div className="body_add_movie_div">
            <p>Tên phim : </p>
            <input
              type="text"
              required
              placeholder="name movie"
              value={name}
              onChange={(e) => {
                setname(e.target.value);
              }}
            />
          </div>
          <div className="body_add_movie_div">
            <p>Ảnh nền : </p>
            <input
              type="link"
              required
              placeholder="Link background movie"
              value={background}
              onChange={(e) => {
                setbackground(e.target.value);
              }}
            />
          </div>
          <div className="body_add_movie_div">
            <p>Ảnh card : </p>
            <input
              type="link"
              required
              placeholder="Link avata movie"
              value={avata}
              onChange={(e) => {
                setavata(e.target.value);
              }}
            />
          </div>
          <div className="body_add_movie_div">
            <p>Giá Vé : </p>
            <input
              type="number"
              min="50000"
              required
              placeholder="price movie"
              value={price}
              onChange={(e) => {
                setprice(e.target.value);
              }}
            />
          </div>
          <div className="body_add_movie_div">
            <p>Thời lượng Phim : </p>
            <input
              type="text"
              required
              placeholder="? giờ ? phút"
              value={time}
              onChange={(e) => {
                settime(e.target.value);
              }}
            />
          </div>
          <div className="body_add_movie_div">
            <p>Thời gian phát hành : </p>
            <input
              type="text"
              required
              placeholder="?/?/????"
              value={releasedate}
              onChange={(e) => {
                setreleasedate(e.target.value);
              }}
            />
          </div>
          <div className="body_add_movie_div">
            <p>Thời gian chiếu : </p>
            <input
              type="text"
              required
              placeholder="??h?? | ?/?/????"
              value={showtime}
              onChange={(e) => {
                setshowtime(e.target.value);
              }}
            />
          </div>
          <div className="body_add_movie_div">
            <p>Đạo diễn Phim : </p>
            <input
              type="text"
              required
              placeholder="author movie"
              value={author}
              onChange={(e) => {
                setauthor(e.target.value);
              }}
            />
          </div>
          <div className="body_add_movie_div">
            <p>Thể loại Phim : </p>
            <select
              name=""
              id=""
              value={Category}
              onChange={(e) => {
                setCategory(e.target.value);
              }}
            >
              <option value="Khoa Học Viên Tưởng">Khoa Học Viên Tưởng</option>
              <option value="Hoạt Hình">Hoạt Hình</option>
              <option value="Hành Động">Hành Động</option>
              <option value="Kinh Dị">Kinh Dị</option>
              <option value="Chiến Tranh">Chiên Tranh</option>
            </select>
          </div>
          <div className="body_add_movie_div">
            <p>Số Lượng Ghế : </p>
            <input
              type="number"
              required
              placeholder="seats"
              value={seats}
              onChange={(e) => {
                setSeats(e.target.value);
              }}
            />
          </div>
          <div className="body_add_movie_div">
            <p>Mô Tả Phim : </p>
            <textarea
              name="introdecMovie"
              cols="100"
              rows="100"
              value={introduce}
              onChange={(e) => {
                setintroduce(e.target.value);
              }}
            ></textarea>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose2}>
            Close
          </Button>
          {checkbtn === 1 && (
            <Button variant="primary" onClick={handleClickAddMovie}>
              Create
            </Button>
          )}
          {checkbtn === 3 && (
            <Button variant="warning" onClick={handleClickUpdateMovie}>
              Update
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MovieManagement;
