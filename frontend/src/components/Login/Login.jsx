import React from "react";
import { useNavigate } from "react-router-dom";
import "./Login.scss";

const LoginHome = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  const moveLogin = () => {
    navigate("/page-login-ticket-movie");
  };

  return (
    <div>
      <div className="conponent_goback_Login">
        {username ? (
          <i
            class="bx bx-log-out"
            onClick={() => {
              window.location.reload();
              localStorage.clear();
            }}
          ></i>
        ) : (
          <i class="bx bx-log-in" onClick={moveLogin}></i>
        )}
      </div>
    </div>
  );
};

export default LoginHome;
