import React, { useState } from "react";
import "./FormOneForgot.scss";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const FormOneForgot = (props) => {
  const [userID, setUSerID] = useState("");
  const [check, setCheck] = useState(false);
  const [user, setUSer] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [story, setStory] = useState("");

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const data = props.dataAccount;

  const handleFindUser = () => {
    setLoading(true);
    if (user === "") {
      setLoading(false);
      alert("Vui lòng nhập đầy đủ thông tin !!!");
    } else {
      if (data.find((e) => e.username === user)) {
        const valueId = data.find((e) => e.username === user);
        setUSerID(valueId._id);
        setLoading(false);
        setCheck(true);
        handleClick();
        setMessage("Đã tìm thấy user !!!");
        setStory("success");
        setTimeout(() => {
          props.handleShow();
        }, 1000);
      } else {
        setLoading(false);
        setCheck(false);
        handleClick();
        setMessage("Không tìm thấy user này !!!");
        setStory("info");
      }
    }
  };

  props.handleCheckUSer(userID, check);

  return (
    <div>
      <div className="FormOneForgot">
        <p>Tìm tài khoản</p>
        <div className="FormOneForgot_input">
          <label htmlFor="">Tên tài khoản của bạn : </label>
          <input
            type="text"
            placeholder="Tên tài khoản ..."
            value={user}
            onChange={(e) => {
              setUSer(e.target.value);
            }}
          />
        </div>
        <LoadingButton
          onClick={handleFindUser}
          className="LoadingButton"
          size="small"
          endIcon={<SendIcon />}
          loading={loading}
          loadingPosition="end"
          variant="contained"
        >
          Send
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

export default FormOneForgot;
