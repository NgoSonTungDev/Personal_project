import React, { useState } from "react";
import "./Navbar.scss";
import { Link, useNavigate } from "react-router-dom";
const Navbar = () => {
  const [check, setCheck] = useState(true);
  const username = localStorage.getItem("username");
  const admin = localStorage.getItem("admin");

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
              <p>Tài khoản admin</p>
            </div>
            <div className="container_narbar_content_user"> 
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
