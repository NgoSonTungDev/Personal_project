import React, { useState} from "react";
import { useNavigate } from "react-router-dom";
import "./Login.scss";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import LoadingButton from "@mui/lab/LoadingButton";
import GoBack from "../../components/GoBack/GoBack";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Login = () => {
  const navigation = useNavigate();
  const [user, setUser] = useState("");
  const [check, setCheck] = useState(false);
  const [pass, setPass] = useState("");
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

  function onPress_ENTER(event) {
    var keyPressed = event.keyCode || event.which;
    if (keyPressed === 13) {
      handleLogin()
      keyPressed = null;
    } else {
      return false;
    }
  }


  const handleLogin = () => {
    setCheck(true);

    if (user === "" || pass === "") {
      setCheck(false);
      handleClick();
      setMessage("Không được bỏ trống !!!");
      setStory("warning");
    } else {
      axios
        .post("http://localhost:5000/api/auth/login", {
          username: user,
          password: pass,
        })
        .then(function (response) {
          setCheck(false);
          handleClick();
          setMessage("Đăng Nhập Thành công !!!");
          setStory("success");
          const checkAdmin = response.data.admin;
          if (checkAdmin === false) {
            localStorage.setItem("username", response.data.username);
            localStorage.setItem("IdUser", response.data._id);
            localStorage.setItem("admin", response.data.admin);
            localStorage.setItem("email", response.data.email);
            setTimeout(() => {
              navigation("/home-page-ticket-movie");
            }, 1000);
          } else {
            localStorage.setItem("admin", response.data.admin);
            console.log(localStorage.getItem("admin"));
            localStorage.setItem("username", response.data.username);
            setTimeout(() => {
              navigation("/home-page-ticket-movie");
            }, 1500);
          }
        })
        .catch(function (error) {
          setCheck(false);
          handleClick();
          setMessage("Sai user or password !!!");
          setStory("error");
        });
    }
  };

  return (
    <div>
      <div className="container_Login">
        <div className="container_Login_form">
          <h3>Đăng Nhập</h3>
          <div className="container_Login_form_text">
            <table>
              <tr>
                <td>Tên Đăng Nhập : </td>
                <td>
                  <input
                    type="text"
                    required
                    placeholder="username"
                    minLength="5"
                    value={user}
                    onChange={(e) => {
                      setUser(e.target.value);
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
                    required
                    placeholder="password"
                    minLength="6"
                    value={pass}
                    onKeyDown={(e) => onPress_ENTER(e)}
                    onChange={(e) => {
                      setPass(e.target.value);
                    }}
                  />
                </td>
              </tr>
            </table>
          </div>
          <div className="forgot">
            <p
              onClick={() => {
                navigation("/forgot-password");
              }}
            >
              đổi mật khẩu
            </p>
          </div>
          <LoadingButton
            className="buttonlogin"
            onClick={handleLogin}
            loading={check}
            variant="outlined"
          >
            Submit
          </LoadingButton>
          <p class="text">
            Don't have an account?{" "}
            <span
              onClick={() => {
                navigation("/register");
              }}
            >
              Register
            </span>
          </p>
        </div>
      </div>
      <GoBack />
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={story} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Login;
