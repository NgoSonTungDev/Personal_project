import React, {  useState } from "react";
import "./Register.scss";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import LoadingButton from "@mui/lab/LoadingButton";
import { useNavigate } from "react-router-dom";
import GoBack from "../../components/GoBack/GoBack";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [open, setOpen] = useState(false);
  const [check, setCheck] = useState(false);
  const [message, setMessage] = useState("");
  const [story, setStory] = useState("");
  const navigation = useNavigate();
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleRegister = () => {
    setCheck(true);
    if (username === "" || password === "" || email === "") {
      setCheck(false);
      handleClick();
      setMessage("Không được bỏ trống !!!");
      setStory("warning");
    } else {
      axios
        .post("http://localhost:5000/api/auth/register", {
          username: username,
          password: password,
          email: email,
        })
        .then(function (response) {
          setCheck(false);
          handleClick();
          setMessage("Đăng Kí Thành công !!!");
          setStory("success");
          setTimeout(() => {
            navigation("/page-login-ticket-movie");
          }, 2000);
        })
        .catch(function (error) {
          setCheck(false);
          handleClick();
          setMessage("Đăng kí thất bại !!!");
          setStory("error");
        });
    }
  };

  return (
    <div>
      <div className="container_Register">
        <div className="container_Register_form">
          <h3>Đăng Ký</h3>
          <div className="container_Register_form_text">
            <table>
              <tr>
                <td>Tên Đăng Nhập : </td>
                <td>
                  <input
                    type="text"
                    minLength="6"
                    title="Tên đăng nhập phải 5 to 10 chars"
                    placeholder="username"
                    autocomplete="on"
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                  />
                </td>
              </tr>
              <br />
              <tr>
                <td>Email :</td>
                <td>
                  <input
                    type="email"
                    required
                    placeholder="email"
                    minLength="6"
                    title="email phải 5 to 10 chars"
                    name="email" 
                    autocomplete="on"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </td>
              </tr>
              <br />
              <tr>
                <td>Mật Khẩu :</td>
                <td>
                  <input
                    type="password"
                    placeholder="password"
                    minLength="6"
                    title="Mật khẩu phải 6 to 12 chars"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </td>
              </tr>
            </table>
          </div>
          <br />
          <br />
          <LoadingButton
            className="buttonRegister"
            onClick={handleRegister}
            loading={check}
            variant="outlined"
          >
            Submit
          </LoadingButton>
        </div>
        <GoBack/>
      </div>
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={story} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Register;
