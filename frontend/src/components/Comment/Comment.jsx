import axios from "axios";
import React, { useState } from "react";
import Toast from "react-bootstrap/Toast";
import "./Comment.scss";

const CommentMovie = (props) => {
  const [commment, setComment] = useState("");
  const [message, setMessage] = useState("");
  const username = localStorage.getItem("username");
  const admin = localStorage.getItem("admin");
  const [show, setShow] = useState(false);
  const item = props.datacmt;
  const id = props.idMovie;

  function onPress_ENTER(event) {
    var keyPressed = event.keyCode || event.which;
    if (keyPressed == 13) {
      handlePush();
      keyPressed = null;
    } else {
      return false;
    }
  }

  const handlePush = () => {
    if (commment === "") {
      setShow(true);
      setMessage("Bình luận của bạn đâu !");
    } else {
      axios
        .post("http://localhost:5000/api/comment/add-comment", {
          nameUser: username,
          content: commment,
          like: 0,
          idMovie: id,
        })
        .then(function (response) {
          window.location.reload();
          setShow(true);
          setMessage("Đã nhận !");
        })
        .catch(function (error) {
          setShow(true);
          setMessage("Bình luận bị hủy !");
        });
    }
  };

  const handleDelete = (e, idmovie) => {
    if (e === username) {
      axios
        .delete(`http://localhost:5000/api/comment/${idmovie}`)
        .then(function (response) {
          setTimeout(() => {
            window.location.reload();
          }, 1000);
          setShow(true);
          setMessage("Xóa thành công !");
        })
        .catch(function (error) {
          setShow(true);
          setMessage("Xóa thất bại !");
        });
    } else {
      setShow(true);
      setMessage("Không phải cmt của bạn, không được xóa 🙂");
    }
  };

  return (
    <div>
      <div className="conteiner_comment">
        <div className="conteiner_comment_form">
          {item.map((e) => (
            <div className="card_cmt">
              <div className="card_cmt_image">
                <img
                  src="https://anhdep123.com/wp-content/uploads/2020/11/avatar-facebook-mac-dinh-nam.jpeg"
                  alt=""
                />
              </div>
              <div className="card_cmt_content_cmt">
                <p className="card_cmt_content_cmt_name">{e.nameUser}</p>
                <p className="card_cmt_content_cmt_content">{e.content}</p>

                {admin === "true" && (
                  <span
                    onClick={() => {
                      handleDelete(e.nameUser, e._id);
                    }}
                  >
                    Xóa{" "}
                  </span>
                )}
                {e.nameUser === username && (
                  <span
                    onClick={() => {
                      handleDelete(e.nameUser, e._id);
                    }}
                  >
                    Xóa{" "}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="conteiner_comment_input">
          <input
            type="text"
            placeholder="Bình luận của bạn ...."
            value={commment}
            onKeyDown={(e) => onPress_ENTER(e)}
            onChange={(e) => {
              setComment(e.target.value);
            }}
          />
          <button onClick={handlePush}> Đăng </button>
        </div>
      </div>
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

export default CommentMovie;
