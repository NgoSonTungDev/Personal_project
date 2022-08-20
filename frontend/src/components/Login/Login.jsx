import React from "react";
import { useNavigate } from "react-router-dom";
import "./Login.scss";

const LoginHome = () => {
  const navigation = useNavigate();
  const admin = localStorage.getItem("admin");
  const username = localStorage.getItem("username");

  const moveLogin = () => {
    navigation("/page-login-ticket-movie");
  };

  return (
    <div>
      {username === null && (
        <div className="container_back_at_home ">
          <div className="conponent_goback_Login_special" onClick={moveLogin}>
            <i class="bx bx-log-in"></i>
          </div>
        </div>
      )}
      {admin === "false" && (
        <div className="container_back_at_home">
          <div
            className="conponent_goback_Login"
            onClick={() => {
              navigation(`/${username}/cart`);
            }}
          >
            <i class="bx bx-cart-alt" title="Free Web tutorials"></i>
          </div>
          <div
            className="conponent_goback_Login"
            onClick={() => {
              navigation(`/${username}/history`);
            }}
          >
            <i class="bx bx-history"></i>
          </div>
          <div className="conponent_goback_Login three">
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
      )}
      {admin === "true" && (
        <div className="container_back_at_home_admin">
          <div
            className="conponent_goback_Login"
            onClick={() => {
              navigation("/account-management");
            }}
          >
            <i class="bx bx-user-circle"></i>
          </div>

          <div
            className="conponent_goback_Login"
            onClick={() => {
              navigation("/movie-management");
            }}
          >
            <i className="bx bx-movie"></i>
          </div>
          <div
            className="conponent_goback_Login"
            onClick={() => {
              navigation(`/payment-managements`);
            }}
          >
            <i class="bx bx-credit-card-alt"></i>
          </div>
          <div
            className="conponent_goback_Login"
            onClick={() => {
              navigation("/order-management");
            }}
          >
            <i className="bx bx-cart-download"></i>
          </div>
          <div
            className="conponent_goback_Login"
            onClick={() => {
              navigation("/statistical");
            }}
          >
            <i class="bx bx-line-chart"></i>
          </div>

          <div className="conponent_goback_Login three">
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
      )}
    </div>
  );
};

export default LoginHome;
