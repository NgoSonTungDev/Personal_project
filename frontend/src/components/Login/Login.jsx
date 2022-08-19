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
      <div className="container_back_at_home">
        <div
          className="conponent_goback_Login"
          onClick={() => {
            navigate(`/${username}/cart`);
          }}
        >
          <i class="bx bx-cart-alt"></i>
        </div>
        <div
          className="conponent_goback_Login"
          onClick={() => {
            navigate(`/${username}/history`);
          }}
        >
          <i class="bx bx-history"></i>
        </div>
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
    </div>
  );
};

export default LoginHome;
