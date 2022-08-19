import React, { useState } from "react";
import "./Navbar.scss";
import { Link, useNavigate } from "react-router-dom";
const Navbar = () => {
  const [check, setCheck] = useState(true);
  const username = localStorage.getItem("username");
  const admin = localStorage.getItem("admin");
  const navigation = useNavigate();

  const handleuser = () => {
    var box = document.querySelector(".container_narbar_content_2");
    if (check === true) {
      box.style.display = "block";
      setCheck(false);
    } else {
      box.style.display = "none";
      setCheck(true);
    }
  };

  return (
    <div>
      <div className="container_narbar">
        <div className="container_narbar_logo">
          <Link to="/home-page-ticket-movie">
            <p>RIO cinema</p>
          </Link>
        </div>

        {admin === "false" && (
          <div className="container_narbar_content">
            <div className="container_narbar_content_name">
              <p>{username}</p>
            </div>
            <div className="container_narbar_content_user">
            </div>
          </div>
        )}
        {admin === "true" && (
          <div className="container_narbar_content">
            <div className="container_narbar_content_name">
              <p>{username}</p>
            </div>
            <div className="container_narbar_content_user" onClick={handleuser}>
              <div className="container_narbar_content_2">
                <div className="arrow-up"></div>
                <div
                  className="container_narbar_content_2_1"
                  onClick={() => {
                    navigation("/account-management");
                  }}
                >
                  <i class="bx bx-user-circle"></i>
                  <p> Quản lý tài khoản</p>
                </div>
                <div
                  className="container_narbar_content_2_1"
                  onClick={() => {
                    navigation("/movie-management");
                  }}
                >
                  <i className="bx bx-movie"></i>
                  <p> Quản lý phim</p>
                </div>
                <div
                  className="container_narbar_content_2_1"
                  onClick={() => {
                    navigation(`/payment-managements`);
                  }}
                >
                  <i class="bx bx-credit-card-alt"></i>
                  <p> Quản lý thanh toán</p>
                </div>
                <div
                  className="container_narbar_content_2_1"
                  onClick={() => {
                    navigation("/order-management");
                  }}
                >
                  <i className="bx bx-cart-download"></i>
                  <p> Quản lý đơn hàng</p>
                </div>
                <div
                  className="container_narbar_content_2_1"
                  onClick={() => {
                    navigation("/statistical");
                  }}
                >
                  <i class="bx bx-line-chart"></i>
                  <p>Xem thống kê</p>
                </div>
                <Link
                  to="/page-login-ticket-movie"
                  onClick={() => {
                    localStorage.clear();
                  }}
                >
                  <div className="container_narbar_content_2_1">
                    <i className="bx bx-log-out"></i>
                    <p> đăng xuất</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
