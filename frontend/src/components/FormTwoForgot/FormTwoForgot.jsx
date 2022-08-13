import React, { useEffect, useState } from "react";
import "./FormTwoForgot.scss";
import LoadingButton from "@mui/lab/LoadingButton";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const FormTwoForgot = (props) => {
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(false);
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [story, setStory] = useState("");
  const navigation = useNavigate()

  useEffect(() => {
    setId(props.userID);
  }, [props.userID]);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleChangePassOld = () => {
    if (oldPass === "" || newPass === "") {
      handleClick();
      setStory("info");
      setMessage("Vui lòng Nhập đầy đủ thông tin !!!");
    } else {
      setLoading(true);
      axios
        .post(`http://localhost:5000/api/auth/${id}`, {
          password: oldPass,
        })
        .then(function (response) {
          hangdlechangePassNew();
        })
        .catch(function (error) {
          setLoading(false);
          handleClick();
          setStory("warning");
          setMessage("Sai mật khẩu củ !!!");
        });
    }
  };

  const hangdlechangePassNew = () => {
    axios
      .put(`http://localhost:5000/api/user/${id}`, {
        password: newPass,
      })
      .then(function (response) {
        setLoading(false);
        handleClick();
        setStory("success");
        setMessage("Đổi mật khẩu thành công !!!");
        setTimeout(() => {
          navigation("/")
        }, 1000);
      })
      .catch(function (error) {
        setLoading(false);
        handleClick();
        setStory("warning");
        setMessage("Đổi mật khẩu Thất bại !!!");
      });
  };

  return (
    <div>
      <div className="container_FormTwoForgot">
        <p>Thay đổi mật khẩu</p>
        <div className="container_FormTwoForgot_form">
          <label htmlFor="">Mật khẩu cũ : </label>
          <input
            type="password"
            placeholder="Old passwork ..."
            value={oldPass}
            onChange={(e) => {
              setOldPass(e.target.value);
            }}
          />
        </div>
        <div className="container_FormTwoForgot_form1">
          <label htmlFor="">Mật khẩu mới : </label>
          <input
            type="password"
            placeholder="New passwork ..."
            value={newPass}
            onChange={(e) => {
              setNewPass(e.target.value);
            }}
          />
        </div>
        <LoadingButton
          loading={loading}
          onClick={handleChangePassOld}
          className="btnloadding"
          variant="outlined"
        >
          Submit
        </LoadingButton>
      </div>
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={story} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default FormTwoForgot;
